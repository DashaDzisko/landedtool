import { createClient } from "@/lib/supabase/client";
import type {
  Application,
  ApplicationStatus,
} from "@/types/application";

type DbNote = { id: string; body: string; created_at: string };
type DbContact = {
  id: string;
  name: string;
  role: string | null;
  email: string | null;
};
type DbStatusEntry = {
  id: string;
  status: ApplicationStatus;
  note: string | null;
  created_at: string;
};

export type DbApplicationRow = {
  id: string;
  user_id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  location: string | null;
  url: string | null;
  description: string | null;
  source: string | null;
  applied_at: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  cv_url: string | null;
  created_at: string;
  updated_at: string;
  notes?: DbNote[];
  contacts?: DbContact[];
  status_entries?: DbStatusEntry[];
};

export function toApplication(row: DbApplicationRow): Application {
  const salary =
    row.salary_min || row.salary_max
      ? {
          min: row.salary_min ?? undefined,
          max: row.salary_max ?? undefined,
          currency: row.salary_currency ?? undefined,
        }
      : undefined;

  const noteItems =
    row.notes
      ?.sort((a, b) => a.created_at.localeCompare(b.created_at))
      .map((n) => ({ id: n.id, body: n.body })) ?? [];

  return {
    id: row.id,
    company: row.company,
    role: row.role,
    status: row.status,
    location: row.location ?? undefined,
    url: row.url ?? undefined,
    description: row.description ?? undefined,
    appliedAt: row.applied_at ?? undefined,
    source: row.source ?? undefined,
    salary,
    notes: noteItems[0]?.body,
    noteItems,
    cvUrl: row.cv_url ?? undefined,
    contacts: row.contacts?.map((c) => ({
      id: c.id,
      name: c.name,
      role: c.role ?? undefined,
      email: c.email ?? undefined,
    })),
    events: row.status_entries
      ?.sort((a, b) => a.created_at.localeCompare(b.created_at))
      .map((entry) => ({
        id: entry.id,
        date: entry.created_at.slice(0, 10),
        title: `Moved to ${entry.status}`,
        description: entry.note ?? undefined,
        type: "status" as const,
      })),
  };
}

function toDbPatch(data: Partial<Omit<Application, "id">>) {
  const patch: Record<string, string | number | null | ApplicationStatus> = {};

  if (data.company !== undefined) patch.company = data.company;
  if (data.role !== undefined) patch.role = data.role;
  if (data.status !== undefined) patch.status = data.status;
  if (data.location !== undefined) patch.location = data.location ?? null;
  if (data.url !== undefined) patch.url = data.url ?? null;
  if (data.description !== undefined) patch.description = data.description ?? null;
  if (data.source !== undefined) patch.source = data.source ?? null;
  if (data.appliedAt !== undefined) patch.applied_at = data.appliedAt ?? null;

  if (data.salary !== undefined) {
    patch.salary_min = data.salary?.min ?? null;
    patch.salary_max = data.salary?.max ?? null;
    patch.salary_currency = data.salary?.currency ?? "GBP";
  }

  if (data.cvUrl !== undefined) patch.cv_url = data.cvUrl ?? null;

  return patch;
}

export async function uploadApplicationCv(
  applicationId: string,
  file: File
): Promise<string> {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error("Not authenticated");

  const path = `${user.id}/${applicationId}/${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from("cvs")
    .upload(path, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { error: updateError } = await supabase
    .from("applications")
    .update({ cv_url: path })
    .eq("id", applicationId);

  if (updateError) throw updateError;
  return path;
}

export async function removeApplicationCv(applicationId: string): Promise<void> {
  const supabase = createClient();
  const { data: app, error: fetchError } = await supabase
    .from("applications")
    .select("cv_url")
    .eq("id", applicationId)
    .single();

  if (fetchError) throw fetchError;

  if (app.cv_url) {
    const { error: storageError } = await supabase.storage
      .from("cvs")
      .remove([app.cv_url]);
    if (storageError) throw storageError;
  }

  const { error: updateError } = await supabase
    .from("applications")
    .update({ cv_url: null })
    .eq("id", applicationId);

  if (updateError) throw updateError;
}

const APPLICATION_SELECT = `
  *,
  notes (*),
  contacts (*),
  status_entries (*)
`;

export async function fetchApplications(): Promise<Application[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("applications")
    .select(APPLICATION_SELECT)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as DbApplicationRow[]).map(toApplication);
}

export async function createApplication(
  data: Omit<Application, "id">
): Promise<Application> {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error("Not authenticated");

  const { data: row, error } = await supabase
    .from("applications")
    .insert({
      user_id: user.id,
      company: data.company,
      role: data.role,
      status: data.status,
      location: data.location ?? null,
      url: data.url ?? null,
      description: data.description ?? null,
      source: data.source ?? null,
      applied_at: data.appliedAt ?? null,
      salary_min: data.salary?.min ?? null,
      salary_max: data.salary?.max ?? null,
      salary_currency: data.salary?.currency ?? "GBP",
    })
    .select(APPLICATION_SELECT)
    .single();

  if (error) throw error;

  if (data.notes?.trim()) {
    const { error: noteError } = await supabase.from("notes").insert({
      application_id: row.id,
      body: data.notes.trim(),
    });
    if (noteError) throw noteError;
  }

  const { data: refreshed, error: refreshError } = await supabase
    .from("applications")
    .select(APPLICATION_SELECT)
    .eq("id", row.id)
    .single();

  if (refreshError) throw refreshError;
  return toApplication(refreshed as DbApplicationRow);
}

export async function updateApplicationInDb(
  id: string,
  data: Partial<Omit<Application, "id">>
): Promise<void> {
  const patch = toDbPatch(data);
  if (Object.keys(patch).length === 0) return;

  const supabase = createClient();
  const { error } = await supabase
    .from("applications")
    .update(patch)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteApplicationFromDb(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("applications").delete().eq("id", id);
  if (error) throw error;
}

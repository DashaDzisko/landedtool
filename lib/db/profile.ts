import { fetchApplications } from "@/lib/db/applications";
import { fetchAllChats } from "@/lib/db/chats";
import { createClient } from "@/lib/supabase/client";
import type { UserProfile } from "@/types/user";

type DbProfileRow = {
  id: string;
  display_name: string | null;
  cv: string | null;
  target_roles: string | null;
};

function toProfile(row: DbProfileRow): UserProfile {
  return {
    id: row.id,
    displayName: row.display_name ?? undefined,
    cv: row.cv ?? undefined,
    targetRoles: row.target_roles ?? undefined,
  };
}

export async function fetchProfile(): Promise<UserProfile | null> {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, cv, target_roles")
    .eq("id", user.id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return { id: user.id };
    throw error;
  }

  return toProfile(data as DbProfileRow);
}

export async function updateProfile(data: {
  displayName?: string;
  cv?: string;
  targetRoles?: string;
}): Promise<UserProfile> {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error("Not authenticated");

  const { data: row, error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      display_name: data.displayName ?? null,
      cv: data.cv ?? null,
      target_roles: data.targetRoles ?? null,
    })
    .select("id, display_name, cv, target_roles")
    .single();

  if (error) throw error;
  return toProfile(row as DbProfileRow);
}

export async function exportUserData(): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error("Not authenticated");

  const [profile, applications, chats] = await Promise.all([
    fetchProfile(),
    fetchApplications(),
    fetchAllChats(),
  ]);

  const payload = {
    exportedAt: new Date().toISOString(),
    email: user.email,
    profile,
    applications,
    chats: chats.sessions.map((session) => ({
      ...session,
      messages: chats.messagesBySession[session.id] ?? [],
    })),
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `landed-export-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function deleteUserData(): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error("Not authenticated");

  const { error: appsError } = await supabase
    .from("applications")
    .delete()
    .eq("user_id", user.id);
  if (appsError) throw appsError;

  const { error: chatsError } = await supabase
    .from("chats")
    .delete()
    .eq("user_id", user.id);
  if (chatsError) throw chatsError;

  const { error: profileError } = await supabase
    .from("profiles")
    .delete()
    .eq("id", user.id);
  if (profileError) throw profileError;
}

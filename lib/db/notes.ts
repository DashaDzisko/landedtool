import { createClient } from "@/lib/supabase/client";
import type { ApplicationNote } from "@/types/application";

export async function createNote(
  applicationId: string,
  body: string
): Promise<ApplicationNote> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("notes")
    .insert({ application_id: applicationId, body })
    .select("id, body")
    .single();

  if (error) throw error;
  return data as ApplicationNote;
}

export async function updateNote(
  id: string,
  body: string
): Promise<ApplicationNote> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("notes")
    .update({ body })
    .eq("id", id)
    .select("id, body")
    .single();

  if (error) throw error;
  return data as ApplicationNote;
}

export async function deleteNote(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) throw error;
}

import { createClient } from "@/lib/supabase/client";
import type { ApplicationContact } from "@/types/application";

export async function createContact(
  applicationId: string,
  data: { name: string; role?: string; email?: string }
): Promise<ApplicationContact> {
  const supabase = createClient();
  const { data: row, error } = await supabase
    .from("contacts")
    .insert({
      application_id: applicationId,
      name: data.name,
      role: data.role ?? null,
      email: data.email ?? null,
    })
    .select("id, name, role, email")
    .single();

  if (error) throw error;
  return {
    id: row.id,
    name: row.name,
    role: row.role ?? undefined,
    email: row.email ?? undefined,
  };
}

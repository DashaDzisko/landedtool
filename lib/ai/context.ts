import { toApplication, type DbApplicationRow } from "@/lib/db/applications";
import { createClient } from "@/lib/supabase/server";
import type { Application } from "@/types/application";
import type { UserProfile } from "@/types/user";

export interface AgentContext {
  profile: UserProfile;
  applications: Application[];
  applicationContextId?: string | null;
}

const APPLICATION_SELECT = `
  *,
  notes (*),
  contacts (*),
  status_entries (*)
`;

export async function loadAgentContext(
  applicationContextId?: string | null
): Promise<AgentContext> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error("Not authenticated");

  const [profileResult, appsResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, display_name, cv, target_roles")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("applications")
      .select(APPLICATION_SELECT)
      .order("created_at", { ascending: false }),
  ]);

  if (profileResult.error) throw profileResult.error;
  if (appsResult.error) throw appsResult.error;

  const profile: UserProfile = {
    id: user.id,
    displayName: profileResult.data?.display_name ?? undefined,
    cv: profileResult.data?.cv ?? undefined,
    targetRoles: profileResult.data?.target_roles ?? undefined,
  };

  const applications = ((appsResult.data ?? []) as DbApplicationRow[]).map(
    toApplication
  );

  return {
    profile,
    applications,
    applicationContextId: applicationContextId ?? null,
  };
}

import { AppShell } from "@/components/organisms/layout";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single()
    : { data: null };

  return (
    <AppShell
      userName={profile?.display_name ?? undefined}
      userEmail={user?.email}
    >
      {children}
    </AppShell>
  );
}

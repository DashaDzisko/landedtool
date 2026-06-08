import { PageHeader } from "@/components/organisms/layout";
import { SettingsView } from "@/components/organisms/settings";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Profile, data export, and account preferences"
      />
      <SettingsView />
    </>
  );
}

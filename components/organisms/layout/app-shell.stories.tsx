import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@/components/atoms/text";
import { PageHeader } from "./page-header";
import { AppShell } from "./app-shell";

const meta = {
  title: "Organisms/Layout/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppShell>
      <PageHeader
        title="Dashboard"
        description="Overview of your job search"
      />
      <Text variant="muted" className="mt-6">
        Main content area beside the persistent agent sidebar.
      </Text>
    </AppShell>
  ),
};

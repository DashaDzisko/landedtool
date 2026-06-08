import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@/components/atoms/text";
import { PageContainer } from "./page-container";
import { PageHeader } from "./page-header";

const meta = {
  title: "Organisms/Layout/PageContainer",
  component: PageContainer,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="bg-canvas-mesh p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PageContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageContainer>
      <PageHeader
        title="Unified layout"
        description="Every tab uses the same full-width page column."
      />
      <div className="bento-card p-6">
        <Text variant="small" className="text-muted">
          Content stretches to the full main area beside the agent sidebar.
        </Text>
      </div>
    </PageContainer>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { ApplicationDetail } from "./application-detail";

const meta = {
  title: "Organisms/Dashboard/ApplicationDetail",
  component: ApplicationDetail,
  tags: ["autodocs"],
} satisfies Meta<typeof ApplicationDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    application: MOCK_APPLICATIONS[0],
    onEdit: () => undefined,
    onDelete: () => undefined,
    onAskAgent: () => undefined,
  },
};

export const Minimal: Story = {
  args: {
    application: MOCK_APPLICATIONS[4],
  },
};

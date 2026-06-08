import type { Meta, StoryObj } from "@storybook/react";
import { Briefcase } from "@phosphor-icons/react";
import { EmptyState } from "./empty-state";

const meta = {
  title: "Molecules/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Briefcase,
    title: "No applications yet",
    description: "Add your first role to start tracking your job search.",
    actionLabel: "Add application",
    onAction: () => undefined,
  },
};

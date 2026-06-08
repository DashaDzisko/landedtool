import type { Meta, StoryObj } from "@storybook/react";
import { PromptChip } from "./prompt-chip";

const meta = {
  title: "Molecules/PromptChip",
  component: PromptChip,
  tags: ["autodocs"],
} satisfies Meta<typeof PromptChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Summarise my pipeline" },
};

export const Selected: Story = {
  args: { label: "Draft follow-up email", selected: true },
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <PromptChip label="Summarise my pipeline" />
      <PromptChip label="Draft follow-up email" selected />
      <PromptChip label="Which roles to prioritise?" />
    </div>
  ),
};

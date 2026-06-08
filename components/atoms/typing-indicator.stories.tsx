import type { Meta, StoryObj } from "@storybook/react";
import { TypingIndicator } from "./typing-indicator";

const meta = {
  title: "Atoms/TypingIndicator",
  component: TypingIndicator,
  tags: ["autodocs"],
} satisfies Meta<typeof TypingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InBubble: Story = {
  render: () => (
    <div className="w-fit rounded-lg border border-hairline bg-surface-1 px-4 py-2">
      <TypingIndicator />
    </div>
  ),
};

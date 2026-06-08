import type { Meta, StoryObj } from "@storybook/react";
import { SuggestedPrompts } from "./suggested-prompts";

const meta = {
  title: "Molecules/SuggestedPrompts",
  component: SuggestedPrompts,
  tags: ["autodocs"],
} satisfies Meta<typeof SuggestedPrompts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prompts: [
      "Summarise my pipeline",
      "Draft follow-up email",
      "Which roles should I prioritise?",
    ],
  },
};

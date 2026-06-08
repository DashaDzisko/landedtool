import type { Meta, StoryObj } from "@storybook/react";
import { ModelPill } from "./model-pill";

const meta = {
  title: "Molecules/ModelPill",
  component: ModelPill,
  tags: ["autodocs"],
  args: {
    model: "GPT-4o",
  },
} satisfies Meta<typeof ModelPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mini: Story = {
  args: { model: "GPT-4o mini" },
};

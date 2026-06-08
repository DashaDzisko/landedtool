import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "you@example.com", type: "email" },
};

export const Disabled: Story = {
  args: { placeholder: "Disabled", disabled: true },
};

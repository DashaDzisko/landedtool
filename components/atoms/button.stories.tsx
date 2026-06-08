import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "icon"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "Send magic link", variant: "primary" },
};

export const Secondary: Story = {
  args: { children: "Cancel", variant: "secondary" },
};

export const Ghost: Story = {
  args: { children: "Learn more", variant: "ghost" },
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

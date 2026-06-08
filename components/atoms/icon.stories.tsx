import type { Meta, StoryObj } from "@storybook/react";
import { Sparkle, Gear, Plus } from "@phosphor-icons/react";
import { Icon } from "./icon";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  args: { icon: Gear, size: "md" },
};

export const Fill: Story = {
  args: { icon: Sparkle, size: "md", weight: "fill", className: "text-primary" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={Plus} size="sm" weight="bold" />
      <Icon icon={Plus} size="md" weight="bold" />
      <Icon icon={Plus} size="lg" weight="bold" />
    </div>
  ),
};

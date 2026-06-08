import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Applied" },
};

export const Primary: Story = {
  args: { children: "Offer", variant: "primary" },
};

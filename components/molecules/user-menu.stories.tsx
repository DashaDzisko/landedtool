import type { Meta, StoryObj } from "@storybook/react";
import { UserMenu } from "./user-menu";

const meta = {
  title: "Molecules/UserMenu",
  component: UserMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    nextjs: { appDirectory: true },
  },
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/react";
import { DesignSystemShowcase } from "./showcase";

const meta = {
  title: "Design System/Overview",
  component: DesignSystemShowcase,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DesignSystemShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullShowcase: Story = {};

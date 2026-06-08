import type { Meta, StoryObj } from "@storybook/react";
import { TopBar } from "./top-bar";

const meta = {
  title: "Organisms/Layout/TopBar",
  component: TopBar,
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true, navigation: { pathname: "/dashboard" } },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
  decorators: [
    (Story) => (
      <div className="bg-canvas">
        <Story />
      </div>
    ),
  ],
};

export const Applications: Story = {
  parameters: {
    nextjs: { navigation: { pathname: "/applications" } },
  },
  decorators: [
    (Story) => (
      <div className="bg-canvas">
        <Story />
      </div>
    ),
  ],
};

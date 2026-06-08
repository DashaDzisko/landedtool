import type { Meta, StoryObj } from "@storybook/react";
import { ChatStats } from "./chat-stats";

const meta = {
  title: "Organisms/Chat/ChatStats",
  component: ChatStats,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatStats>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Live pipeline snapshot (reads applications from the provider). */
export const Default: Story = {};

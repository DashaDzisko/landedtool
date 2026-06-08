import type { Meta, StoryObj } from "@storybook/react";
import { ChatPanel } from "./chat-panel";

const meta = {
  title: "Organisms/Chat/ChatPanel",
  component: ChatPanel,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="flex h-[640px] w-[384px] bg-canvas-mesh p-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

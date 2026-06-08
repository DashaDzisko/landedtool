import type { Meta, StoryObj } from "@storybook/react";
import { MessageList } from "./message-list";

const meta = {
  title: "Molecules/MessageList",
  component: MessageList,
  tags: ["autodocs"],
} satisfies Meta<typeof MessageList>;

export default meta;
type Story = StoryObj<typeof meta>;

const messages = [
  {
    id: "1",
    author: "Agent",
    content: "Hello! I can analyse your applications and CV.",
    timestamp: "10:00",
  },
  {
    id: "2",
    author: "You",
    content: "Summarise my pipeline.",
    timestamp: "10:01",
    isUser: true,
  },
  {
    id: "3",
    author: "Agent",
    content:
      "You have 12 active applications — 3 in interview, 2 offers pending.",
    timestamp: "10:01",
  },
];

export const Default: Story = {
  args: { messages },
  render: (args) => (
    <div className="h-96 max-w-xl rounded-lg border border-hairline bg-canvas">
      <MessageList {...args} />
    </div>
  ),
};

export const AgentTyping: Story = {
  args: {
    messages: messages.slice(0, 2),
    isAgentTyping: true,
  },
  render: (args) => (
    <div className="h-96 max-w-xl rounded-lg border border-hairline bg-canvas">
      <MessageList {...args} />
    </div>
  ),
};

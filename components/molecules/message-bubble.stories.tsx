import type { Meta, StoryObj } from "@storybook/react";
import { MessageBubble } from "./message-bubble";

const meta = {
  title: "Molecules/MessageBubble",
  component: MessageBubble,
  tags: ["autodocs"],
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Agent: Story = {
  args: {
    author: "Agent",
    content: "You have 3 applications in interview stage this week.",
    timestamp: "2 min ago",
  },
};

export const User: Story = {
  args: {
    author: "You",
    content: "Which company should I prioritise?",
    timestamp: "Just now",
    isUser: true,
  },
};

export const Streaming: Story = {
  args: {
    author: "Agent",
    content: "Analysing your",
    timestamp: "10:02",
    isStreaming: true,
  },
};

export const PanelVariant: Story = {
  args: {
    author: "Agent",
    content: "You have 3 applications in interview stage.",
    timestamp: "10:01",
    variant: "panel",
  },
};

export const Conversation: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-4">
      <MessageBubble
        author="Agent"
        content="Hello! I can analyse your applications and CV."
        timestamp="10:00"
      />
      <MessageBubble
        author="You"
        content="Summarise my pipeline."
        timestamp="10:01"
        isUser
      />
      <MessageBubble
        author="Agent"
        content="You have 3 applications in interview stage."
        timestamp="10:02"
        isStreaming
      />
    </div>
  ),
};

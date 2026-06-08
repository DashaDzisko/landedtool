import type { Meta, StoryObj } from "@storybook/react";
import { ChatRow } from "./chat-row";

const meta = {
  title: "Molecules/ChatRow",
  component: ChatRow,
  tags: ["autodocs"],
  args: {
    title: "Senior PM applications review",
    date: "Jun 5, 2026",
  },
} satisfies Meta<typeof ChatRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
};

export const HistoryGroup: Story = {
  render: () => (
    <div className="w-72 space-y-3">
      <div>
        <p className="text-eyebrow px-3 pb-1 text-muted">Last 7 days</p>
        <ChatRow title="Prep for the Google interview" date="Jun 5, 2026" active />
        <ChatRow title="Which offers should I compare?" date="Jun 3, 2026" />
      </div>
      <div>
        <p className="text-eyebrow px-3 pb-1 text-muted">This year</p>
        <ChatRow title="Draft a follow-up to Klarna" date="Mar 18, 2026" />
        <ChatRow title="Why am I getting rejected?" date="Feb 2, 2026" />
      </div>
    </div>
  ),
};

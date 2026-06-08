import type { Meta, StoryObj } from "@storybook/react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { ChatStatusChange } from "./chat-status-change";

const meta = {
  title: "Organisms/Chat/Widgets/StatusChange",
  component: ChatStatusChange,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: { applicationId: MOCK_APPLICATIONS[0].id, toStatus: "interview" },
} satisfies Meta<typeof ChatStatusChange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

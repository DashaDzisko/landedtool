import type { Meta, StoryObj } from "@storybook/react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { ChatApplicationCard } from "./chat-application-card";

const meta = {
  title: "Organisms/Chat/Widgets/ApplicationCard",
  component: ChatApplicationCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: { applicationId: MOCK_APPLICATIONS[0].id },
} satisfies Meta<typeof ChatApplicationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

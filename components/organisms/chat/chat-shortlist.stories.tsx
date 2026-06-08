import type { Meta, StoryObj } from "@storybook/react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { ChatShortlist } from "./chat-shortlist";

const meta = {
  title: "Organisms/Chat/Widgets/Shortlist",
  component: ChatShortlist,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    items: MOCK_APPLICATIONS.slice(0, 3).map((a, i) => ({
      applicationId: a.id,
      reason: i === 0 ? "furthest along" : "active & worth a nudge",
    })),
  },
} satisfies Meta<typeof ChatShortlist>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

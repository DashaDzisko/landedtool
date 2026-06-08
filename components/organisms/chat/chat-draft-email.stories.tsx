import type { Meta, StoryObj } from "@storybook/react";
import { ChatDraftEmail } from "./chat-draft-email";

const meta = {
  title: "Organisms/Chat/Widgets/DraftEmail",
  component: ChatDraftEmail,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    subject: "Following up — Service Designer",
    body: "Hi,\n\nThanks again for considering me for the Service Designer role at Echo Health. I'm very excited about the opportunity and wanted to follow up on next steps.\n\nBest,\nDaria",
  },
} satisfies Meta<typeof ChatDraftEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

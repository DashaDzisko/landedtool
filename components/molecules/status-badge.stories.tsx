import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./status-badge";

const meta = {
  title: "Molecules/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status="saved" />
      <StatusBadge status="applied" />
      <StatusBadge status="screening" />
      <StatusBadge status="interview" />
      <StatusBadge status="offer" />
      <StatusBadge status="rejected" />
      <StatusBadge status="withdrawn" />
    </div>
  ),
};

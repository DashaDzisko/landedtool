import type { Meta, StoryObj } from "@storybook/react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { KanbanBoard } from "./kanban-board";

const meta = {
  title: "Organisms/Canvas/KanbanBoard",
  component: KanbanBoard,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof KanbanBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Full pipeline on the dotted canvas; columns carry the squared cell texture. */
export const Default: Story = {
  render: () => (
    <div className="bg-canvas-grid h-[640px] p-6">
      <KanbanBoard applications={MOCK_APPLICATIONS} />
    </div>
  ),
};

/** A focused subset of columns. */
export const CorePipeline: Story = {
  render: () => (
    <div className="bg-canvas-grid h-[640px] p-6">
      <KanbanBoard
        applications={MOCK_APPLICATIONS}
        columns={["saved", "applied", "interview", "offer", "rejected"]}
      />
    </div>
  ),
};

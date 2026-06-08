import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms/button";
import { Plus } from "@phosphor-icons/react";
import { PageHeader } from "./page-header";

const meta = {
  title: "Organisms/Layout/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Applications",
    description: "6 roles in your pipeline",
  },
};

export const WithAction: Story = {
  args: {
    title: "Dashboard",
    description: "Overview of your job search",
    action: (
      <Button size="sm">
        <Plus size={16} weight="bold" />
        Add application
      </Button>
    ),
  },
};

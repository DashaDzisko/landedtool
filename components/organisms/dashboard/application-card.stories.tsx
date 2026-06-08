import type { Meta, StoryObj } from "@storybook/react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { ApplicationCard } from "./application-card";

const meta = {
  title: "Organisms/Dashboard/ApplicationCard",
  component: ApplicationCard,
  tags: ["autodocs"],
} satisfies Meta<typeof ApplicationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interview: Story = {
  args: { application: MOCK_APPLICATIONS[0] },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const Applied: Story = {
  args: { application: MOCK_APPLICATIONS[1] },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const Offer: Story = {
  args: { application: MOCK_APPLICATIONS[3] },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const DashboardOverview: Story = {
  args: {
    application: MOCK_APPLICATIONS[0],
    showMenu: false,
    showUpcomingInterview: true,
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export const Grid: Story = {
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-5xl">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="grid w-full grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {MOCK_APPLICATIONS.slice(0, 6).map((app) => (
        <ApplicationCard
          key={app.id}
          application={app}
          showMenu={false}
          showUpcomingInterview
        />
      ))}
    </div>
  ),
};

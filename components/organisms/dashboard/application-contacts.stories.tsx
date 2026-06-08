import type { Meta, StoryObj } from "@storybook/react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { ApplicationContacts } from "./application-contacts";

const meta = {
  title: "Organisms/Dashboard/ApplicationContacts",
  component: ApplicationContacts,
  tags: ["autodocs"],
} satisfies Meta<typeof ApplicationContacts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { contacts: MOCK_APPLICATIONS[0].contacts ?? [] },
};

export const Empty: Story = {
  args: { contacts: [] },
};

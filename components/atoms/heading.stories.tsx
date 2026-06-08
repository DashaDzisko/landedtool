import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./heading";

const meta = {
  title: "Atoms/Heading",
  component: Heading,
  tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level="display">Display 48px</Heading>
      <Heading level="h1">Heading 1</Heading>
      <Heading level="h2">Heading 2</Heading>
      <Heading level="h3">Heading 3</Heading>
    </div>
  ),
};

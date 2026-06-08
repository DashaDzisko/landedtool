import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ChatComposer } from "./chat-composer";

const meta = {
  title: "Molecules/ChatComposer",
  component: ChatComposer,
  tags: ["autodocs"],
} satisfies Meta<typeof ChatComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState("");
    return (
      <div className="max-w-xl rounded-lg border border-hairline bg-surface-1">
        <ChatComposer value={value} onChange={setValue} />
      </div>
    );
  },
};

export const WithText: Story = {
  render: function Render() {
    const [value, setValue] = useState("Which company should I prioritise?");
    return (
      <div className="max-w-xl rounded-lg border border-hairline bg-surface-1">
        <ChatComposer value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Loading: Story = {
  args: {
    value: "Summarise my pipeline",
    isLoading: true,
  },
  render: (args) => (
    <div className="max-w-xl rounded-lg border border-hairline bg-surface-1">
      <ChatComposer {...args} />
    </div>
  ),
};

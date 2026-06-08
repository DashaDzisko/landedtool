import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TabSwitch } from "./tab-switch";

const meta = {
  title: "Molecules/TabSwitch",
  component: TabSwitch,
  tags: ["autodocs"],
} satisfies Meta<typeof TabSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChatTabs: Story = {
  render: function Render() {
    const [value, setValue] = useState("current");
    return (
      <TabSwitch
        options={[
          { value: "current", label: "Current" },
          { value: "history", label: "History" },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

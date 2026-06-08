import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./form-field";

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "email",
    label: "Email",
    hint: "We will send a magic link",
    inputProps: { type: "email", placeholder: "you@example.com" },
  },
};

export const WithError: Story = {
  args: {
    id: "email-error",
    label: "Email",
    error: "Enter a valid email address",
    inputProps: { type: "email", defaultValue: "invalid" },
  },
};

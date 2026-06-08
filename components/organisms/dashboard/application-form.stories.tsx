"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { ApplicationForm } from "./application-form";

function ApplicationFormDemo({
  mode = "create",
}: {
  mode?: "create" | "edit";
}) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <ApplicationForm
        open={open}
        onOpenChange={setOpen}
        application={mode === "edit" ? MOCK_APPLICATIONS[0] : null}
        onSubmit={() => setOpen(false)}
      />
      {!open && (
        <button
          type="button"
          className="text-small text-primary"
          onClick={() => setOpen(true)}
        >
          Reopen form
        </button>
      )}
    </>
  );
}

const meta = {
  title: "Organisms/Dashboard/ApplicationForm",
  component: ApplicationFormDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof ApplicationFormDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: { mode: "create" },
};

export const Edit: Story = {
  args: { mode: "edit" },
};

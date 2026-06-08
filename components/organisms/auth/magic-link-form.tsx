"use client";

import { Button } from "@/components/atoms/button";
import { FormField } from "@/components/molecules/form-field";
import { useState } from "react";

export interface MagicLinkFormProps {
  onSubmit: (email: string) => void;
  submitLabel?: string;
  loading?: boolean;
}

export function MagicLinkForm({
  onSubmit,
  submitLabel = "Send magic link",
  loading,
}: MagicLinkFormProps) {
  const [email, setEmail] = useState("");

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email);
      }}
    >
      <FormField
        id="email"
        label="Email"
        hint="We'll send a sign-in link — no password needed"
        inputProps={{
          type: "email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
          placeholder: "you@example.com",
          disabled: loading,
        }}
      />
      <Button type="submit" disabled={loading || !email}>
        {loading ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}

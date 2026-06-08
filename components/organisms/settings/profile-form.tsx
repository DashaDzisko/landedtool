"use client";

import { Button } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { FormField } from "@/components/molecules/form-field";
import { Label } from "@/components/atoms/label";
import { Textarea } from "@/components/atoms/textarea";
import { useEffect, useState } from "react";

export interface ProfileFormProps {
  initialName?: string;
  initialCv?: string;
  initialTargetRoles?: string;
  loading?: boolean;
  saving?: boolean;
  onSave?: (data: {
    name: string;
    cv: string;
    targetRoles: string;
  }) => void | Promise<void>;
}

export function ProfileForm({
  initialName = "",
  initialCv = "",
  initialTargetRoles = "",
  loading = false,
  saving = false,
  onSave,
}: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [cv, setCv] = useState(initialCv);
  const [targetRoles, setTargetRoles] = useState(initialTargetRoles);

  useEffect(() => {
    setName(initialName);
    setCv(initialCv);
    setTargetRoles(initialTargetRoles);
  }, [initialName, initialCv, initialTargetRoles]);

  if (loading) {
    return (
      <Text variant="small" className="text-muted">
        Loading profile…
      </Text>
    );
  }

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSave?.({ name, cv, targetRoles });
      }}
    >
      <FormField
        id="name"
        label="Display name"
        inputProps={{
          value: name,
          onChange: (e) => setName(e.target.value),
          placeholder: "Alex User",
        }}
      />
      <FormField
        id="targetRoles"
        label="Target roles"
        hint="Comma-separated — helps the agent tailor advice"
        inputProps={{
          value: targetRoles,
          onChange: (e) => setTargetRoles(e.target.value),
          placeholder: "Product Designer, Design Engineer",
        }}
      />
      <div className="flex flex-col gap-2">
        <Label htmlFor="cv">CV / experience summary</Label>
        <Textarea
          id="cv"
          value={cv}
          onChange={(e) => setCv(e.target.value)}
          placeholder="Paste your CV or a summary for the AI agent…"
          className="min-h-[160px]"
        />
      </div>
      <Button type="submit" size="sm" className="w-fit" disabled={saving}>
        {saving ? "Saving…" : "Save profile"}
      </Button>
    </form>
  );
}

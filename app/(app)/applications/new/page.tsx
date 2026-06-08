"use client";

import { Button } from "@/components/atoms/button";
import { FormField } from "@/components/molecules/form-field";
import { Label } from "@/components/atoms/label";
import { Textarea } from "@/components/atoms/textarea";
import { PageHeader } from "@/components/organisms/layout";
import { useApplications } from "@/components/providers/applications-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import { statusLabels } from "@/lib/status-colors";
import type { ApplicationStatus } from "@/types/application";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUSES = Object.keys(statusLabels) as ApplicationStatus[];

const emptyForm = {
  company: "",
  role: "",
  status: "saved" as ApplicationStatus,
  location: "",
  url: "",
  appliedAt: "",
  source: "",
  notes: "",
};

export default function NewApplicationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { addApplication } = useApplications();
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const app = await addApplication({
        company: form.company,
        role: form.role,
        status: form.status,
        location: form.location || undefined,
        url: form.url || undefined,
        appliedAt: form.appliedAt || undefined,
        source: form.source || undefined,
        notes: form.notes || undefined,
      });
      toast({ title: "Application added", variant: "success" });
      router.push(`/applications/${app.id}`);
    } catch (err) {
      setSubmitting(false);
      toast({
        title: "Could not add application",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "error",
      });
    }
  };

  return (
    <>
      <PageHeader
        title="Add application"
        description="Track a new role in your job search pipeline"
        action={
          <Link
            href="/"
            className="text-small text-primary hover:underline"
          >
            ← Cancel
          </Link>
        }
      />

      <form
        onSubmit={handleSubmit}
        className="grid w-full gap-5 bento-card p-5 lg:grid-cols-2"
      >
        <FormField
          id="company"
          label="Company"
          inputProps={{
            value: form.company,
            onChange: (e) =>
              setForm((f) => ({ ...f, company: e.target.value })),
            required: true,
            placeholder: "Acme Corp",
          }}
        />
        <FormField
          id="role"
          label="Role"
          inputProps={{
            value: form.role,
            onChange: (e) => setForm((f) => ({ ...f, role: e.target.value })),
            required: true,
            placeholder: "Product Designer",
          }}
        />
        <div className="flex flex-col gap-2 lg:col-span-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={form.status}
            onValueChange={(v) =>
              setForm((f) => ({ ...f, status: v as ApplicationStatus }))
            }
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {statusLabels[status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 lg:col-span-2 sm:grid-cols-2">
          <FormField
            id="location"
            label="Location"
            inputProps={{
              value: form.location,
              onChange: (e) =>
                setForm((f) => ({ ...f, location: e.target.value })),
              placeholder: "Remote",
            }}
          />
          <FormField
            id="source"
            label="Source"
            inputProps={{
              value: form.source,
              onChange: (e) =>
                setForm((f) => ({ ...f, source: e.target.value })),
              placeholder: "LinkedIn",
            }}
          />
        </div>
        <FormField
          id="url"
          label="Job posting URL"
          className="lg:col-span-2"
          inputProps={{
            type: "url",
            value: form.url,
            onChange: (e) => setForm((f) => ({ ...f, url: e.target.value })),
            placeholder: "https://…",
          }}
        />
        <FormField
          id="appliedAt"
          label="Applied date"
          inputProps={{
            type: "date",
            value: form.appliedAt,
            onChange: (e) =>
              setForm((f) => ({ ...f, appliedAt: e.target.value })),
          }}
        />
        <div className="flex flex-col gap-2 lg:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={form.notes}
            onChange={(e) =>
              setForm((f) => ({ ...f, notes: e.target.value }))
            }
            placeholder="Interview notes, contacts, salary expectations…"
          />
        </div>
        <div className="flex justify-end gap-3 pt-2 lg:col-span-2">
          <Button variant="secondary" asChild>
            <Link href="/">Cancel</Link>
          </Button>
          <Button type="submit" disabled={submitting}>
            Add application
          </Button>
        </div>
      </form>
    </>
  );
}

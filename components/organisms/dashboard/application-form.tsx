"use client";

import { Button } from "@/components/atoms/button";
import { FormField } from "@/components/molecules/form-field";
import { Label } from "@/components/atoms/label";
import { Textarea } from "@/components/atoms/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusLabels } from "@/lib/status-colors";
import type { Application, ApplicationStatus } from "@/types/application";
import { useEffect, useState } from "react";

const STATUSES = Object.keys(statusLabels) as ApplicationStatus[];

export interface ApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application?: Application | null;
  onSubmit: (data: Omit<Application, "id"> & { id?: string }) => void;
}

const emptyForm = {
  company: "",
  role: "",
  status: "saved" as ApplicationStatus,
  location: "",
  url: "",
  description: "",
  appliedAt: "",
  source: "",
};

export function ApplicationForm({
  open,
  onOpenChange,
  application,
  onSubmit,
}: ApplicationFormProps) {
  const [form, setForm] = useState(emptyForm);
  const isEdit = !!application;

  useEffect(() => {
    // Reset the form when a different application is opened for edit/new.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (application) {
      setForm({
        company: application.company,
        role: application.role,
        status: application.status,
        location: application.location ?? "",
        url: application.url ?? "",
        description: application.description ?? "",
        appliedAt: application.appliedAt ?? "",
        source: application.source ?? "",
      });
    } else {
      setForm(emptyForm);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [application, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: application?.id,
      company: form.company,
      role: form.role,
      status: form.status,
      location: form.location || undefined,
      url: form.url || undefined,
      description: form.description || undefined,
      appliedAt: form.appliedAt || undefined,
      source: form.source || undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit application" : "Add application"}
            </DialogTitle>
            <DialogDescription>
              Track a new role in your job search pipeline.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
                onChange: (e) =>
                  setForm((f) => ({ ...f, role: e.target.value })),
                required: true,
                placeholder: "Product Designer",
              }}
            />
            <div className="flex flex-col gap-2">
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
            <div className="grid gap-4 sm:grid-cols-2">
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
              inputProps={{
                type: "url",
                value: form.url,
                onChange: (e) =>
                  setForm((f) => ({ ...f, url: e.target.value })),
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
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Job description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Paste the job posting or a summary…"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEdit ? "Save changes" : "Add application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

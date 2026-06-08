"use client";

import { Button } from "@/components/atoms/button";
import {
  ApplicationDetail,
  ApplicationForm,
} from "@/components/organisms/dashboard";
import { PageHeader } from "@/components/organisms/layout";
import { useApplications } from "@/components/providers/applications-provider";
import { useChat } from "@/components/organisms/chat/chat-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import type { Application } from "@/types/application";
import { CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplicationPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { toast } = useToast();
  const { getApplication, updateApplication, deleteApplication } =
    useApplications();
  const { askAboutApplication } = useChat();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const application = getApplication(id);

  if (!application) {
    return (
      <>
        <PageHeader title="Application not found" />
        <Link
          href="/"
          className="text-small text-primary hover:underline"
        >
          ← Back to applications
        </Link>
      </>
    );
  }

  const handleSubmit = (
    data: Omit<Application, "id"> & { id?: string }
  ) => {
    updateApplication(id, data);
    toast({ title: "Application updated", variant: "success" });
  };

  const handleDelete = () => {
    deleteApplication(id);
    toast({ title: "Application deleted" });
    router.push("/");
  };

  return (
    <>
      <nav
        className="flex items-center gap-1.5 text-small"
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="text-muted no-underline transition-colors hover:text-foreground"
        >
          Applications
        </Link>
        <CaretRight size={12} weight="bold" className="text-ink-subtle" />
        <span className="text-foreground">{application.company}</span>
      </nav>
      <ApplicationDetail
        application={application}
        onEdit={() => setFormOpen(true)}
        onDelete={() => setDeleteOpen(true)}
        onAskAgent={() =>
          askAboutApplication(
            application.id,
            application.company,
            application.role
          )
        }
      />
      <ApplicationForm
        open={formOpen}
        onOpenChange={setFormOpen}
        application={application}
        onSubmit={handleSubmit}
      />

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete application?</DialogTitle>
            <DialogDescription>
              This will permanently remove {application.company} —{" "}
              {application.role} from your pipeline.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

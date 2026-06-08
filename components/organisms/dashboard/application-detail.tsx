"use client";

import { Button } from "@/components/atoms/button";
import { Heading } from "@/components/atoms/heading";
import { Input } from "@/components/atoms/input";
import { Text } from "@/components/atoms/text";
import { Textarea } from "@/components/atoms/textarea";
import { StatusBadge } from "@/components/molecules/status-badge";
import { ApplicationContacts } from "@/components/organisms/dashboard/application-contacts";
import { useApplications } from "@/components/providers/applications-provider";
import { useToast } from "@/components/ui/toast";
import { createContact } from "@/lib/db/contacts";
import {
  removeApplicationCv,
  uploadApplicationCv,
} from "@/lib/db/applications";
import { createNote, deleteNote, updateNote } from "@/lib/db/notes";
import { cn } from "@/lib/utils";
import type {
  Application,
  ApplicationContact,
  ApplicationNote,
} from "@/types/application";
import {
  ArrowSquareOut,
  ChatCircle,
  Paperclip,
  PencilSimple,
  Plus,
  Trash,
  UploadSimple,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

function cvFileName(cvUrl?: string) {
  if (!cvUrl) return null;
  return cvUrl.split("/").pop() ?? cvUrl;
}

function formatSalary(app: Application): string | null {
  const { salary } = app;
  if (!salary?.min && !salary?.max) return null;
  const currency = salary.currency ?? "GBP";
  const symbol = currency === "GBP" ? "£" : currency === "USD" ? "$" : "";
  if (salary.min && salary.max) {
    return `${symbol}${salary.min.toLocaleString()} – ${symbol}${salary.max.toLocaleString()}`;
  }
  if (salary.min) return `${symbol}${salary.min.toLocaleString()}+`;
  if (salary.max) return `Up to ${symbol}${salary.max.toLocaleString()}`;
  return null;
}

function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("bento-card flex flex-col gap-3 p-5", className)}>
      <Heading level="h3">{title}</Heading>
      {children}
    </section>
  );
}

export interface ApplicationDetailProps {
  application: Application;
  onEdit?: () => void;
  onDelete?: () => void;
  onAskAgent?: () => void;
}

export function ApplicationDetail({
  application,
  onEdit,
  onDelete,
  onAskAgent,
}: ApplicationDetailProps) {
  const { updateApplication, reloadApplications } = useApplications();
  const { toast } = useToast();
  const salary = formatSalary(application);
  const [editingDesc, setEditingDesc] = useState(false);
  const [descDraft, setDescDraft] = useState("");
  const [notes, setNotes] = useState<ApplicationNote[]>(
    application.noteItems ?? []
  );
  const [draft, setDraft] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [cvName, setCvName] = useState<string | null>(
    cvFileName(application.cvUrl)
  );
  const [uploadingCv, setUploadingCv] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [contacts, setContacts] = useState<ApplicationContact[]>(
    application.contacts ?? []
  );
  const [addingContact, setAddingContact] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    role: "",
    email: "",
  });

  useEffect(() => {
    setNotes(application.noteItems ?? []);
    setContacts(application.contacts ?? []);
    setCvName(cvFileName(application.cvUrl));
  }, [application]);

  const startEditDesc = () => {
    setDescDraft(application.description ?? "");
    setEditingDesc(true);
  };

  const saveDesc = () => {
    updateApplication(application.id, {
      description: descDraft.trim() || undefined,
    });
    setEditingDesc(false);
  };

  const addNote = async () => {
    const value = draft.trim();
    if (!value) return;
    try {
      const note = await createNote(application.id, value);
      setNotes((prev) => [...prev, note]);
      setDraft("");
      await reloadApplications();
    } catch (err) {
      toast({
        title: "Could not add note",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "error",
      });
    }
  };

  const startEdit = (note: ApplicationNote) => {
    setEditingNoteId(note.id);
    setEditDraft(note.body);
  };

  const saveEdit = async () => {
    const value = editDraft.trim();
    if (!value || !editingNoteId) return;
    try {
      const updated = await updateNote(editingNoteId, value);
      setNotes((prev) =>
        prev.map((n) => (n.id === editingNoteId ? updated : n))
      );
      setEditingNoteId(null);
      setEditDraft("");
      await reloadApplications();
    } catch (err) {
      toast({
        title: "Could not update note",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "error",
      });
    }
  };

  const cancelEdit = () => {
    setEditingNoteId(null);
    setEditDraft("");
  };

  const removeNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      if (editingNoteId === noteId) cancelEdit();
      await reloadApplications();
    } catch (err) {
      toast({
        title: "Could not delete note",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "error",
      });
    }
  };

  const addContact = async () => {
    const name = contactForm.name.trim();
    if (!name) return;
    try {
      const contact = await createContact(application.id, {
        name,
        role: contactForm.role.trim() || undefined,
        email: contactForm.email.trim() || undefined,
      });
      setContacts((prev) => [...prev, contact]);
      setContactForm({ name: "", role: "", email: "" });
      setAddingContact(false);
      await reloadApplications();
    } catch (err) {
      toast({
        title: "Could not add contact",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "error",
      });
    }
  };

  const handleCvUpload = async (file: File) => {
    setUploadingCv(true);
    try {
      const path = await uploadApplicationCv(application.id, file);
      setCvName(file.name);
      updateApplication(application.id, { cvUrl: path });
      toast({ title: "CV uploaded", variant: "success" });
    } catch (err) {
      toast({
        title: "Could not upload CV",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "error",
      });
    } finally {
      setUploadingCv(false);
    }
  };

  const handleCvRemove = async () => {
    try {
      await removeApplicationCv(application.id);
      setCvName(null);
      updateApplication(application.id, { cvUrl: undefined });
      toast({ title: "CV removed" });
    } catch (err) {
      toast({
        title: "Could not remove CV",
        description: err instanceof Error ? err.message : "Something went wrong",
        variant: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="anim-rise flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={application.status} />
            {application.location && (
              <Text variant="small" as="span" className="text-muted">
                {application.location}
              </Text>
            )}
            {application.source && (
              <Text variant="xs" as="span" className="text-muted">
                via {application.source}
              </Text>
            )}
            {application.appliedAt && (
              <Text variant="xs" as="span" className="text-ink-subtle">
                · Applied {application.appliedAt}
              </Text>
            )}
          </div>
          <Heading level="h1">
            {application.role}{" "}
            <span className="font-normal text-muted">@</span>{" "}
            {application.company}
          </Heading>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {onAskAgent && (
            <span className="animated-branded-border">
              <Button
                variant="secondary"
                size="sm"
                onClick={onAskAgent}
                className="border-transparent"
              >
                <ChatCircle size={16} />
                Ask agent
              </Button>
            </span>
          )}
          {onEdit && (
            <Button variant="secondary" size="sm" onClick={onEdit}>
              <PencilSimple size={16} />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300"
              onClick={onDelete}
            >
              <Trash size={16} />
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Two-column body — no tabs */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* LEFT: notes + CV */}
        <div className="anim-stagger flex flex-col gap-5">
          <Section title="Notes">
            {notes.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {notes.map((note) => (
                  <li
                    key={note.id}
                    className="group flex items-start gap-2 rounded-md border border-hairline bg-surface-3 px-4 py-3"
                  >
                    {editingNoteId === note.id ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          void saveEdit();
                        }}
                        className="flex flex-1 items-center gap-2"
                      >
                        <Input
                          value={editDraft}
                          onChange={(e) => setEditDraft(e.target.value)}
                          aria-label="Edit note"
                          autoFocus
                        />
                        <Button
                          type="submit"
                          size="sm"
                          disabled={!editDraft.trim()}
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </Button>
                      </form>
                    ) : (
                      <>
                        <span className="flex-1 whitespace-pre-wrap text-small text-ink-muted">
                          {note.body}
                        </span>
                        <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => startEdit(note)}
                            aria-label="Edit note"
                            className="rounded-sm p-1 text-muted transition-colors hover:bg-surface-4 hover:text-foreground"
                          >
                            <PencilSimple size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeNote(note.id)}
                            aria-label="Delete note"
                            className="rounded-sm p-1 text-muted transition-colors hover:bg-surface-4 hover:text-red-400"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <Text variant="small" className="text-muted">
                No notes yet.
              </Text>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void addNote();
              }}
              className="flex gap-2"
            >
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Add a note…"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Add note"
                disabled={!draft.trim()}
                className="min-h-10 min-w-10 shrink-0"
              >
                <Plus size={16} weight="bold" />
              </Button>
            </form>
          </Section>

          <Section title="CV">
            {cvName ? (
              <div className="flex items-center justify-between gap-2 rounded-md border border-hairline bg-surface-3 px-4 py-3">
                <span className="flex min-w-0 items-center gap-2 text-small">
                  <Paperclip size={16} className="shrink-0 text-muted" />
                  <span className="truncate">{cvName}</span>
                </span>
                <button
                  type="button"
                  onClick={() => void handleCvRemove()}
                  className="shrink-0 text-xs text-muted transition-colors hover:text-foreground"
                >
                  Remove
                </button>
              </div>
            ) : (
              <Text variant="small" className="text-muted">
                No CV uploaded.
              </Text>
            )}
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleCvUpload(file);
                e.target.value = "";
              }}
            />
            <Button
              variant="secondary"
              size="sm"
              className="self-start"
              disabled={uploadingCv}
              onClick={() => fileRef.current?.click()}
            >
              <UploadSimple size={16} />
              {uploadingCv ? "Uploading…" : cvName ? "Replace CV" : "Upload CV"}
            </Button>
          </Section>
        </div>

        {/* RIGHT: job description + link + contact */}
        <div className="anim-stagger flex flex-col gap-5">
          <Section title="Job description">
            {editingDesc ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveDesc();
                }}
                className="flex flex-col gap-2"
              >
                <Textarea
                  value={descDraft}
                  onChange={(e) => setDescDraft(e.target.value)}
                  placeholder="Paste the job posting or a summary…"
                  aria-label="Job description"
                  autoFocus
                  className="min-h-32"
                />
                <div className="flex gap-2">
                  <Button type="submit" size="sm">
                    Save
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingDesc(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <>
                {application.description ? (
                  <Text
                    variant="small"
                    className="whitespace-pre-wrap text-ink-muted"
                  >
                    {application.description}
                  </Text>
                ) : (
                  <Text variant="small" className="text-muted">
                    No description added.
                  </Text>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="self-start"
                  onClick={startEditDesc}
                >
                  <PencilSimple size={16} />
                  {application.description ? "Edit description" : "Add description"}
                </Button>
              </>
            )}
            {salary && (
              <div className="mt-1 flex items-center gap-2 border-t border-white/5 pt-3">
                <Text variant="xs" as="span" className="text-muted">
                  Salary
                </Text>
                <Text variant="small" as="span" className="font-medium">
                  {salary}
                </Text>
              </div>
            )}
          </Section>

          <Section title="Link to opening">
            {application.url ? (
              <a
                href={application.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 break-all text-small text-primary no-underline hover:underline"
              >
                <ArrowSquareOut size={16} className="shrink-0" />
                {application.url}
              </a>
            ) : (
              <Text variant="small" className="text-muted">
                No link added.
              </Text>
            )}
          </Section>

          <Section title="Contact">
            {contacts.length > 0 && <ApplicationContacts contacts={contacts} />}

            {addingContact ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void addContact();
                }}
                className="flex flex-col gap-2 rounded-md border border-hairline bg-surface-3 p-3"
              >
                <Input
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Name"
                  aria-label="Contact name"
                  autoFocus
                />
                <Input
                  value={contactForm.role}
                  onChange={(e) =>
                    setContactForm((f) => ({ ...f, role: e.target.value }))
                  }
                  placeholder="Role (optional)"
                  aria-label="Contact role"
                />
                <Input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="Email (optional)"
                  aria-label="Contact email"
                />
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!contactForm.name.trim()}
                  >
                    Add contact
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setAddingContact(false);
                      setContactForm({ name: "", role: "", email: "" });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setAddingContact(true)}
                className="flex items-center justify-center gap-2 rounded-md border border-dashed border-hairline-strong px-4 py-3 text-small text-muted transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Plus size={16} />
                Add contact
              </button>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { useState } from "react";

export interface ChatDraftEmailProps {
  subject: string;
  body: string;
}

/** Agentic action widget — an editable draft email with copy / regenerate. */
export function ChatDraftEmail({ subject, body }: ChatDraftEmailProps) {
  const [draftSubject, setDraftSubject] = useState(subject);
  const [draftBody, setDraftBody] = useState(body);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    void navigator.clipboard
      ?.writeText(`Subject: ${draftSubject}\n\n${draftBody}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
  };

  return (
    <div className="anim-rise bento-card flex flex-col gap-2 p-4">
      <Input
        value={draftSubject}
        onChange={(e) => setDraftSubject(e.target.value)}
        className="h-9 text-small"
        aria-label="Email subject"
      />
      <Textarea
        value={draftBody}
        onChange={(e) => setDraftBody(e.target.value)}
        className="scroll-styled min-h-32 text-chat"
        aria-label="Email body"
      />
      <div className="flex gap-2">
        <Button size="sm" onClick={copy}>
          {copied ? "Copied ✓" : "Copy"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setDraftBody(body)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

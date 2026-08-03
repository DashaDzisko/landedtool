"use client";

import { Button } from "@/components/atoms/button";
import { Icon } from "@/components/atoms/icon";
import { Text } from "@/components/atoms/text";
import { StatusBadge } from "@/components/molecules/status-badge";
import { useApplications } from "@/components/providers/applications-provider";
import { statusLabels } from "@/lib/status-colors";
import type { ApplicationStatus } from "@/types/application";
import { ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";

export interface ChatStatusChangeProps {
  applicationId: string;
  toStatus: ApplicationStatus;
}

/**
 * Agentic action widget — proposes a status move and asks the user to confirm.
 * Confirming applies the change: it calls `updateApplication`, which updates the
 * board optimistically and persists to Supabase (rolling back on failure).
 */
export function ChatStatusChange({
  applicationId,
  toStatus,
}: ChatStatusChangeProps) {
  const { applications, updateApplication } = useApplications();
  const app = applications.find((a) => a.id === applicationId);
  const [state, setState] = useState<"pending" | "confirmed" | "cancelled">(
    "pending"
  );
  if (!app) return null;

  const confirm = () => {
    // No-op if it's already in the target status (e.g. widget re-rendered).
    if (app.status !== toStatus) {
      updateApplication(applicationId, { status: toStatus });
    }
    setState("confirmed");
  };

  return (
    <div className="anim-rise bento-card flex flex-col gap-3 p-4">
      <Text variant="xs" as="p" className="text-ink-muted">
        Move{" "}
        <span className="font-medium text-foreground">{app.role}</span> at{" "}
        {app.company}
      </Text>
      <div className="flex items-center gap-2">
        <StatusBadge status={app.status} />
        <Icon icon={ArrowRight} size="sm" className="text-ink-subtle" />
        <StatusBadge status={toStatus} />
      </div>
      {state === "pending" ? (
        <div className="flex gap-2">
          <Button size="sm" onClick={confirm}>
            Confirm
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setState("cancelled")}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Text variant="xs" as="span" className="text-ink-subtle">
          {state === "confirmed"
            ? `Moved to ${statusLabels[toStatus]} ✓`
            : "Cancelled"}
        </Text>
      )}
    </div>
  );
}

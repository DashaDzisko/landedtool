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
 * UI + mock only: confirming shows an acknowledgement. To go live, call
 * `updateApplication(applicationId, { status: toStatus })` on confirm.
 */
export function ChatStatusChange({
  applicationId,
  toStatus,
}: ChatStatusChangeProps) {
  const { applications } = useApplications();
  const app = applications.find((a) => a.id === applicationId);
  const [state, setState] = useState<"pending" | "confirmed" | "cancelled">(
    "pending"
  );
  if (!app) return null;

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
          <Button size="sm" onClick={() => setState("confirmed")}>
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

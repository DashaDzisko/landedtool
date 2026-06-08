"use client";

import { Text } from "@/components/atoms/text";
import { StatusBadge } from "@/components/molecules/status-badge";
import { useApplications } from "@/components/providers/applications-provider";

export interface ChatShortlistItem {
  applicationId: string;
  reason: string;
}

export interface ChatShortlistProps {
  items: ChatShortlistItem[];
}

/** Agentic widget — a ranked shortlist of applications with a reason each. */
export function ChatShortlist({ items }: ChatShortlistProps) {
  const { applications } = useApplications();

  return (
    <div className="anim-rise bento-card flex flex-col divide-y divide-hairline overflow-hidden">
      {items.map((item, index) => {
        const app = applications.find((a) => a.id === item.applicationId);
        if (!app) return null;
        return (
          <div key={item.applicationId} className="flex flex-col gap-1 p-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-ink-subtle">
                {index + 1}
              </span>
              <StatusBadge status={app.status} />
              <span className="truncate text-small font-medium text-foreground">
                {app.role}
              </span>
            </div>
            <Text variant="xs" as="span" className="text-ink-muted">
              {app.company} · {item.reason}
            </Text>
          </div>
        );
      })}
    </div>
  );
}

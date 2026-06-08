"use client";

import { CountUp } from "@/components/atoms/count-up";
import { Text } from "@/components/atoms/text";
import { useApplications } from "@/components/providers/applications-provider";
import { statusLabels } from "@/lib/status-colors";
import type { ApplicationStatus } from "@/types/application";

const ORDER: ApplicationStatus[] = [
  "saved",
  "applied",
  "screening",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
];

const CLOSED: ApplicationStatus[] = ["rejected", "withdrawn"];

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-md bg-surface-3 px-3 py-2">
      <Text variant="xs" as="span" className="text-ink-subtle">
        {label}
      </Text>
      <span className="text-h2 font-semibold text-foreground">
        <CountUp value={value} />
      </span>
    </div>
  );
}

/**
 * Agentic chat widget — a live snapshot of the application pipeline:
 * summary metrics + a per-status bar chart. Reads applications from context.
 */
export function ChatStats() {
  const { applications } = useApplications();

  const counts = ORDER.map((status) => ({
    status,
    count: applications.filter((a) => a.status === status).length,
  }));
  const max = Math.max(1, ...counts.map((c) => c.count));
  const active = applications.filter(
    (a) => !CLOSED.includes(a.status)
  ).length;
  const interviews =
    counts.find((c) => c.status === "interview")?.count ?? 0;
  const offers = counts.find((c) => c.status === "offer")?.count ?? 0;

  return (
    <div className="anim-rise bento-card flex flex-col gap-3 p-4">
      <div className="grid grid-cols-3 gap-2">
        <Metric label="Active" value={active} />
        <Metric label="Interviews" value={interviews} />
        <Metric label="Offers" value={offers} />
      </div>

      <div className="flex flex-col gap-1.5">
        {counts
          .filter((c) => c.count > 0)
          .map(({ status, count }) => (
            <div key={status} className="flex items-center gap-2">
              <span className="w-16 shrink-0 text-xs text-ink-subtle">
                {statusLabels[status]}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-pill bg-surface-3">
                <div
                  className="anim-bar h-full rounded-pill"
                  style={{
                    width: `${(count / max) * 100}%`,
                    backgroundColor: `var(--status-${status}-text)`,
                  }}
                />
              </div>
              <span className="w-4 shrink-0 text-right text-xs text-ink-muted">
                <CountUp value={count} />
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

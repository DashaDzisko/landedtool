"use client";

import { Text } from "@/components/atoms/text";
import { StatusBadge } from "@/components/molecules/status-badge";
import { ApplicationCard } from "@/components/organisms/dashboard/application-card";
import { cn } from "@/lib/utils";
import type { Application, ApplicationStatus } from "@/types/application";
import type { MouseEvent, PointerEvent } from "react";

export interface KanbanColumnProps {
  status: ApplicationStatus;
  applications: Application[];
  /** Drag wiring (enabled when provided). */
  draggingId?: string | null;
  isOver?: boolean;
  onCardPointerDown?: (e: PointerEvent, app: Application) => void;
  onCardClickCapture?: (e: MouseEvent) => void;
  className?: string;
}

/**
 * One status column of the applications Kanban. When the drag handlers are
 * provided, cards are grabbable (pointer-based) and the column — tagged with
 * `data-status` for hit-testing — is a drop target that changes status.
 */
export function KanbanColumn({
  status,
  applications,
  draggingId,
  isOver,
  onCardPointerDown,
  onCardClickCapture,
  className,
}: KanbanColumnProps) {
  const interactive = Boolean(onCardPointerDown);

  return (
    <section
      data-status={status}
      className={cn(
        "flex w-72 shrink-0 flex-col overflow-hidden rounded-bento border bg-surface-1 transition-colors",
        isOver ? "border-primary/50" : "border-hairline",
        className
      )}
    >
      <header className="flex items-center justify-between gap-2 border-b border-hairline px-3 py-2.5">
        <StatusBadge status={status} />
        <Text variant="xs" as="span" className="text-ink-subtle">
          {applications.length}
        </Text>
      </header>
      <div
        className={cn(
          "scroll-styled bg-grid-cells flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3 transition-colors",
          isOver && "bg-primary-muted/30"
        )}
      >
        {applications.length === 0 ? (
          <Text
            variant="xs"
            as="p"
            className="px-1 py-6 text-center text-ink-subtle"
          >
            {isOver ? "Drop to move here" : "No applications"}
          </Text>
        ) : (
          applications.map((application) =>
            interactive ? (
              <div
                key={application.id}
                data-card-id={application.id}
                onPointerDown={(e) => onCardPointerDown?.(e, application)}
                onClickCapture={onCardClickCapture}
                className={cn(
                  "touch-none select-none transition-opacity",
                  draggingId === application.id
                    ? "opacity-30"
                    : "cursor-grab active:cursor-grabbing"
                )}
              >
                <ApplicationCard
                  application={application}
                  showMenu={false}
                  statusDisplay="hidden"
                />
              </div>
            ) : (
              <ApplicationCard
                key={application.id}
                application={application}
                showMenu={false}
                statusDisplay="hidden"
              />
            )
          )
        )}
      </div>
    </section>
  );
}

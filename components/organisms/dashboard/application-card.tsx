import { Text } from "@/components/atoms/text";
import { StatusBadge } from "@/components/molecules/status-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Application, InterviewRound } from "@/types/application";
import { ArrowSquareOut, CalendarBlank, DotsThree } from "@phosphor-icons/react";
import Link from "next/link";

export interface ApplicationCardProps {
  application: Application;
  onEdit?: (application: Application) => void;
  onDelete?: (id: string) => void;
  showMenu?: boolean;
  showUpcomingInterview?: boolean;
  /**
   * How to show status. `"badge"` (default) renders the status pill. `"hidden"`
   * omits it — use inside the Kanban, where the column already conveys status.
   */
  statusDisplay?: "badge" | "hidden";
  className?: string;
}

function CompanyMark({ company }: { company: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface-3 text-small font-semibold text-foreground">
      {company.charAt(0).toUpperCase()}
    </span>
  );
}

function ApplicationCardHeader({
  application,
  detailHref,
  hasActions,
  onEdit,
  onDelete,
}: {
  application: Application;
  detailHref: string;
  hasActions: boolean;
  onEdit?: (application: Application) => void;
  onDelete?: (id: string) => void;
}) {
  const titleBlock = (
    <>
      <CompanyMark company={application.company} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Text variant="small" as="span" className="truncate font-semibold text-foreground">
          {application.company}
        </Text>
        <Text variant="xs" as="span" className="truncate text-ink-muted">
          {application.role}
        </Text>
      </div>
    </>
  );

  return (
    <div className="flex items-start justify-between gap-3">
      {hasActions ? (
        <Link
          href={detailHref}
          className="flex min-w-0 flex-1 items-start gap-3 no-underline"
        >
          {titleBlock}
        </Link>
      ) : (
        <div className="flex min-w-0 flex-1 items-start gap-3">{titleBlock}</div>
      )}
      {hasActions && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="icon-circle h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Application actions"
            >
              <DotsThree size={16} weight="bold" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(application)}>
                Edit
              </DropdownMenuItem>
            )}
            {application.url && (
              <DropdownMenuItem asChild>
                <a
                  href={application.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ArrowSquareOut size={16} />
                  View posting
                </a>
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem
                className="text-red-400"
                onClick={() => onDelete(application.id)}
              >
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

function ApplicationCardMeta({
  application,
  showUpcomingInterview,
  nextInterview,
  showStatusBadge,
}: {
  application: Application;
  showUpcomingInterview: boolean;
  nextInterview?: InterviewRound;
  showStatusBadge: boolean;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {showStatusBadge && <StatusBadge status={application.status} />}
        {application.location && (
          <Text variant="xs" as="span" className="text-ink-subtle">
            {application.location}
          </Text>
        )}
        {application.appliedAt && (
          <Text variant="xs" as="span" className="text-ink-subtle">
            {application.appliedAt}
          </Text>
        )}
      </div>
      {showUpcomingInterview && nextInterview && (
        <div className="mt-auto flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2">
          <CalendarBlank size={14} className="shrink-0 text-primary" weight="fill" />
          <Text variant="xs" as="span" className="truncate text-foreground">
            {nextInterview.type} · {nextInterview.date}
          </Text>
        </div>
      )}
    </>
  );
}

export function ApplicationCard({
  application,
  onEdit,
  onDelete,
  showMenu = true,
  showUpcomingInterview = false,
  statusDisplay = "badge",
  className,
}: ApplicationCardProps) {
  const nextInterview = application.interviews?.find(
    (interview) => interview.outcome === "pending"
  );
  const hasActions = Boolean(
    showMenu && (onEdit || onDelete || application.url)
  );
  const detailHref = `/applications/${application.id}`;
  const cardClassName = cn(
    "group bento-card bento-hover flex flex-col gap-4 p-5",
    !hasActions && "no-underline",
    className
  );

  const content = (
    <>
      <ApplicationCardHeader
        application={application}
        detailHref={detailHref}
        hasActions={hasActions}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <ApplicationCardMeta
        application={application}
        showUpcomingInterview={showUpcomingInterview}
        nextInterview={nextInterview}
        showStatusBadge={statusDisplay !== "hidden"}
      />
    </>
  );

  if (!hasActions) {
    return (
      <Link href={detailHref} draggable={false} className={cardClassName}>
        {content}
      </Link>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}

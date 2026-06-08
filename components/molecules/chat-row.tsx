"use client";

import { Icon } from "@/components/atoms/icon";
import { Text } from "@/components/atoms/text";
import { ChatCircle } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface ChatRowProps {
  title: string;
  date: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * A row in the chat History list — leading chat dot, title, and date.
 * Grouped by time at the list level. See design.md → Components → Chat history row.
 */
export function ChatRow({
  title,
  date,
  active,
  onClick,
  className,
}: ChatRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
        active ? "bg-primary-muted" : "bg-transparent hover:bg-surface-1",
        className
      )}
    >
      <span
        className={cn(
          "icon-circle h-8 w-8 shrink-0",
          active && "icon-circle-primary"
        )}
      >
        <Icon icon={ChatCircle} size="sm" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <Text variant="xs" as="span" className="truncate font-medium">
          {title}
        </Text>
        <Text variant="xs" as="span">
          {date}
        </Text>
      </span>
    </button>
  );
}

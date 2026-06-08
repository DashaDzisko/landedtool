"use client";

import { Icon } from "@/components/atoms/icon";
import { Sparkle, CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface ModelPillProps {
  model: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Model selector pill for the chat composer ("GPT-4o ▾"), Stitch-style.
 * See design.md → Components → Model pill.
 */
export function ModelPill({ model, onClick, className }: ModelPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-surface-3 px-3 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-focus/50",
        className
      )}
    >
      <Icon icon={Sparkle} size="sm" weight="fill" className="text-primary" />
      <span>{model}</span>
      <Icon icon={CaretDown} size="sm" />
    </button>
  );
}

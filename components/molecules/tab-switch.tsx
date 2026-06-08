"use client";

import { cn } from "@/lib/utils";

export interface TabSwitchOption<T extends string = string> {
  value: T;
  label: string;
}

export interface TabSwitchProps<T extends string = string> {
  options: TabSwitchOption<T>[];
  value: T;
  onChange?: (value: T) => void;
  /** Stretch to fill the container with equal-width tabs. */
  fluid?: boolean;
  className?: string;
}

/**
 * Segmented control with a pink active pill — used for the chat pane's
 * `Current` / `History` tabs. See design.md → Components → Segmented tabs.
 */
export function TabSwitch<T extends string = string>({
  options,
  value,
  onChange,
  fluid,
  className,
}: TabSwitchProps<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-hairline bg-surface-3 p-1",
        fluid && "flex w-full",
        className
      )}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange?.(option.value)}
            className={cn(
              "rounded-sm px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-focus/50",
              fluid && "flex-1",
              selected
                ? "bg-primary text-on-primary"
                : "bg-transparent text-muted hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

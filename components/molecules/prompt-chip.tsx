import { cn } from "@/lib/utils";

export interface PromptChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PromptChip({
  label,
  selected,
  onClick,
  className,
}: PromptChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border px-2.5 py-1 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus/50",
        selected
          ? "border-transparent bg-primary text-on-primary"
          : "border-hairline bg-surface-3 text-muted hover:border-primary/20 hover:bg-surface-4 hover:text-foreground",
        className
      )}
    >
      {label}
    </button>
  );
}

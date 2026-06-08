import { cn } from "@/lib/utils";

export interface TypingIndicatorProps {
  className?: string;
  label?: string;
}

export function TypingIndicator({
  className,
  label = "Agent is typing",
}: TypingIndicatorProps) {
  return (
    <div
      className={cn("flex items-center gap-1 px-1 py-2", className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 animate-bounce rounded-pill bg-ink-subtle"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}

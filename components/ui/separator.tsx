import { cn } from "@/lib/utils";

export interface SeparatorProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Separator({
  className,
  orientation = "horizontal",
}: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-hairline",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
    />
  );
}

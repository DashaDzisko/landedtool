import { cn } from "@/lib/utils";

export interface SpinnerProps {
  className?: string;
  label?: string;
}

export function Spinner({ className, label = "Loading" }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "inline-block h-5 w-5 animate-spin rounded-full border-0 bg-[conic-gradient(from_0deg,var(--color-primary)_0deg,transparent_360deg)] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_0)]",
        className
      )}
    />
  );
}

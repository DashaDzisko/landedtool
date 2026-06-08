import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-10 w-full rounded-md border border-hairline bg-surface-3 px-4 text-body text-foreground outline-none placeholder:text-muted focus-visible:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus/40 disabled:opacity-40",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";

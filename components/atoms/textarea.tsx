import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[120px] w-full rounded-md border border-hairline bg-surface-3 px-4 py-3 text-body text-foreground outline-none placeholder:text-muted focus-visible:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus/40 disabled:opacity-40",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";

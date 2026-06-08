import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border-0 px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "rounded-sm bg-surface-2 text-ink-muted",
        primary: "rounded-sm bg-primary text-on-primary",
        muted: "rounded-sm bg-surface-2 text-muted",
        pill: "rounded-md bg-surface-2 px-2 py-0.5 text-ink-muted",
        unstyled: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

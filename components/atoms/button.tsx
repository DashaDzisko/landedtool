import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-md border text-small font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus/60 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-primary text-on-primary hover:bg-primary-hover active:scale-[0.98]",
        secondary:
          "border-hairline bg-surface-3 text-foreground hover:bg-surface-4",
        ghost:
          "border-transparent bg-transparent text-muted hover:bg-surface-3 hover:text-foreground",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        icon: "h-10 min-h-10 min-w-10 w-10 rounded-md p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

import { cn } from "@/lib/utils";

const variantStyles = {
  default: "border-hairline bg-surface-1 text-foreground",
  error: "border-red-500/30 bg-surface-1 text-foreground",
  success: "border-success/30 bg-surface-1 text-foreground",
} as const;

export interface AlertProps {
  variant?: keyof typeof variantStyles;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({
  variant = "default",
  title,
  children,
  className,
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-md border px-4 py-3 text-small",
        variantStyles[variant],
        className
      )}
    >
      {title && <p className="mb-1 font-medium">{title}</p>}
      <div className="text-muted [&_p]:text-foreground">{children}</div>
    </div>
  );
}

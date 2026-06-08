import { cn } from "@/lib/utils";

const variantStyles = {
  body: "text-body text-foreground",
  "body-lg": "text-body-lg text-foreground",
  small: "text-small text-foreground",
  muted: "text-small text-muted",
  xs: "text-xs text-muted",
  eyebrow: "text-eyebrow text-muted",
} as const;

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: keyof typeof variantStyles;
  as?: "p" | "span" | "div";
  children: React.ReactNode;
}

export function Text({
  variant = "body",
  as: Tag = "p",
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </Tag>
  );
}

import { cn } from "@/lib/utils";

const levelStyles = {
  display: "text-display text-foreground",
  h1: "text-h1 text-foreground",
  h2: "text-h2 text-foreground",
  h3: "text-h3 text-foreground",
} as const;

export interface HeadingProps {
  level?: keyof typeof levelStyles;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: React.ReactNode;
}

export function Heading({
  level = "h1",
  as,
  className,
  children,
}: HeadingProps) {
  const Tag = as ?? (level === "display" ? "h1" : level);
  return (
    <Tag className={cn(levelStyles[level], className)}>{children}</Tag>
  );
}

import { cn } from "@/lib/utils";

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

/** Unified full-width page column — use via AppShell or standalone. */
export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn("app-page", className)}>{children}</div>;
}

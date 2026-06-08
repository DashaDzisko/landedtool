import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="flex flex-col gap-1.5">
        <Heading level="h1">{title}</Heading>
        {description && (
          <Text variant="muted">{description}</Text>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

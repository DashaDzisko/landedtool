import { Button } from "@/components/atoms/button";
import { Heading } from "@/components/atoms/heading";
import { Icon } from "@/components/atoms/icon";
import { Text } from "@/components/atoms/text";
import { cn } from "@/lib/utils";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

export interface EmptyStateProps {
  icon: PhosphorIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-md flex-col items-center gap-5 bento-card p-8 text-center",
        className
      )}
    >
      <span className="icon-circle icon-circle-primary h-14 w-14">
        <Icon icon={icon} size="md" />
      </span>
      <Heading level="h2">{title}</Heading>
      <Text variant="muted">{description}</Text>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}

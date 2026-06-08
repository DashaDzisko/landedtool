import { Badge } from "@/components/atoms/badge";
import { statusColorClass, statusLabels } from "@/lib/status-colors";
import type { ApplicationStatus } from "@/types/application";

export interface StatusBadgeProps {
  status: ApplicationStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      variant="unstyled"
      className={`rounded-sm px-2 py-0.5 ${statusColorClass[status]}`}
    >
      {statusLabels[status]}
    </Badge>
  );
}

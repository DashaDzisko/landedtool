"use client";

import { KanbanBoard } from "@/components/organisms/canvas";
import { useApplications } from "@/components/providers/applications-provider";
import { useSearch } from "@/components/providers/search-provider";
import { statusLabels } from "@/lib/status-colors";

export default function HomePage() {
  const { applications, updateApplication } = useApplications();
  const { query } = useSearch();

  const q = query.trim().toLowerCase();
  const filtered = q
    ? applications.filter((a) =>
        [a.role, a.company, a.location ?? "", statusLabels[a.status]]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
    : applications;

  return (
    <div className="h-[calc(100dvh-7rem)]">
      <KanbanBoard
        applications={filtered}
        onMove={(id, status) => updateApplication(id, { status })}
      />
    </div>
  );
}

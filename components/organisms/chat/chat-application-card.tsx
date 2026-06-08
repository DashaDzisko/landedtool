"use client";

import { ApplicationCard } from "@/components/organisms/dashboard/application-card";
import { useApplications } from "@/components/providers/applications-provider";

export interface ChatApplicationCardProps {
  applicationId: string;
}

/** Agentic widget — renders a single application as a card inside the chat. */
export function ChatApplicationCard({ applicationId }: ChatApplicationCardProps) {
  const { applications } = useApplications();
  const application = applications.find((a) => a.id === applicationId);
  if (!application) return null;
  return (
    <div className="anim-rise">
      <ApplicationCard application={application} showMenu={false} />
    </div>
  );
}

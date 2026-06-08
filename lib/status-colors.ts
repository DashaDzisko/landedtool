import type { ApplicationStatus } from "@/types/application";

/** Tailwind classes backed by CSS variables in app/globals.css */
export const statusColorClass: Record<ApplicationStatus, string> = {
  saved: "bg-[var(--status-saved-bg)] text-[var(--status-saved-text)]",
  applied: "bg-[var(--status-applied-bg)] text-[var(--status-applied-text)]",
  screening:
    "bg-[var(--status-screening-bg)] text-[var(--status-screening-text)]",
  interview:
    "bg-[var(--status-interview-bg)] text-[var(--status-interview-text)]",
  offer: "bg-[var(--status-offer-bg)] text-[var(--status-offer-text)]",
  rejected:
    "bg-[var(--status-rejected-bg)] text-[var(--status-rejected-text)]",
  withdrawn:
    "bg-[var(--status-withdrawn-bg)] text-[var(--status-withdrawn-text)]",
};

export const statusLabels: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  screening: "Screening",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

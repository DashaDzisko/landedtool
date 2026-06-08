export type ApplicationStatus =
  | "saved"
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "withdrawn";

export interface ApplicationContact {
  id: string;
  name: string;
  role?: string;
  email?: string;
}

export interface ApplicationNote {
  id: string;
  body: string;
}

export interface ApplicationEvent {
  id: string;
  date: string;
  title: string;
  description?: string;
  type: "status" | "note" | "interview" | "email" | "other";
}

export interface InterviewRound {
  id: string;
  date: string;
  type: string;
  interviewer?: string;
  notes?: string;
  outcome?: "pending" | "passed" | "failed";
}

export interface ApplicationSalary {
  min?: number;
  max?: number;
  currency?: string;
}

export interface Application {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  location?: string;
  url?: string;
  description?: string;
  appliedAt?: string;
  /** @deprecated Prefer noteItems — kept for simple form fields */
  notes?: string;
  noteItems?: ApplicationNote[];
  cvUrl?: string;
  source?: string;
  salary?: ApplicationSalary;
  contacts?: ApplicationContact[];
  events?: ApplicationEvent[];
  interviews?: InterviewRound[];
}

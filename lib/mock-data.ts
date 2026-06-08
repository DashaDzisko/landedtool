import type { Application } from "@/types/application";
import type { ChatMessage, ChatSession } from "@/types/chat";

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: "1",
    company: "Acme Corp",
    role: "Senior Product Designer",
    status: "interview",
    location: "Remote",
    appliedAt: "2026-05-12",
    url: "https://example.com/jobs/acme",
    description:
      "Lead end-to-end product design for Acme's core platform. Own the design system, partner with PMs and engineers, and mentor two junior designers. 5+ years in product design, strong systems thinking, and a portfolio of shipped work required.",
    source: "LinkedIn",
    salary: { min: 95000, max: 120000, currency: "GBP" },
    notes: "Strong design systems focus. Team of 4 designers.",
    contacts: [
      {
        id: "c1",
        name: "Sarah Chen",
        role: "Hiring Manager",
        email: "sarah.chen@acme.example",
      },
      {
        id: "c2",
        name: "James Wright",
        role: "Recruiter",
        email: "james@talent.example",
      },
    ],
    events: [
      {
        id: "e1",
        date: "2026-05-12",
        title: "Application submitted",
        type: "status",
      },
      {
        id: "e2",
        date: "2026-05-15",
        title: "Moved to screening",
        description: "Recruiter call scheduled",
        type: "status",
      },
      {
        id: "e3",
        date: "2026-05-22",
        title: "Portfolio review",
        description: "Presented case studies to design team",
        type: "interview",
      },
      {
        id: "e4",
        date: "2026-06-10",
        title: "Second round scheduled",
        description: "Culture fit + leadership interview",
        type: "interview",
      },
    ],
    interviews: [
      {
        id: "i1",
        date: "2026-05-22",
        type: "Portfolio review",
        interviewer: "Design team (3)",
        notes: "Went well — positive feedback on systems work",
        outcome: "passed",
      },
      {
        id: "i2",
        date: "2026-06-10",
        type: "Culture & leadership",
        interviewer: "Sarah Chen",
        notes: "Second round scheduled for next Tuesday.",
        outcome: "pending",
      },
    ],
  },
  {
    id: "2",
    company: "Beta Labs",
    role: "Design Engineer",
    status: "applied",
    location: "London",
    appliedAt: "2026-05-18",
    url: "https://example.com/jobs/beta",
    source: "Company website",
    salary: { min: 80000, max: 100000, currency: "GBP" },
    events: [
      {
        id: "e1",
        date: "2026-05-18",
        title: "Application submitted",
        type: "status",
      },
    ],
  },
  {
    id: "3",
    company: "Cortex AI",
    role: "UX Researcher",
    status: "screening",
    location: "Berlin",
    appliedAt: "2026-05-20",
    source: "Referral",
    contacts: [
      {
        id: "c1",
        name: "Mia Keller",
        role: "Head of Research",
        email: "mia@cortex.example",
      },
    ],
    events: [
      {
        id: "e1",
        date: "2026-05-20",
        title: "Application submitted",
        type: "status",
      },
      {
        id: "e2",
        date: "2026-06-02",
        title: "Recruiter screen",
        description: "30-min intro call completed",
        type: "interview",
      },
    ],
    interviews: [
      {
        id: "i1",
        date: "2026-06-02",
        type: "Recruiter screen",
        interviewer: "Mia Keller",
        outcome: "passed",
      },
    ],
  },
  {
    id: "4",
    company: "Delta Systems",
    role: "Product Manager",
    status: "offer",
    location: "Remote",
    appliedAt: "2026-04-28",
    source: "AngelList",
    salary: { min: 110000, max: 130000, currency: "GBP" },
    notes: "Offer received — reviewing equity package.",
    contacts: [
      {
        id: "c1",
        name: "Tom Rivera",
        role: "VP Product",
        email: "tom@delta.example",
      },
    ],
    events: [
      {
        id: "e1",
        date: "2026-04-28",
        title: "Application submitted",
        type: "status",
      },
      {
        id: "e2",
        date: "2026-05-20",
        title: "Offer received",
        description: "£115k base + 0.15% equity",
        type: "status",
      },
    ],
    interviews: [
      {
        id: "i1",
        date: "2026-05-05",
        type: "Product case study",
        outcome: "passed",
      },
      {
        id: "i2",
        date: "2026-05-12",
        type: "Final round",
        interviewer: "Tom Rivera",
        outcome: "passed",
      },
    ],
  },
  {
    id: "5",
    company: "Echo Health",
    role: "Service Designer",
    status: "saved",
    location: "Manchester",
    source: "Job board",
    notes: "Interesting NHS digital transformation project. Apply when CV is updated.",
  },
  {
    id: "6",
    company: "Flux Studio",
    role: "Lead Designer",
    status: "rejected",
    location: "Remote",
    appliedAt: "2026-04-10",
    source: "LinkedIn",
    events: [
      {
        id: "e1",
        date: "2026-04-10",
        title: "Application submitted",
        type: "status",
      },
      {
        id: "e2",
        date: "2026-04-25",
        title: "Rejected",
        description: "Went with internal candidate",
        type: "status",
      },
    ],
  },
];

export const MOCK_CHAT_SESSIONS: ChatSession[] = [
  {
    id: "1",
    title: "Pipeline review",
    preview: "You have 3 interviews this week…",
    updatedAt: "2026-06-05T10:00:00Z",
  },
  {
    id: "2",
    title: "Follow-up emails",
    preview: "Draft for Acme Corp…",
    updatedAt: "2026-06-04T14:30:00Z",
  },
  {
    id: "3",
    title: "Offer comparison",
    preview: "Salary vs equity trade-offs…",
    updatedAt: "2026-06-03T09:15:00Z",
  },
];

export const MOCK_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  "1": [
    {
      id: "m1",
      author: "Agent",
      content:
        "Hello! I can analyse your applications, CV, and interview notes. What would you like to focus on?",
      timestamp: "10:00",
    },
    {
      id: "m2",
      author: "You",
      content: "Summarise my pipeline.",
      timestamp: "10:01",
      isUser: true,
    },
    {
      id: "m3",
      author: "Agent",
      content:
        "You have 6 active applications:\n• 1 in interview (Acme Corp)\n• 1 in screening (Cortex AI)\n• 1 offer pending (Delta Systems)\n• 2 awaiting response",
      timestamp: "10:01",
    },
  ],
  "2": [
    {
      id: "m1",
      author: "Agent",
      content: "I can help draft follow-up emails for any application.",
      timestamp: "14:30",
    },
  ],
  "3": [
    {
      id: "m1",
      author: "You",
      content: "Compare my Delta Systems offer with market rate.",
      timestamp: "09:15",
      isUser: true,
    },
  ],
};

"use client";

import { Badge, Button, Heading, Text } from "@/components/atoms";
import {
  ApplicationCard,
  ApplicationDetail,
} from "@/components/organisms/dashboard";
import { KanbanBoard } from "@/components/organisms/canvas";
import { ChatPanel } from "@/components/organisms/chat/chat-panel";
import { PageHeader, TopBar } from "@/components/organisms/layout";
import {
  ChatComposer,
  EmptyState,
  FormField,
  MessageList,
  PromptChip,
  SearchInput,
  StatusBadge,
  SuggestedPrompts,
  UserMenuTrigger,
} from "@/components/molecules";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { Briefcase, Plus } from "@phosphor-icons/react";

const DEMO_MESSAGES = [
  {
    id: "1",
    author: "Agent",
    content: "You have 3 applications in interview stage.",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    author: "You",
    content: "Which company should I prioritise?",
    timestamp: "Just now",
    isUser: true,
  },
];

export function DesignSystemShowcase() {
  const sampleApp = MOCK_APPLICATIONS[0];

  return (
    <div className="app-page px-6 py-12 md:px-10">
      <header className="flex flex-col gap-3">
        <Text variant="eyebrow">Aura Bento × Stitch · docs/design.md</Text>
        <Heading level="display">Landed design system</Heading>
        <Text variant="muted">
          #0D0D0D dotted canvas, #F4A988 salmon, #C5D8E1 blue — Strichpunkt Sans,
          Phosphor icons, chat-first shell (Chat pane + Kanban canvas).
        </Text>
      </header>

      <section className="flex flex-col gap-4">
        <Heading level="h2">App shell preview</Heading>
        <div className="flex h-[480px] gap-3 overflow-hidden rounded-lg border border-hairline bg-canvas-mesh p-3">
          <ChatPanel />
          <div className="flex min-w-0 flex-1 flex-col bg-canvas">
            <TopBar />
            <div className="flex-1 overflow-y-auto p-6">
              <PageHeader
                title="Home"
                description="Your applications, on the canvas"
                action={
                  <Button size="sm">
                    <Plus size={16} weight="bold" />
                    Add application
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level="h2">Chat panel</Heading>
        <div className="flex h-[440px] w-[384px] bg-canvas-mesh p-3">
          <ChatPanel className="h-full" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level="h2">Chat molecules</Heading>
        <div className="flex h-80 max-w-xl flex-col overflow-hidden rounded-md border border-hairline bg-canvas">
          <MessageList messages={DEMO_MESSAGES} className="flex-1 p-4" />
          <SuggestedPrompts
            prompts={["Summarise my pipeline", "Draft follow-up email"]}
          />
          <ChatComposer />
        </div>
        <div className="flex flex-wrap gap-2">
          <PromptChip label="Summarise my pipeline" />
          <PromptChip label="Draft follow-up email" selected />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level="h2">Canvas — Kanban</Heading>
        <div className="bg-canvas-grid h-[520px] rounded-lg border border-hairline p-4">
          <KanbanBoard applications={MOCK_APPLICATIONS} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level="h2">Surface & accent cards</Heading>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { name: "Canvas", className: "bg-canvas border-hairline" },
            { name: "Surface 1", className: "bg-surface-1 border-hairline" },
            { name: "Surface 3", className: "bg-surface-3 border-hairline" },
            { name: "Salmon", className: "bento-card-featured p-4" },
            { name: "Blue", className: "bento-card-accent p-4" },
          ].map((swatch) => (
            <div key={swatch.name} className="flex flex-col gap-2">
              <div
                className={`flex h-16 items-end rounded-md border p-3 ${swatch.className}`}
              >
                <Text variant="small" as="span">
                  {swatch.name}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level="h2">Buttons</Heading>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level="h2">Form</Heading>
        <div className="max-w-md rounded-md border border-hairline bg-surface-1 p-6">
          <FormField
            id="email"
            label="Email"
            hint="Magic link only — no password"
            inputProps={{ type: "email", placeholder: "you@example.com" }}
          />
        </div>
        <SearchInput className="max-w-md" />
      </section>

      <section className="app-section">
        <Heading level="h2">Application card</Heading>
        <div className="grid w-full grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {MOCK_APPLICATIONS.slice(0, 6).map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              showMenu={false}
              showUpcomingInterview
            />
          ))}
        </div>
      </section>

      <section className="app-section">
        <Heading level="h2">Application detail</Heading>
        <ApplicationDetail application={sampleApp} />
      </section>

      <section className="flex flex-col gap-4">
        <Heading level="h2">Status badges</Heading>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="saved" />
          <StatusBadge status="applied" />
          <StatusBadge status="screening" />
          <StatusBadge status="interview" />
          <StatusBadge status="offer" />
          <StatusBadge status="rejected" />
          <StatusBadge status="withdrawn" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Heading level="h2">Misc</Heading>
        <div className="flex flex-wrap items-center gap-4">
          <Badge>Default badge</Badge>
          <Badge variant="primary">Primary badge</Badge>
          <UserMenuTrigger name="Alex User" email="alex@example.com" />
        </div>
        <EmptyState
          icon={Briefcase}
          title="No applications yet"
          description="Add your first role to start tracking your job search."
          actionLabel="Add application"
          onAction={() => undefined}
        />
      </section>
    </div>
  );
}

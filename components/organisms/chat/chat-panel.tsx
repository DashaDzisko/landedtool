"use client";

import { Button } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { ChatComposer } from "@/components/molecules/chat-composer";
import { ChatRow } from "@/components/molecules/chat-row";
import { MessageList } from "@/components/molecules/message-list";
import { PromptChip } from "@/components/molecules/prompt-chip";
import { SearchInput } from "@/components/molecules/search-input";
import { TabSwitch } from "@/components/molecules/tab-switch";
import { ChatApplicationCard } from "@/components/organisms/chat/chat-application-card";
import { ChatDraftEmail } from "@/components/organisms/chat/chat-draft-email";
import { ChatShortlist } from "@/components/organisms/chat/chat-shortlist";
import { ChatStats } from "@/components/organisms/chat/chat-stats";
import { ChatStatusChange } from "@/components/organisms/chat/chat-status-change";
import { useChat } from "@/components/organisms/chat/chat-provider";
import { cn } from "@/lib/utils";
import { Plus } from "@phosphor-icons/react";
import { useState } from "react";

const SUGGESTED_PROMPTS = [
  "Summarise my pipeline",
  "Draft follow-up email",
  "Which roles to prioritise?",
];

type ChatTab = "current" | "history";

function formatChatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export interface ChatPanelProps {
  className?: string;
}

export function ChatPanel({ className }: ChatPanelProps) {
  const {
    sessions,
    activeSessionId,
    messages,
    isAgentTyping,
    setActiveSessionId,
    sendMessage,
    newChat,
  } = useChat();
  const [draft, setDraft] = useState("");
  const [tab, setTab] = useState<ChatTab>("current");
  const [query, setQuery] = useState("");

  const handleSend = (value: string) => {
    sendMessage(value);
    setDraft("");
  };

  const openSession = (id: string) => {
    setActiveSessionId(id);
    setTab("current");
  };

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <aside
      className={cn(
        "flex h-full w-full shrink-0 flex-col overflow-hidden rounded-bento border border-hairline bg-surface-1 lg:w-[360px]",
        className
      )}
      aria-label="Chat"
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-hairline px-4 py-3">
        <TabSwitch
          fluid
          className="flex-1"
          options={[
            { value: "current", label: "Current" },
            { value: "history", label: "History" },
          ]}
          value={tab}
          onChange={(value) => setTab(value as ChatTab)}
        />
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={() => {
            newChat();
            setTab("current");
          }}
          aria-label="New chat"
          className="h-9 min-h-9 w-9 min-w-9 shrink-0"
        >
          <Plus size={16} weight="bold" />
        </Button>
      </div>

      {tab === "history" ? (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="shrink-0 px-4 py-3">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search chats…"
            />
          </div>
          <div className="scroll-styled min-h-0 flex-1 overflow-y-auto px-2 pb-3">
            {filteredSessions.length === 0 ? (
              <Text
                variant="xs"
                as="p"
                className="px-4 py-6 text-center text-ink-subtle"
              >
                No chats found
              </Text>
            ) : (
              filteredSessions.map((session) => (
                <ChatRow
                  key={session.id}
                  title={session.title}
                  date={formatChatDate(session.updatedAt)}
                  active={session.id === activeSessionId}
                  onClick={() => openSession(session.id)}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <>
          {messages.length === 0 && (
            <div className="shrink-0 px-6 py-3">
              <div className="bento-card p-4">
                <Text variant="xs" className="leading-relaxed text-ink-muted">
                  I can analyse your applications, CV, and interview notes. Ask
                  me anything about your pipeline.
                </Text>
              </div>
            </div>
          )}

          <MessageList
            messages={messages}
            isAgentTyping={isAgentTyping}
            renderWidget={(message) => {
              const w = message.widget;
              if (!w) return null;
              switch (w.type) {
                case "pipeline-stats":
                  return <ChatStats />;
                case "application-card":
                  return <ChatApplicationCard applicationId={w.applicationId} />;
                case "application-shortlist":
                  return <ChatShortlist items={w.items} />;
                case "change-status":
                  return (
                    <ChatStatusChange
                      applicationId={w.applicationId}
                      toStatus={w.toStatus}
                    />
                  );
                case "draft-email":
                  return (
                    <ChatDraftEmail subject={w.subject} body={w.body} />
                  );
                default:
                  return null;
              }
            }}
            className="min-h-0 flex-1 px-6 py-3"
            variant="panel"
          />

          <div className="shrink-0 space-y-4 border-t border-hairline p-6">
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <PromptChip
                  key={prompt}
                  label={prompt}
                  onClick={() => setDraft(prompt)}
                />
              ))}
            </div>

            <ChatComposer
              variant="floating"
              value={draft}
              onChange={setDraft}
              onSubmit={handleSend}
              isLoading={isAgentTyping}
            />
          </div>
        </>
      )}
    </aside>
  );
}

"use client";

import { useApplications } from "@/components/providers/applications-provider";
import { resolveMockAgentResponse } from "@/lib/ai/mock-agent";
import {
  createStreamingAgentMessage,
  readChatStreamEvents,
} from "@/lib/ai/stream";
import {
  createChat,
  createChatMessage,
  fetchAllChats,
  updateChatTitle,
} from "@/lib/db/chats";
import type { Application } from "@/types/application";
import type { ChatMessage, ChatSession } from "@/types/chat";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

function previewText(content: string) {
  return content.length > 60 ? `${content.slice(0, 60)}…` : content;
}

async function runMockFallback(
  sessionId: string,
  content: string,
  applications: Application[],
  isFirstUserMessage: boolean,
  sessionTitle: string | undefined,
  setMessagesBySession: React.Dispatch<
    React.SetStateAction<Record<string, ChatMessage[]>>
  >,
  setSessions: React.Dispatch<React.SetStateAction<ChatSession[]>>
) {
  const userMsg = await createChatMessage(sessionId, "user", content);
  setMessagesBySession((prev) => ({
    ...prev,
    [sessionId]: [...(prev[sessionId] ?? []), userMsg],
  }));

  if (sessionTitle === "New chat" && isFirstUserMessage) {
    const title = content.length > 40 ? `${content.slice(0, 40)}…` : content;
    await updateChatTitle(sessionId, title);
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, title, preview: previewText(content) }
          : s
      )
    );
  } else {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              preview: previewText(content),
              updatedAt: new Date().toISOString(),
            }
          : s
      )
    );
  }

  const response = resolveMockAgentResponse(content, applications);
  const agentMsg = await createChatMessage(
    sessionId,
    "agent",
    response.text,
    response.widget
  );

  setMessagesBySession((prev) => ({
    ...prev,
    [sessionId]: [...(prev[sessionId] ?? []), agentMsg],
  }));
  setSessions((prev) =>
    prev.map((s) =>
      s.id === sessionId
        ? {
            ...s,
            preview: previewText(response.text),
            updatedAt: new Date().toISOString(),
          }
        : s
    )
  );
}

interface ChatContextValue {
  sessions: ChatSession[];
  activeSessionId: string;
  messages: ChatMessage[];
  isAgentTyping: boolean;
  loading: boolean;
  applicationContextId: string | null;
  setActiveSessionId: (id: string) => void;
  sendMessage: (content: string) => void;
  newChat: () => void;
  askAboutApplication: (
    applicationId: string,
    company: string,
    role: string
  ) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { applications } = useApplications();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState("");
  const [messagesBySession, setMessagesBySession] = useState<
    Record<string, ChatMessage[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [applicationContextId, setApplicationContextId] = useState<
    string | null
  >(null);

  useEffect(() => {
    let cancelled = false;

    fetchAllChats()
      .then(async ({ sessions: loaded, messagesBySession: loadedMessages }) => {
        if (cancelled) return;

        if (loaded.length === 0) {
          const session = await createChat();
          if (cancelled) return;
          setSessions([session]);
          setMessagesBySession({ [session.id]: [] });
          setActiveSessionId(session.id);
          return;
        }

        setSessions(loaded);
        setMessagesBySession(loadedMessages);
        setActiveSessionId(loaded[0]?.id ?? "");
      })
      .catch((err) => {
        console.error("Failed to load chats:", err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const messages = useMemo(
    () => messagesBySession[activeSessionId] ?? [],
    [messagesBySession, activeSessionId]
  );

  const isAgentTyping = useMemo(
    () => messages.some((message) => message.isStreaming),
    [messages]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeSessionId) return;

      const sessionId = activeSessionId;
      const session = sessions.find((s) => s.id === sessionId);
      const isFirstUserMessage =
        (messagesBySession[sessionId] ?? []).filter((m) => m.isUser).length ===
        0;
      const streamingId = `streaming-${Date.now()}`;

      setMessagesBySession((prev) => ({
        ...prev,
        [sessionId]: [
          ...(prev[sessionId] ?? []),
          createStreamingAgentMessage(streamingId),
        ],
      }));

      try {
        const response = await fetch(`/api/chats/${sessionId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content,
            applicationContextId,
          }),
        });

        if (!response.ok || !response.body) {
          throw new Error("Chat request failed");
        }

        let agentContent = "";
        let userAdded = false;

        for await (const event of readChatStreamEvents(response.body)) {
          if (event.type === "user") {
            userAdded = true;
            setMessagesBySession((prev) => {
              const withoutStreaming = (prev[sessionId] ?? []).filter(
                (m) => m.id !== streamingId
              );
              return {
                ...prev,
                [sessionId]: [
                  ...withoutStreaming,
                  event.message,
                  createStreamingAgentMessage(streamingId),
                ],
              };
            });
          }

          if (event.type === "delta") {
            agentContent += event.content;
            setMessagesBySession((prev) => ({
              ...prev,
              [sessionId]: (prev[sessionId] ?? []).map((m) =>
                m.id === streamingId
                  ? { ...m, content: agentContent, isStreaming: true }
                  : m
              ),
            }));
          }

          if (event.type === "done") {
            setMessagesBySession((prev) => ({
              ...prev,
              [sessionId]: (prev[sessionId] ?? [])
                .filter((m) => m.id !== streamingId)
                .concat(event.message),
            }));

            const preview = previewText(event.message.content);
            setSessions((prev) =>
              prev.map((s) =>
                s.id === sessionId
                  ? {
                      ...s,
                      ...(event.title ? { title: event.title } : {}),
                      preview,
                      updatedAt: new Date().toISOString(),
                    }
                  : s
              )
            );
          }

          if (event.type === "error") {
            throw new Error(event.message);
          }
        }

        if (!userAdded) {
          throw new Error("No response from chat API");
        }
      } catch (error) {
        console.error("Chat API failed, using client fallback:", error);
        setMessagesBySession((prev) => ({
          ...prev,
          [sessionId]: (prev[sessionId] ?? []).filter(
            (m) => m.id !== streamingId
          ),
        }));

        await runMockFallback(
          sessionId,
          content,
          applications,
          isFirstUserMessage,
          session?.title,
          setMessagesBySession,
          setSessions
        );
      }
    },
    [activeSessionId, applicationContextId, applications, messagesBySession, sessions]
  );

  const newChat = useCallback(() => {
    createChat()
      .then((session) => {
        setSessions((prev) => [session, ...prev]);
        setMessagesBySession((prev) => ({ ...prev, [session.id]: [] }));
        setActiveSessionId(session.id);
        setApplicationContextId(null);
      })
      .catch(console.error);
  }, []);

  const askAboutApplication = useCallback(
    (applicationId: string, company: string, role: string) => {
      const title = `${company} — ${role}`;
      const introContent = `I'm ready to help with your **${role}** application at **${company}**. Ask about interview prep, follow-up emails, or offer negotiation.`;

      createChat(title)
        .then(async (session) => {
          const intro = await createChatMessage(
            session.id,
            "agent",
            introContent
          );
          setSessions((prev) => [
            { ...session, preview: previewText(introContent) },
            ...prev,
          ]);
          setMessagesBySession((prev) => ({
            ...prev,
            [session.id]: [intro],
          }));
          setActiveSessionId(session.id);
          setApplicationContextId(applicationId);
        })
        .catch(console.error);
    },
    []
  );

  const value = useMemo(
    () => ({
      sessions,
      activeSessionId,
      messages,
      isAgentTyping,
      loading,
      applicationContextId,
      setActiveSessionId,
      sendMessage,
      newChat,
      askAboutApplication,
    }),
    [
      sessions,
      activeSessionId,
      messages,
      isAgentTyping,
      loading,
      applicationContextId,
      sendMessage,
      newChat,
      askAboutApplication,
    ]
  );

  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}

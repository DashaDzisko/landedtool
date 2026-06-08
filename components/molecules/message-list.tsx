import { MessageBubble } from "@/components/molecules/message-bubble";
import { TypingIndicator } from "@/components/atoms/typing-indicator";
import { cn } from "@/lib/utils";
import type { ChatWidget } from "@/types/chat";
import type { ReactNode } from "react";

export interface ChatMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isUser?: boolean;
  isStreaming?: boolean;
  /** Optional agentic widget — rendered via `renderWidget`. */
  widget?: ChatWidget;
}

export interface MessageListProps {
  messages: ChatMessage[];
  isAgentTyping?: boolean;
  variant?: "default" | "panel";
  /** Organism-provided renderer for a message's agentic widget. */
  renderWidget?: (message: ChatMessage) => ReactNode;
  className?: string;
}

export function MessageList({
  messages,
  isAgentTyping,
  variant = "default",
  renderWidget,
  className,
}: MessageListProps) {
  return (
    <div
      className={cn(
        "scroll-styled flex flex-col gap-3 overflow-y-auto",
        variant === "panel" ? "gap-2.5" : "gap-4",
        className
      )}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
    >
      {messages.map((message) => {
        const widget = message.widget ? renderWidget?.(message) : null;
        return (
          <div key={message.id} className="anim-rise flex flex-col gap-2">
            <MessageBubble
              author={message.author}
              content={message.content}
              timestamp={message.timestamp}
              isUser={message.isUser}
              isStreaming={message.isStreaming}
              variant={variant}
            />
            {widget}
          </div>
        );
      })}
      {isAgentTyping && !messages.some((m) => m.isStreaming) && (
        <TypingIndicator />
      )}
    </div>
  );
}

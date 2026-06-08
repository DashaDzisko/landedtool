import { RichText } from "@/components/atoms/rich-text";
import { TypingIndicator } from "@/components/atoms/typing-indicator";
import { cn } from "@/lib/utils";

export interface MessageBubbleProps {
  content: string;
  isUser?: boolean;
  isStreaming?: boolean;
  variant?: "default" | "panel";
  /** Kept for API compatibility; no longer rendered. */
  author?: string;
  timestamp?: string;
  showAvatar?: boolean;
  className?: string;
}

/**
 * Basic chat message. The user's turn is a right-aligned bubble; the agent
 * replies as plain text (no bubble, no avatar, no timestamp).
 */
export function MessageBubble({
  content,
  isUser = false,
  isStreaming = false,
  variant = "default",
  className,
}: MessageBubbleProps) {
  const isPanel = variant === "panel";

  // Agent — plain text, no bubble.
  if (!isUser) {
    if (isStreaming && !content) {
      return <TypingIndicator className={className} />;
    }
    return (
      <p
        className={cn(
          "w-full whitespace-pre-wrap text-ink-muted",
          isPanel ? "text-chat leading-snug" : "text-body",
          className
        )}
      >
        <RichText>{content}</RichText>
      </p>
    );
  }

  // User — right-aligned bubble.
  return (
    <div className={cn("flex justify-end", className)}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap",
          isPanel
            ? "rounded-md bg-primary-muted px-3 py-2 text-chat leading-snug text-foreground"
            : "rounded-md bg-primary px-4 py-2.5 text-body text-on-primary"
        )}
      >
        <RichText>{content}</RichText>
      </div>
    </div>
  );
}

import type { ChatMessage, ChatWidget } from "@/types/chat";

export type ChatStreamEvent =
  | { type: "user"; message: ChatMessage }
  | { type: "delta"; content: string }
  | {
      type: "done";
      message: ChatMessage;
      title?: string;
    }
  | { type: "error"; message: string };

export function encodeChatStreamEvent(event: ChatStreamEvent): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`);
}

export async function* readChatStreamEvents(
  body: ReadableStream<Uint8Array>
): AsyncGenerator<ChatStreamEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n\n");
      buffer = parts.pop() ?? "";

      for (const part of parts) {
        const line = part.trim();
        if (!line.startsWith("data: ")) continue;
        try {
          yield JSON.parse(line.slice(6)) as ChatStreamEvent;
        } catch {
          // Ignore malformed chunks.
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export function createStreamingAgentMessage(id: string): ChatMessage {
  return {
    id,
    author: "Agent",
    content: "",
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    isStreaming: true,
  };
}

export function finalizeAgentMessage(
  streaming: ChatMessage,
  content: string,
  saved: ChatMessage,
  widget?: ChatWidget
): ChatMessage {
  return {
    ...saved,
    content,
    isStreaming: false,
    ...(widget ? { widget } : {}),
  };
}

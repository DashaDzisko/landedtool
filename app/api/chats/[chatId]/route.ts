import { streamAgentResponse, type AgentMessageInput } from "@/lib/ai/agent";
import { loadAgentContext } from "@/lib/ai/context";
import { resolveMockAgentResponse } from "@/lib/ai/mock-agent";
import { isOpenAIConfigured } from "@/lib/ai/openai";
import { encodeChatStreamEvent } from "@/lib/ai/stream";
import {
  getChatForUser,
  getChatMessages,
  insertChatMessage,
  updateChatTitleServer,
} from "@/lib/db/chats.server";
import type { ChatWidget } from "@/types/chat";

export const runtime = "nodejs";

interface PostBody {
  content?: string;
  applicationContextId?: string | null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
  try {
    const { chatId } = await params;
    const chat = await getChatForUser(chatId);
    if (!chat) {
      return Response.json({ error: "Chat not found" }, { status: 404 });
    }

    const messages = await getChatMessages(chatId);
    return Response.json({ chat, messages });
  } catch (error) {
    console.error("GET /api/chats/[chatId]:", error);
    return Response.json({ error: "Failed to load chat" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const { chatId } = await params;

  let body: PostBody;
  try {
    body = (await request.json()) as PostBody;
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const content = body.content?.trim();
  if (!content) {
    return Response.json({ error: "Message content is required" }, { status: 400 });
  }

  try {
    const chat = await getChatForUser(chatId);
    if (!chat) {
      return Response.json({ error: "Chat not found" }, { status: 404 });
    }

    const existingMessages = await getChatMessages(chatId);
    const isFirstUserMessage = existingMessages.every((m) => !m.isUser);

    const userMessage = await insertChatMessage(chatId, "user", content);

    let title: string | undefined;
    if (chat.title === "New chat" && isFirstUserMessage) {
      title = content.length > 40 ? `${content.slice(0, 40)}…` : content;
      await updateChatTitleServer(chatId, title);
    }

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const send = (event: Parameters<typeof encodeChatStreamEvent>[0]) => {
          controller.enqueue(encodeChatStreamEvent(event));
        };

        send({ type: "user", message: userMessage });

        try {
          const context = await loadAgentContext(body.applicationContextId);
          const history: AgentMessageInput[] = [
            ...existingMessages.map((message) => ({
              role: message.isUser ? ("user" as const) : ("agent" as const),
              content: message.content,
            })),
            { role: "user", content },
          ];

          let agentContent = "";
          let widget: ChatWidget | undefined;

          if (isOpenAIConfigured()) {
            const generator = streamAgentResponse(context, history);
            let result = await generator.next();
            while (!result.done) {
              agentContent += result.value;
              send({ type: "delta", content: result.value });
              result = await generator.next();
            }
            widget = result.value;
          } else {
            const mock = resolveMockAgentResponse(content, context.applications);
            agentContent = mock.text;
            widget = mock.widget;
            send({ type: "delta", content: agentContent });
          }

          const agentMessage = await insertChatMessage(
            chatId,
            "agent",
            agentContent,
            widget
          );

          send({
            type: "done",
            message: agentMessage,
            ...(title ? { title } : {}),
          });
        } catch (error) {
          console.error("Agent error:", error);
          send({
            type: "error",
            message:
              error instanceof Error
                ? error.message
                : "Failed to generate a response",
          });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("POST /api/chats/[chatId]:", error);
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}

import type { AgentContext } from "@/lib/ai/context";
import { CHAT_MODEL, getOpenAIClient } from "@/lib/ai/openai";
import { buildSystemPrompt } from "@/lib/ai/prompts";
import {
  agentToolDefinitions,
  executeAgentTool,
} from "@/lib/ai/tools";
import type { ChatWidget } from "@/types/chat";
import type OpenAI from "openai";

export interface AgentMessageInput {
  role: "user" | "agent";
  content: string;
}

export interface AgentRunResult {
  content: string;
  widget?: ChatWidget;
}

const MAX_TOOL_ROUNDS = 6;

function toOpenAIMessages(
  systemPrompt: string,
  history: AgentMessageInput[]
): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
  return [
    { role: "system", content: systemPrompt },
    ...history.map((message) => ({
      role: message.role === "user" ? ("user" as const) : ("assistant" as const),
      content: message.content,
    })),
  ];
}

interface ToolLoopResult {
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  widget?: ChatWidget;
  content?: string;
}

async function runToolLoop(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  context: AgentContext
): Promise<ToolLoopResult> {
  const openai = getOpenAIClient();
  let widget: ChatWidget | undefined;

  for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
    const completion = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages,
      tools: agentToolDefinitions,
      tool_choice: "auto",
    });

    const choice = completion.choices[0]?.message;
    if (!choice) {
      throw new Error("No response from OpenAI");
    }

    if (choice.tool_calls?.length) {
      messages.push(choice);

      for (const call of choice.tool_calls) {
        if (call.type !== "function") continue;

        let parsedArgs: Record<string, unknown> = {};
        try {
          parsedArgs = JSON.parse(call.function.arguments || "{}") as Record<
            string,
            unknown
          >;
        } catch {
          parsedArgs = {};
        }

        const result = await executeAgentTool(
          call.function.name,
          parsedArgs,
          context
        );

        if (result.widget) widget = result.widget;

        messages.push({
          role: "tool",
          tool_call_id: call.id,
          content: JSON.stringify(result.data),
        });
      }
      continue;
    }

    const content = choice.content?.trim() ?? "";
    if (content) {
      messages.push({ role: "assistant", content });
    }

    return { messages, widget, content: content || undefined };
  }

  return { messages, widget };
}

/** Non-streaming agent run — handles tool rounds then returns final text + widget. */
export async function runAgent(
  context: AgentContext,
  history: AgentMessageInput[]
): Promise<AgentRunResult> {
  const systemPrompt = buildSystemPrompt(context);
  const { messages, widget, content } = await runToolLoop(
    toOpenAIMessages(systemPrompt, history),
    context
  );

  if (content) {
    return { content, widget };
  }

  const openai = getOpenAIClient();
  const completion = await openai.chat.completions.create({
    model: CHAT_MODEL,
    messages,
  });

  const text =
    completion.choices[0]?.message?.content?.trim() ||
    "I couldn't generate a response.";

  return { content: text, widget };
}

/** Yields text deltas, then returns the final widget (if any). */
export async function* streamAgentResponse(
  context: AgentContext,
  history: AgentMessageInput[]
): AsyncGenerator<string, ChatWidget | undefined> {
  const systemPrompt = buildSystemPrompt(context);
  const { messages, widget, content } = await runToolLoop(
    toOpenAIMessages(systemPrompt, history),
    context
  );

  if (content) {
    yield content;
    return widget;
  }

  const openai = getOpenAIClient();
  const stream = await openai.chat.completions.create({
    model: CHAT_MODEL,
    messages,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }

  return widget;
}

import { createClient } from "@/lib/supabase/client";
import type { ChatMessage, ChatSession, ChatWidget } from "@/types/chat";

type DbChatRow = {
  id: string;
  title: string;
  updated_at: string;
  chat_messages?: DbMessageRow[];
};

type DbMessageRow = {
  id: string;
  role: "user" | "agent";
  content: string;
  widget: ChatWidget | null;
  created_at: string;
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toChatMessage(row: DbMessageRow): ChatMessage {
  return {
    id: row.id,
    author: row.role === "user" ? "You" : "Agent",
    content: row.content,
    timestamp: formatTime(row.created_at),
    isUser: row.role === "user",
    ...(row.widget ? { widget: row.widget } : {}),
  };
}

function previewFromMessages(messages: DbMessageRow[]): string {
  const last = messages.at(-1);
  if (!last?.content) return "";
  return last.content.length > 60
    ? `${last.content.slice(0, 60)}…`
    : last.content;
}

export async function fetchAllChats(): Promise<{
  sessions: ChatSession[];
  messagesBySession: Record<string, ChatMessage[]>;
}> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("chats")
    .select("id, title, updated_at, chat_messages(id, role, content, widget, created_at)")
    .order("updated_at", { ascending: false });

  if (error) throw error;

  const sessions: ChatSession[] = [];
  const messagesBySession: Record<string, ChatMessage[]> = {};

  for (const chat of (data ?? []) as DbChatRow[]) {
    const messages = (chat.chat_messages ?? []).sort((a, b) =>
      a.created_at.localeCompare(b.created_at)
    );
    messagesBySession[chat.id] = messages.map(toChatMessage);
    sessions.push({
      id: chat.id,
      title: chat.title,
      preview: previewFromMessages(messages),
      updatedAt: chat.updated_at,
    });
  }

  return { sessions, messagesBySession };
}

export async function createChat(title = "New chat"): Promise<ChatSession> {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("chats")
    .insert({ user_id: user.id, title })
    .select("id, title, updated_at")
    .single();

  if (error) throw error;

  return {
    id: data.id,
    title: data.title,
    preview: "",
    updatedAt: data.updated_at,
  };
}

export async function touchChat(chatId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("chats")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", chatId);
  if (error) throw error;
}

export async function updateChatTitle(
  chatId: string,
  title: string
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("chats")
    .update({ title, updated_at: new Date().toISOString() })
    .eq("id", chatId);
  if (error) throw error;
}

export async function createChatMessage(
  chatId: string,
  role: "user" | "agent",
  content: string,
  widget?: ChatWidget
): Promise<ChatMessage> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("chat_messages")
    .insert({
      chat_id: chatId,
      role,
      content,
      widget: widget ?? null,
    })
    .select("id, role, content, widget, created_at")
    .single();

  if (error) throw error;
  await touchChat(chatId);
  return toChatMessage(data as DbMessageRow);
}

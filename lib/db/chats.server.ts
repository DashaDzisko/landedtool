import { createClient } from "@/lib/supabase/server";
import type { ChatMessage, ChatSession, ChatWidget } from "@/types/chat";

type DbChatRow = {
  id: string;
  title: string;
  updated_at: string;
  user_id: string;
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

export function toChatMessage(row: DbMessageRow): ChatMessage {
  return {
    id: row.id,
    author: row.role === "user" ? "You" : "Agent",
    content: row.content,
    timestamp: formatTime(row.created_at),
    isUser: row.role === "user",
    ...(row.widget ? { widget: row.widget } : {}),
  };
}

export async function getChatForUser(chatId: string): Promise<DbChatRow | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) return null;

  const { data, error } = await supabase
    .from("chats")
    .select("id, title, updated_at, user_id")
    .eq("id", chatId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;
  return data as DbChatRow | null;
}

export async function getChatMessages(chatId: string): Promise<ChatMessage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("chat_messages")
    .select("id, role, content, widget, created_at")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return ((data ?? []) as DbMessageRow[]).map(toChatMessage);
}

export async function insertChatMessage(
  chatId: string,
  role: "user" | "agent",
  content: string,
  widget?: ChatWidget
): Promise<ChatMessage> {
  const supabase = await createClient();
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

  await supabase
    .from("chats")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", chatId);

  return toChatMessage(data as DbMessageRow);
}

export async function updateChatTitleServer(
  chatId: string,
  title: string
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("chats")
    .update({ title, updated_at: new Date().toISOString() })
    .eq("id", chatId);

  if (error) throw error;
}

export async function listChatsForUser(): Promise<ChatSession[]> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) return [];

  const { data, error } = await supabase
    .from("chats")
    .select("id, title, updated_at, chat_messages(content, created_at)")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) throw error;

  return ((data ?? []) as DbChatRow[]).map((chat) => {
    const messages = (chat.chat_messages ?? []).sort((a, b) =>
      a.created_at.localeCompare(b.created_at)
    );
    const last = messages.at(-1);
    const preview = last?.content
      ? last.content.length > 60
        ? `${last.content.slice(0, 60)}…`
        : last.content
      : "";

    return {
      id: chat.id,
      title: chat.title,
      preview,
      updatedAt: chat.updated_at,
    };
  });
}

export async function createChatForUser(title = "New chat"): Promise<ChatSession> {
  const supabase = await createClient();
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

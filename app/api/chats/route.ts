import {
  createChatForUser,
  listChatsForUser,
} from "@/lib/db/chats.server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sessions = await listChatsForUser();
    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("GET /api/chats:", error);
    return NextResponse.json({ error: "Failed to load chats" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { title?: string };
    const session = await createChatForUser(body.title ?? "New chat");
    return NextResponse.json({ session });
  } catch (error) {
    console.error("POST /api/chats:", error);
    return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
  }
}

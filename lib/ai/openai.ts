import OpenAI from "openai";

let client: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  if (!client) {
    client = new OpenAI({ apiKey });
  }
  return client;
}

export function isOpenAIConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

export const CHAT_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

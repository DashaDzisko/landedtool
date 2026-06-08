"use client";

import { ApplicationsProvider } from "@/components/providers/applications-provider";
import { ChatProvider } from "@/components/organisms/chat/chat-provider";
import { ToastProvider } from "@/components/ui/toast";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ApplicationsProvider>
      <ChatProvider>
        <ToastProvider>{children}</ToastProvider>
      </ChatProvider>
    </ApplicationsProvider>
  );
}

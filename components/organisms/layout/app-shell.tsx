"use client";

import { ChatPanel } from "@/components/organisms/chat/chat-panel";
import { ChatProvider } from "@/components/organisms/chat/chat-provider";
import { PageContainer } from "@/components/organisms/layout/page-container";
import { TopBar } from "@/components/organisms/layout/top-bar";
import { TabSwitch } from "@/components/molecules/tab-switch";
import { ApplicationsProvider } from "@/components/providers/applications-provider";
import { SearchProvider } from "@/components/providers/search-provider";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface AppShellProps {
  children: React.ReactNode;
  className?: string;
  userName?: string;
  userEmail?: string;
}

type MobilePane = "canvas" | "chat";

export function AppShell({
  children,
  className,
  userName,
  userEmail,
}: AppShellProps) {
  // On small screens the two panes don't fit side by side — show one at a time.
  const [mobilePane, setMobilePane] = useState<MobilePane>("canvas");

  return (
    <ApplicationsProvider>
      <ChatProvider>
        <SearchProvider>
          <div
            className={cn(
              "flex h-screen gap-3 overflow-hidden bg-canvas-mesh p-3 max-lg:pb-16",
              className
            )}
          >
            <ChatPanel
              className={cn(
                "lg:flex",
                mobilePane === "chat" ? "max-lg:flex" : "max-lg:hidden"
              )}
            />
            <div
              className={cn(
                "min-w-0 flex-1 flex-col lg:flex",
                mobilePane === "canvas" ? "max-lg:flex" : "max-lg:hidden"
              )}
            >
              <TopBar userName={userName} userEmail={userEmail} />
              <main className="flex-1 overflow-y-auto px-2 pt-2 md:px-4">
                <PageContainer>{children}</PageContainer>
              </main>
            </div>

            {/* Mobile pane toggle */}
            <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center lg:hidden">
              <TabSwitch
                className="shadow-composer"
                options={[
                  { value: "canvas", label: "Board" },
                  { value: "chat", label: "Chat" },
                ]}
                value={mobilePane}
                onChange={(v) => setMobilePane(v as MobilePane)}
              />
            </div>
          </div>
        </SearchProvider>
      </ChatProvider>
    </ApplicationsProvider>
  );
}

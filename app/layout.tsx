import { ToastProvider } from "@/components/ui/toast";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Landed — from applied to offer",
  description: "AI-powered job application tracker. From applied to offer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-canvas">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

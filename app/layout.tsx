import { ToastProvider } from "@/components/ui/toast";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Landed — from applied to offer",
  description: "AI-powered job application tracker. From applied to offer.",
  openGraph: {
    title: "Landed — from applied to offer",
    description: "AI-powered job application tracker. From applied to offer.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landed — from applied to offer",
    description: "AI-powered job application tracker. From applied to offer.",
  },
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

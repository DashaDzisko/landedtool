import { AuthLayout } from "@/components/organisms/auth";
import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <AuthLayout
      title="Privacy policy"
      footer={
        <Link href="/sign-up" className="text-primary hover:underline">
          ← Back to sign up
        </Link>
      }
    >
      <div className="flex flex-col gap-4">
        <Heading level="h3">What we collect</Heading>
        <Text variant="small" className="text-ink-muted">
          Account email, job application details you enter, and chat messages
          sent to the AI assistant.
        </Text>
        <Heading level="h3">How we use it</Heading>
        <Text variant="small" className="text-ink-muted">
          To provide tracking, search, and AI-assisted guidance for your job
          search. Chat content may be processed by third-party AI providers when
          the API is connected.
        </Text>
        <Heading level="h3">Storage</Heading>
        <Text variant="small" className="text-ink-muted">
          Application data is stored locally in your browser during the preview.
          Production will use encrypted cloud storage.
        </Text>
      </div>
    </AuthLayout>
  );
}

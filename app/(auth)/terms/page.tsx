import { AuthLayout } from "@/components/organisms/auth";
import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";
import Link from "next/link";

export default function TermsPage() {
  return (
    <AuthLayout
      title="Terms of service"
      footer={
        <Link href="/sign-up" className="text-primary hover:underline">
          ← Back to sign up
        </Link>
      }
    >
      <div className="flex flex-col gap-4">
        <Heading level="h3">1. Service</Heading>
        <Text variant="small" className="text-ink-muted">
          Landed helps you organise job applications and interact with an AI
          assistant. The service is provided as-is during the preview period.
        </Text>
        <Heading level="h3">2. Your data</Heading>
        <Text variant="small" className="text-ink-muted">
          You retain ownership of application data you enter. We do not sell
          your personal information.
        </Text>
        <Heading level="h3">3. Acceptable use</Heading>
        <Text variant="small" className="text-ink-muted">
          Do not misuse the service, attempt unauthorised access, or upload
          unlawful content.
        </Text>
      </div>
    </AuthLayout>
  );
}

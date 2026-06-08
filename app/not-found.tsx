import { Button } from "@/components/atoms/button";
import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas px-6 text-center">
      <Text variant="eyebrow">404</Text>
      <Heading level="h1">Page not found</Heading>
      <Text variant="muted">That page doesn&apos;t exist or has moved.</Text>
      <Button asChild className="mt-2">
        <Link href="/" className="no-underline">
          Back to board
        </Link>
      </Button>
    </div>
  );
}

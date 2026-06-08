"use client";

import { Button } from "@/components/atoms/button";
import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";

export default function AppError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
      <Heading level="h2">Something went wrong</Heading>
      <Text variant="muted" className="max-w-sm">
        An unexpected error occurred. Your data is safe — try again.
      </Text>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}

import { Alert } from "@/components/atoms/alert";
import { Text } from "@/components/atoms/text";
import { Envelope } from "@phosphor-icons/react";

export interface CheckEmailMessageProps {
  email: string;
}

export function CheckEmailMessage({ email }: CheckEmailMessageProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-md border border-hairline bg-surface-2 text-primary">
        <Envelope size={24} weight="duotone" />
      </span>
      <div className="flex flex-col gap-2">
        <Text variant="body" className="font-medium">
          Check your email
        </Text>
        <Text variant="muted">
          We sent a magic link to <strong className="text-foreground">{email}</strong>.
          Click the link to sign in.
        </Text>
      </div>
      <Alert variant="default">
        Didn&apos;t receive it? Check spam or try again in a minute.
      </Alert>
    </div>
  );
}

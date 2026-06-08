import { Heading } from "@/components/atoms/heading";
import { Text } from "@/components/atoms/text";
import { cn } from "@/lib/utils";

export interface AuthLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthLayout({
  title,
  description,
  children,
  footer,
  className,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center bg-canvas px-6 py-12",
        className
      )}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col gap-2 text-center">
          <Text variant="eyebrow" as="span">
            Landed
          </Text>
          <Heading level="h1">{title}</Heading>
          {description && <Text variant="muted">{description}</Text>}
        </div>
        <div className="rounded-md border border-hairline bg-surface-1 p-6">
          {children}
        </div>
        {footer && (
          <div className="mt-6 text-center text-small text-muted">{footer}</div>
        )}
      </div>
    </div>
  );
}

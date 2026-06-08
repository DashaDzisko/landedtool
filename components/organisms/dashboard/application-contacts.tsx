import { Text } from "@/components/atoms/text";
import type { ApplicationContact } from "@/types/application";
import { cn } from "@/lib/utils";
import { Envelope } from "@phosphor-icons/react";

export interface ApplicationContactsProps {
  contacts: ApplicationContact[];
  className?: string;
}

export function ApplicationContacts({
  contacts,
  className,
}: ApplicationContactsProps) {
  if (contacts.length === 0) {
    return (
      <Text variant="small" className="text-muted">
        No contacts added yet.
      </Text>
    );
  }

  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {contacts.map((contact) => (
        <li
          key={contact.id}
          className="flex items-start justify-between gap-4 rounded-md border border-hairline bg-surface-3 px-5 py-3.5"
        >
          <div className="flex min-w-0 flex-col gap-0.5">
            <Text variant="small" as="span" className="font-medium">
              {contact.name}
            </Text>
            {contact.role && (
              <Text variant="xs" as="span" className="text-muted">
                {contact.role}
              </Text>
            )}
          </div>
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="flex shrink-0 items-center gap-1.5 text-xs text-primary no-underline hover:underline"
            >
              <Envelope size={14} />
              <span className="hidden sm:inline">{contact.email}</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

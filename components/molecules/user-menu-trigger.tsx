import { Avatar } from "@/components/atoms/avatar";
import { Icon } from "@/components/atoms/icon";
import { cn } from "@/lib/utils";
import { CaretDown } from "@phosphor-icons/react";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface UserMenuTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  email?: string;
}

export const UserMenuTrigger = forwardRef<
  HTMLButtonElement,
  UserMenuTriggerProps
>(({ name, email, className, ...props }, ref) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex h-10 items-center gap-2 rounded-md border border-hairline bg-surface-3 pl-1 pr-3 transition-all hover:bg-surface-4",
        className
      )}
      {...props}
    >
      <Avatar initials={initials} className="h-8 w-8 rounded-pill" />
      <span className="hidden items-start sm:flex sm:flex-col">
        <span className="text-small font-medium">{name}</span>
        {email && <span className="text-xs text-muted">{email}</span>}
      </span>
      <Icon icon={CaretDown} size="sm" className="text-muted" />
    </button>
  );
});

UserMenuTrigger.displayName = "UserMenuTrigger";

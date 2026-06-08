"use client";

import { UserMenuTrigger } from "@/components/molecules/user-menu-trigger";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/toast";
import { createClient } from "@/lib/supabase/client";
import { SignOut, Gear } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface UserMenuProps {
  name?: string;
  email?: string;
}

export function UserMenu({ name, email }: UserMenuProps) {
  const { toast } = useToast();
  const router = useRouter();

  const displayName = name ?? email?.split("@")[0] ?? "User";
  const displayEmail = email ?? "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserMenuTrigger name={displayName} email={displayEmail} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2">
            <Gear size={16} />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 text-red-400"
          onClick={async () => {
            const supabase = createClient();
            const { error } = await supabase.auth.signOut();
            if (error) {
              toast({
                title: "Could not sign out",
                description: error.message,
                variant: "error",
              });
              return;
            }
            router.push("/sign-in");
            router.refresh();
          }}
        >
          <SignOut size={16} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

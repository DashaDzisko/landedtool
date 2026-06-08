"use client";

import { Button } from "@/components/atoms/button";
import { SearchInput } from "@/components/molecules/search-input";
import { UserMenu } from "@/components/molecules/user-menu";
import { useSearch } from "@/components/providers/search-provider";
import { cn } from "@/lib/utils";
import { MagnifyingGlass, Plus, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

export interface TopBarProps {
  className?: string;
  userName?: string;
  userEmail?: string;
}

export function TopBar({ className, userName, userEmail }: TopBarProps) {
  const { query, setQuery } = useSearch();
  const [searchOpen, setSearchOpen] = useState(false);

  const closeSearch = () => {
    setQuery("");
    setSearchOpen(false);
  };

  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center justify-between gap-3 px-2 md:px-4",
        className
      )}
    >
      <Link
        href="/"
        className="text-h3 font-semibold text-foreground no-underline"
      >
        Landed
      </Link>

      <div className="flex min-w-0 items-center gap-2">
        {searchOpen ? (
          <>
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search applications…"
              className="w-44 sm:w-64"
            />
            <button
              type="button"
              onClick={closeSearch}
              className="icon-circle h-10 w-10 shrink-0 transition-colors hover:bg-surface-4"
              aria-label="Close search"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <Button asChild size="sm">
              <Link href="/applications/new" className="no-underline">
                <Plus size={16} weight="bold" />
                New application
              </Link>
            </Button>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="icon-circle h-10 w-10 shrink-0 transition-colors hover:bg-surface-4"
              aria-label="Search applications"
            >
              <MagnifyingGlass size={16} />
            </button>
          </>
        )}
        <UserMenu name={userName} email={userEmail} />
      </div>
    </header>
  );
}

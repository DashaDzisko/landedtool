"use client";

import { Input } from "@/components/atoms/input";
import { Icon } from "@/components/atoms/icon";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search applications…",
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
        <Icon icon={MagnifyingGlass} size="sm" />
      </span>
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="pl-11"
      />
    </div>
  );
}

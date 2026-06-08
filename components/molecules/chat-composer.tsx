"use client";

import { Button } from "@/components/atoms/button";
import { Icon } from "@/components/atoms/icon";
import { Textarea } from "@/components/atoms/textarea";
import { cn } from "@/lib/utils";
import { ArrowUp, CircleNotch } from "@phosphor-icons/react";
import {
  useCallback,
  useEffect,
  useRef,
  type FormEvent,
  type KeyboardEvent,
} from "react";

export interface ChatComposerProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: "default" | "floating";
  className?: string;
}

export function ChatComposer({
  value = "",
  onChange,
  onSubmit,
  placeholder = "Ask about your applications…",
  disabled,
  isLoading,
  variant = "default",
  className,
}: ChatComposerProps) {
  const canSend = value.trim().length > 0 && !disabled && !isLoading;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow the textarea to fit its content (capped by max-height → then scrolls).
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  const handleSubmit = useCallback(
    (event?: FormEvent) => {
      event?.preventDefault();
      if (!canSend) return;
      onSubmit?.(value.trim());
    },
    [canSend, onSubmit, value]
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const isFloating = variant === "floating";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        isFloating ? "flex flex-col" : "flex flex-col gap-3 border-t border-hairline p-4",
        className
      )}
    >
      <div className="flex items-end gap-2">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          rows={1}
          className={cn(
            "no-scrollbar min-h-10 max-h-28 flex-1 resize-none py-2.5 leading-tight",
            isFloating ? "text-chat" : "text-body"
          )}
          aria-label="Message"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!canSend}
          aria-label={isLoading ? "Sending" : "Send"}
          className="shrink-0"
        >
          <Icon
            icon={isLoading ? CircleNotch : ArrowUp}
            size="sm"
            className={isLoading ? "animate-spin" : undefined}
          />
        </Button>
      </div>
    </form>
  );
}

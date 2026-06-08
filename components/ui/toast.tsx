"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "success" | "error";

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastContextValue {
  toasts: ToastData[];
  toast: (data: Omit<ToastData, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const variantStyles: Record<ToastVariant, string> = {
  default: "border-hairline bg-surface-2",
  success: "border-success/30 bg-surface-2",
  error: "border-red-500/30 bg-surface-2",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((data: Omit<ToastData, "id">) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...data, id }]);
    setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  const value = useMemo(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex items-start gap-3 rounded-md border p-4 shadow-none",
            variantStyles[t.variant ?? "default"]
          )}
        >
          <div className="flex-1">
            <p className="text-small font-medium text-foreground">{t.title}</p>
            {t.description && (
              <p className="mt-1 text-xs text-muted">{t.description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onDismiss(t.id)}
            className="rounded-md p-1 text-muted hover:bg-surface-3 hover:text-foreground"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

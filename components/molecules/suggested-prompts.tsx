import { Text } from "@/components/atoms/text";
import { PromptChip } from "./prompt-chip";
import { cn } from "@/lib/utils";

export interface SuggestedPromptsProps {
  prompts: string[];
  onSelect?: (prompt: string) => void;
  label?: string;
  className?: string;
}

export function SuggestedPrompts({
  prompts,
  onSelect,
  label = "Suggested",
  className,
}: SuggestedPromptsProps) {
  if (prompts.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-2 px-4 py-3", className)}>
      <Text variant="eyebrow" as="span">
        {label}
      </Text>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <PromptChip
            key={prompt}
            label={prompt}
            onClick={() => onSelect?.(prompt)}
          />
        ))}
      </div>
    </div>
  );
}

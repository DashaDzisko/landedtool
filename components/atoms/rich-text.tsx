import { Fragment } from "react";

// Inline markdown tokens: **bold**, *italic*, `code` (single-line).
const TOKEN = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g;

export interface RichTextProps {
  children: string;
}

/**
 * Minimal inline-markdown renderer for chat messages — handles **bold**,
 * *italic*, and `code`. Line breaks are preserved by the parent's
 * `whitespace-pre-wrap`. (Swap for `react-markdown` if the agent starts
 * emitting block markdown: lists, headings, links, tables.)
 */
export function RichText({ children }: RichTextProps) {
  const parts = children.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="text-mono rounded bg-surface-3 px-1 py-0.5 text-[0.9em]"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

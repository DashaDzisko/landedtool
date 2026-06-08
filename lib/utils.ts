import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Teach tailwind-merge about our custom typographic utilities (defined in
 * app/globals.css). Without this they're treated as text-COLORS and get
 * stripped when sitting next to a real color class (e.g. `text-body
 * text-on-primary` would drop `text-body`, leaving an inherited size).
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "body-lg",
            "body",
            "small",
            "chat",
            "eyebrow",
            "mono",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

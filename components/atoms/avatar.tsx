import { cn } from "@/lib/utils";

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  className?: string;
}

export function Avatar({ src, alt = "", initials, className }: AvatarProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-10 w-10 rounded-pill border border-hairline object-cover",
          className
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-pill border border-hairline bg-surface-2 text-xs font-medium text-foreground",
        className
      )}
      aria-hidden={!initials}
    >
      {initials}
    </span>
  );
}

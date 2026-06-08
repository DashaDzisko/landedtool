import NextLink from "next/link";
import { cn } from "@/lib/utils";

export interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}

export function Link({ href, className, children, external }: LinkProps) {
  const classes = cn(
    "text-small font-medium text-primary underline-offset-4 hover:text-primary-hover hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus/50",
    className
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes}>
      {children}
    </NextLink>
  );
}

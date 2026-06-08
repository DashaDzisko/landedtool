import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export interface IconProps {
  icon: PhosphorIcon;
  size?: keyof typeof sizeMap;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
  label?: string;
}

export function Icon({
  icon: IconComponent,
  size = "md",
  weight = "regular",
  className,
  label,
}: IconProps) {
  return (
    <IconComponent
      size={sizeMap[size]}
      weight={weight}
      className={cn("shrink-0", className)}
      aria-hidden={!label}
      aria-label={label}
    />
  );
}

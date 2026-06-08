import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn("text-small font-medium text-foreground", className)}
      {...props}
    >
      {children}
    </label>
  );
}

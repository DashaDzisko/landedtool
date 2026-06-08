import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Text } from "@/components/atoms/text";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  inputProps?: React.ComponentProps<typeof Input>;
}

export function FormField({
  id,
  label,
  error,
  hint,
  className,
  inputProps,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} {...inputProps} />
      {hint && !error && (
        <Text variant="muted" as="span">
          {hint}
        </Text>
      )}
      {error && (
        <Text variant="muted" as="span" className="text-primary" id={`${id}-error`}>
          {error}
        </Text>
      )}
    </div>
  );
}

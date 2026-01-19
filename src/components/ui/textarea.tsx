import { useFormContext } from "react-hook-form";
import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  name: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, name, ...props }, ref) => {
  const formContext = useFormContext();
  const fieldState = formContext?.getFieldState(name);
  const hasError = !!fieldState?.error;

  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      aria-invalid={hasError}
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-primary-500 dark:bg-input/30 flex field-sizing-content min-h-16 w-full resize-none rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 md:text-sm",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

interface FormTextareaProps extends Omit<TextareaProps, "name"> {
  name: string;
  label?: string;
  description?: string;
}

const FormTextarea = ({ name, label, description, className, ...props }: FormTextareaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <Textarea id={name} {...register(name)} className={className} {...props} />
      {description && !error && <p className="text-xs text-gray-500">{description}</p>}
      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
    </div>
  );
};

export { Textarea, FormTextarea };

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  name?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, name, ...props }, ref) => {
  const formContext = useFormContext?.();
  const fieldState = name && formContext ? formContext.getFieldState(name) : null;
  const hasError = !!fieldState?.error;

  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      aria-invalid={hasError}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-primary-500",
        "aria-invalid:border-red-500",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

interface FormInputProps extends Omit<React.ComponentProps<"input">, "name"> {
  name: string;
  label?: string;
  description?: string;
}

const FormInput = ({ name, label, description, className, ...props }: FormInputProps) => {
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
      <Input id={name} {...register(name)} className={className} {...props} />
      {description && !error && <p className="text-xs text-gray-500">{description}</p>}
      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
    </div>
  );
};

export { Input, FormInput };

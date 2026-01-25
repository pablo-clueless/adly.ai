import * as React from "react";

import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"textarea"> {
  error?: { touched?: boolean; message?: string };
  helperText?: string;
  label?: string;
  inputClassName?: string;
  isLoading?: boolean;
  labelClassName?: string;
  wrapperClassName?: string;
}

function Textarea({
  className,
  error,
  helperText,
  id,
  inputClassName,
  label,
  labelClassName,
  name,
  required,
  wrapperClassName,
  ...props
}: Props) {
  return (
    <div className={cn("w-full space-y-0.5", wrapperClassName)}>
      {label && (
        <label
          className={cn(
            "text-sm font-medium text-gray-700",
            labelClassName,
            required && "after:ml-1 after:text-red-500 after:content-['*']",
          )}
          htmlFor={name ?? id}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "focus-within:border-primary-600 flex field-sizing-content min-h-20 min-w-0 rounded-md border px-3 py-1 shadow-xs transition-[color,box-shadow,border] duration-300 outline-none",
          inputClassName,
        )}
      >
        <textarea
          data-slot="textarea"
          className={cn(
            "h-full w-full resize-none bg-transparent text-sm transition-[color,box-shadow] outline-none placeholder:text-gray-400 focus:border-0 focus:outline-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
          id={id}
          name={name}
          {...props}
        />
      </div>
      {error?.touched && error?.message ? (
        <span className="text-xs text-red-500">{error.message}</span>
      ) : helperText ? (
        <span className="text-xs text-gray-500">{helperText}</span>
      ) : null}
    </div>
  );
}

export { Textarea };

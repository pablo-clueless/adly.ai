"use client";

import { CheckIcon, CircleXIcon, EyeIcon, EyeOffIcon, LoaderIcon, SearchIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"input"> {
  error?: { touched?: boolean; message?: string };
  helperText?: string;
  label?: string;
  inputClassName?: string;
  isLoading?: boolean;
  isValid?: boolean | null;
  labelClassName?: string;
  wrapperClassName?: string;
}

function Input({
  className,
  error,
  helperText,
  id,
  inputClassName,
  isLoading,
  isValid,
  label,
  labelClassName,
  name,
  required,
  wrapperClassName,
  type,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = React.useState(false);

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
          "focus-within:border-primary-600 group flex h-9 min-w-0 items-center gap-x-2 rounded-md border px-3 py-1 shadow-xs transition-[color,box-shadow,border] duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          inputClassName,
        )}
      >
        {type === "search" && (
          <SearchIcon className="group-hover:text-primary-400 size-4 text-gray-700 transition-colors duration-500" />
        )}
        <input
          type={showPassword ? "text" : type}
          name={name}
          id={id}
          data-slot="input"
          className={cn(
            "file:text-foreground h-full w-full border-0 bg-transparent text-sm outline-0 transition-all duration-300 placeholder:text-gray-400 focus:border-0 focus:outline-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "aria-invalid:border-red-500",
            className,
          )}
          onWheel={(e) => e.currentTarget.blur()}
          {...props}
        />
        {isLoading ? (
          <LoaderIcon className="size-4 animate-spin text-gray-700" />
        ) : isValid === true ? (
          <CheckIcon className="size-4 text-green-400" />
        ) : isValid === false ? (
          <CircleXIcon className="size-4 text-red-500" />
        ) : null}
        {type === "password" && (
          <button onClick={() => setShowPassword((prev) => !prev)} type="button">
            {showPassword ? (
              <EyeOffIcon className="size-4 text-gray-700" />
            ) : (
              <EyeIcon className="size-4 text-gray-700" />
            )}
          </button>
        )}
      </div>
      {error?.touched && error?.message ? (
        <span className="text-xs text-red-500">{error.message}</span>
      ) : helperText ? (
        <span className="text-xs text-gray-500">{helperText}</span>
      ) : null}
    </div>
  );
}

export { Input };

"use client";

import { cn } from "@/lib";

interface Props {
  current: number;
  limit: number;
  onPageChange: (page: number) => void;
  total: number;
  buttonClassName?: string;
  className?: string;
  numberButtonClassName?: string;
}

export const Pagination = ({
  current,
  limit,
  onPageChange,
  total,
  buttonClassName,
  className,
  numberButtonClassName,
}: Props) => {
  const totalPages = Math.ceil(total / limit);

  const goToPrevious = () => {
    if (current > 0) {
      return onPageChange(current - 1);
    }
  };

  const goToNext = () => {
    if (current < totalPages - 1) {
      onPageChange(current + 1);
    }
  };

  const renderPageButton = (index: number) => (
    <button
      key={index}
      onClick={() => onPageChange(index)}
      disabled={current === index}
      className={cn(
        "grid size-7 place-items-center rounded-md text-xs font-medium",
        current === index ? "bg-primary-500 text-white" : "border-primary-500 text-primary-500 border bg-white",
        numberButtonClassName,
      )}
    >
      {index + 1}
    </button>
  );

  const renderButtons = () => {
    const numbers = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      for (let i = 0; i < totalPages; i++) {
        numbers.push(renderPageButton(i));
      }
    } else {
      numbers.push(renderPageButton(0));
      if (current <= 2) {
        for (let i = 1; i <= 3; i++) {
          numbers.push(renderPageButton(i));
        }
        numbers.push(
          <span key="ellipsis" className="px-2">
            ...
          </span>,
        );
      } else if (current >= totalPages - 3) {
        numbers.push(
          <span key="ellipsis" className="px-2">
            ...
          </span>,
        );
        for (let i = totalPages - 4; i < totalPages - 1; i++) {
          numbers.push(renderPageButton(i));
        }
      } else {
        numbers.push(
          <span key="ellipsis-start" className="px-2">
            ...
          </span>,
        );
        for (let i = current - 1; i <= current + 1; i++) {
          numbers.push(renderPageButton(i));
        }
        numbers.push(
          <span key="ellipsis-end" className="px-2">
            ...
          </span>,
        );
      }

      numbers.push(renderPageButton(totalPages - 1));
    }

    return numbers;
  };

  return (
    <div className={cn("flex w-full items-center justify-center gap-x-4", className)}>
      <button
        className={cn(
          "bg-primary-500 h-7 rounded-md px-3 text-xs font-medium text-white disabled:cursor-not-allowed disabled:border disabled:bg-white disabled:text-neutral-800",
          buttonClassName,
        )}
        disabled={totalPages === 0 || current === 0}
        onClick={goToPrevious}
        type="button"
      >
        Prev
      </button>
      <div className="flex items-center gap-x-3">{renderButtons()}</div>
      <button
        className={cn(
          "bg-primary-500 h-7 rounded-md px-3 text-xs font-medium text-white disabled:cursor-not-allowed disabled:border disabled:bg-white disabled:text-neutral-800",
          buttonClassName,
        )}
        disabled={totalPages === 0 || current === totalPages - 1}
        onClick={goToNext}
        type="button"
      >
        Next
      </button>
    </div>
  );
};

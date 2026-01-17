"use client";

import { useReactToPrint, type UseReactToPrintFn } from "react-to-print";
import React from "react";

interface UsePrintProps {
  contentRef: React.RefObject<HTMLElement>;
  documentTitle: string;
  onAfterPrint: () => void;
  onBeforePrint: () => Promise<void>;
  onPrintError: (errorLocation: "onBeforePrint" | "print", error: Error) => void;
}

interface UsePrintReturn {
  handlePrint: UseReactToPrintFn;
  isPrinting: boolean;
}

export const usePrint = ({
  contentRef,
  documentTitle,
  onAfterPrint,
  onBeforePrint,
  onPrintError,
}: UsePrintProps): UsePrintReturn => {
  const [isPrinting, setIsPrinting] = React.useState(false);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle,
    onAfterPrint: () => {
      setIsPrinting(false);
      onAfterPrint();
    },
    onBeforePrint: async () => {
      setIsPrinting(true);
      await onBeforePrint();
    },
    onPrintError: (errorLocation, error) => {
      setIsPrinting(false);
      onPrintError(errorLocation, error);
    },
  });

  return { handlePrint, isPrinting };
};

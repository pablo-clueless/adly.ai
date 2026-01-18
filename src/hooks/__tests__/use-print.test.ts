/* eslint-disable @typescript-eslint/no-explicit-any */

import { renderHook, act } from "@testing-library/react";

import { usePrint } from "../use-print";

jest.mock("react-to-print", () => ({
  useReactToPrint: jest.fn().mockImplementation((opts: any) => {
    return async () => {
      try {
        if (opts.onBeforePrint) {
          await opts.onBeforePrint();
        }
        if (opts.onAfterPrint) {
          opts.onAfterPrint();
        }
      } catch (e) {
        if (opts.onPrintError) {
          opts.onPrintError("onBeforePrint", e as Error);
        }
      }
    };
  }),
}));

const createRef = () => ({ current: document.createElement("div") }) as React.RefObject<HTMLElement>;

describe("usePrint", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with isPrinting=false and exposes handlePrint", () => {
    const onAfterPrint = jest.fn();
    const onBeforePrint = jest.fn().mockResolvedValue(undefined);
    const onPrintError = jest.fn();

    const { result } = renderHook(() =>
      usePrint({ contentRef: createRef(), documentTitle: "Doc", onAfterPrint, onBeforePrint, onPrintError }),
    );

    expect(typeof result.current.handlePrint).toBe("function");
    expect(result.current.isPrinting).toBe(false);
  });

  it("sets isPrinting true during before print and false after print (success path)", async () => {
    const onAfterPrint = jest.fn();
    const onBeforePrint = jest.fn().mockResolvedValue(undefined);
    const onPrintError = jest.fn();

    const { result } = renderHook(() =>
      usePrint({ contentRef: createRef(), documentTitle: "Doc", onAfterPrint, onBeforePrint, onPrintError }),
    );

    await act(async () => {
      await result.current.handlePrint();
    });

    expect(result.current.isPrinting).toBe(false);
    expect(onBeforePrint).toHaveBeenCalledTimes(1);
    expect(onAfterPrint).toHaveBeenCalledTimes(1);
    expect(onPrintError).not.toHaveBeenCalled();
  });

  it("handles error thrown during onBeforePrint by calling onPrintError and resetting isPrinting", async () => {
    const onAfterPrint = jest.fn();
    const onBeforePrint = jest.fn().mockRejectedValue(new Error("prep failed"));
    const onPrintError = jest.fn();

    const { result } = renderHook(() =>
      usePrint({ contentRef: createRef(), documentTitle: "Doc", onAfterPrint, onBeforePrint, onPrintError }),
    );

    await act(async () => {
      await result.current.handlePrint();
    });

    expect(onPrintError).toHaveBeenCalledTimes(1);
    const [location, error] = (onPrintError as jest.Mock).mock.calls[0];
    expect(location).toBe("onBeforePrint");
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe("prep failed");
    expect(result.current.isPrinting).toBe(false);
    expect(onAfterPrint).not.toHaveBeenCalled();
  });

  it("propagates print error via onPrintError and resets state when print fails after beforePrint", async () => {
    const { useReactToPrint } = jest.requireMock("react-to-print");
    (useReactToPrint as jest.Mock).mockImplementationOnce((opts: any) => {
      return async () => {
        if (opts.onBeforePrint) {
          await opts.onBeforePrint();
        }
        if (opts.onPrintError) {
          opts.onPrintError("print", new Error("print failed"));
        }
      };
    });

    const onAfterPrint = jest.fn();
    const onBeforePrint = jest.fn().mockResolvedValue(undefined);
    const onPrintError = jest.fn();

    const { result } = renderHook(() =>
      usePrint({ contentRef: createRef(), documentTitle: "Doc", onAfterPrint, onBeforePrint, onPrintError }),
    );

    await act(async () => {
      await result.current.handlePrint();
    });

    expect(onBeforePrint).toHaveBeenCalledTimes(1);
    expect(onAfterPrint).not.toHaveBeenCalled();
    expect(onPrintError).toHaveBeenCalledWith("print", expect.any(Error));
    expect(result.current.isPrinting).toBe(false);
  });

  it("passes documentTitle and contentRef into underlying hook (indirectly via behavior)", async () => {
    const { useReactToPrint } = jest.requireMock("react-to-print");

    const onAfterPrint = jest.fn();
    const onBeforePrint = jest.fn().mockResolvedValue(undefined);
    const onPrintError = jest.fn();

    renderHook(() =>
      usePrint({ contentRef: createRef(), documentTitle: "MyTitle", onAfterPrint, onBeforePrint, onPrintError }),
    );

    const callArg = (useReactToPrint as jest.Mock).mock.calls.pop()?.[0];
    expect(callArg.documentTitle).toBe("MyTitle");
    expect(callArg.contentRef).toBeDefined();
  });
});

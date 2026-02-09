import { useState } from "react";

/**
 * Response structure returned by the mock API call.
 * @template T - The type of data in the response
 */
interface MockApiResponse<T> {
  /** HTTP status code (200 for success, 400 for error) */
  status: number;
  /** Response data (null on error) */
  data: T | null;
  /** Error message (empty string on success) */
  message: string;
}

interface UseMockApiProps<T> {
  /** Simulated loading time in milliseconds (default: 1000) */
  loadTime?: number;
  /** Error message to return on failure */
  errorMessage?: string;
  /** Whether the mock call should succeed or fail */
  expectedResponse: "error" | "success";
  /** Data to return on success */
  mockData?: T;
}

interface UseMockApiReturn<T> {
  /** Whether the mock API call is in progress */
  isLoading: boolean;
  /** The response from the mock API call */
  response: MockApiResponse<T> | null;
  /** Function to trigger the mock API call */
  triggerCall: () => Promise<void>;
}

/**
 * Hook for simulating API calls during development and testing.
 * Useful for prototyping UI states without a real backend.
 *
 * @template T - The type of data the API returns
 * @param props - Configuration options
 * @param props.loadTime - Simulated delay in ms (default: 1000)
 * @param props.expectedResponse - Whether to simulate success or error
 * @param props.mockData - Data to return on success
 * @param props.errorMessage - Error message on failure
 * @returns Object with loading state, response, and trigger function
 *
 * @example
 * ```tsx
 * interface User {
 *   id: number;
 *   name: string;
 * }
 *
 * const { isLoading, response, triggerCall } = useMockApi<User>({
 *   expectedResponse: "success",
 *   mockData: { id: 1, name: "John Doe" },
 *   loadTime: 2000,
 * });
 *
 * return (
 *   <div>
 *     <button onClick={triggerCall} disabled={isLoading}>
 *       {isLoading ? "Loading..." : "Fetch User"}
 *     </button>
 *     {response?.data && <p>User: {response.data.name}</p>}
 *   </div>
 * );
 * ```
 */
export const useMockApi = <T>({
  loadTime = 1000,
  expectedResponse,
  mockData,
  errorMessage = "An error occurred",
}: UseMockApiProps<T>): UseMockApiReturn<T> => {
  const [response, setResponse] = useState<MockApiResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const triggerCall = async () => {
    setIsLoading(true);
    setResponse(null);

    await new Promise((resolve) => setTimeout(resolve, loadTime));

    if (expectedResponse === "success") {
      setResponse({
        status: 200,
        data: mockData ?? null,
        message: "",
      });
    } else {
      setResponse({
        message: errorMessage,
        status: 400,
        data: null,
      });
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    response,
    triggerCall,
  };
};

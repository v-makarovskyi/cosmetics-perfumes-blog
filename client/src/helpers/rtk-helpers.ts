import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

export function isErrorWithCustomDataServer(error: unknown): error is {
  status: number;
  data: {
    errorName: string;
    statusCode: number;
    stack: string;
    success: boolean;
    errorMessage: string;
    errorMessagesArray: string[];
  };
} {
  return (
    typeof error === "object" &&
    error != null &&
    "data" in error &&
    typeof (error as any).data === "object"
  );
}

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isFetchBaseQueryError(
  error: unknown
): error is SerializedError {
  return typeof error === "object" && error !== null && "name" in error;
}

type ErrorMessage = {
    location?: string;
    message?: string;
    fieldName?: string
}

export function isErrorWithCustomDataServer(error: unknown): error is {
  status: number;
  data: {
    errorName: string;
    statusCode: number;
    stack: string;
    success: boolean;
    errorMessage: string;
    errorMessagesArray: ErrorMessage[];
  };
} {
  return (
    typeof error === "object" &&
    error != null &&
    "data" in error &&
    typeof (error as any).data === "object"
  );
}

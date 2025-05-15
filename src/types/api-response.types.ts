/* eslint-disable @typescript-eslint/no-explicit-any */
// Define ApiResponse Type
export type ApiResponse<T> = {
    message: string;
    success: boolean;
    data: T;
}

// Define ApiResponseWithData Type
export type ApiResponseWithData<T> = {
    data: T; // Just the data part without other metadata like status, statusText, headers, config, and request
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: Record<string, any>;
    request: Record<string, any>;
}
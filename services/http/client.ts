import { config } from "@/config";
import type { ApiError, ApiResponse } from "@/types";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  params?: Record<string, string | number | boolean>;
}

async function request<T>(
  method: HttpMethod,
  endpoint: string,
  body?: unknown,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { params, ...fetchOptions } = options;

  const url = new URL(`${config.api.baseUrl}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, String(value))
    );
  }

  const response = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...fetchOptions,
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      code: "UNKNOWN_ERROR",
      message: "An unexpected error occurred.",
    }));
    throw error;
  }

  return response.json() as Promise<ApiResponse<T>>;
}

export const httpClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>("GET", endpoint, undefined, options),
  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>("POST", endpoint, body, options),
  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>("PUT", endpoint, body, options),
  patch: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    request<T>("PATCH", endpoint, body, options),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>("DELETE", endpoint, undefined, options),
};

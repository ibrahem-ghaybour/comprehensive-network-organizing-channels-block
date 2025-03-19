interface Props {
  endpoint: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  params?: Record<string, any>;
  body?: any;
  requireAuth?: boolean;
}

export async function apiRequest<T>({
  endpoint,
  method,
  params: params = { page: 1, sizePage: 10 },
  body,
  requireAuth = false,
}: Props): Promise<{ dataRes?: T; error?: string }> {
  try {
    const config = useRuntimeConfig();
    const API_BASE = config.public.API_BASE;

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2QzMjNhNmMyOWU4YTBjZTJiMzI3OTUiLCJlbWFpbCI6ImdoYWlib3VyZ0BnbWFpbC5jb20iLCJuYW1lIjoiaWJyYWhpbSIsImlhdCI6MTc0MjM4NzM2OSwiZXhwIjoxNzQyMzkwOTY5fQ.6GOUhkeLP0s0ggIlGAtKEqz8hGR1n-nq-QgIbs7aXBE";
    if (requireAuth && !token) {
      return { error: "Authorization token is missing!" };
    }
    const response = await $fetch<T>(`${API_BASE}/${endpoint}`, {
      method,
      params,
      headers: {
        "Content-Type": "application/json",
        ...(requireAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body,
    });

    return { dataRes: response };
  } catch (error: any) {
    console.error(`Error in API request (${method} ${endpoint}):`, error);

    const errorMessage =
      error?.dataRes?.message || "An unexpected error occurred.";
    return { error: errorMessage };
  }
}

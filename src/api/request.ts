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
  params,
  body,
  requireAuth = false,
}: Props): Promise<{ data?: T; error?: string }> {
  try {
    const config = useRuntimeConfig();
    const API_BASE = config.public.API_BASE;

    const token = localStorage.getItem("token");
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

    return { data: response };
  } catch (error: any) {
    console.error(`Error in API request (${method} ${endpoint}):`, error);

    const errorMessage =
      error?.data?.message || "An unexpected error occurred.";
    return { error: errorMessage };
  }
}

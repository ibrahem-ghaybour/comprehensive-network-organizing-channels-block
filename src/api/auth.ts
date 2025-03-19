import { apiRequest } from "./request";
import type { authResponse, User } from "~/types/auth";

export const useAuthApi = () => {
  return {
    login: async (email: string, password: string) =>
      await apiRequest<authResponse>({
        endpoint: "auth/login",
        method: "POST",
        body: { email, password },
      }),
    logout: async () =>
      await apiRequest<void>({ endpoint: "auth/logout", method: "POST" }),
    getProfile: async () =>
      await apiRequest<User>({
        endpoint: "auth/profile",
        method: "GET",
        requireAuth: true,
      }),
  };
};

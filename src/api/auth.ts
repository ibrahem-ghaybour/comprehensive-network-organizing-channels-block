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
    getProfile: async () =>
      await apiRequest<User>({
        endpoint: "auth/profile",
        method: "GET",
        requireAuth: true,
      }),
    updateProfile: async (data: User) =>
      await apiRequest<authResponse>({
        endpoint: "auth/profile",
        method: "PATCH",
        body: data,
        requireAuth: true,
      }),
    signup: async (data: User) =>
      await apiRequest<authResponse>({
        endpoint: "auth/signup",
        method: "POST",
        body: data,
      }),
  };
};

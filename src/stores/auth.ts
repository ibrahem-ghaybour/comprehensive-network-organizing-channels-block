import { defineStore } from "pinia";
import { useAuthApi } from "@/api/auth"; // Import API
import type { User } from "~/types/auth";

export const useAuthStore = defineStore("auth_store", () => {
  const { login, logout, getProfile } = useAuthApi();
  // state
  const currentUser: Ref<User | null> = ref(null);
  const isAuthenticated = ref(false);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const message = ref<string | null>(null);

  async function initFormStorage() {
    if (import.meta.server) return; // Works correctly in Nuxt 3

    try {
      const auth_token = useCookie("auth_token"); // Read cookie
      if (!auth_token.value) return; // No token? Skip fetch

      const { res: dataRes, error } = await getProfile();
      if (error) throw new Error(error || "An unknown error occurred");

      if (dataRes) {
        currentUser.value = dataRes;
        isAuthenticated.value = true;
        message.value = "User data fetched successfully";
      }
    } catch (err) {
      error.value = err.message || "An error occurred";
    } finally {
      isLoading.value = false;
    }
  }
  async function authLogin(email: string, password: string) {
    const auth_token = useCookie("auth_token");
    isLoading.value = true;
    error.value = null;
    try {
      const { error, res: dataUserRes } = await login(email, password);
      if (error) throw new Error(error || "An unknown error occurred");
      currentUser.value = dataUserRes.user;
      auth_token.value = dataUserRes.token;
      isAuthenticated.value = true;
      message.value = dataUserRes.message;
    } catch (err) {
      error.value = err.message || "An error occurred";
      message.value = null;
    } finally {
      isLoading.value = false;
    }
  }
  async function authLogout() {
    const auth_token = useCookie("auth_token");
    isLoading.value = true;
    error.value = null;
    try {
      const { res: dataRes, error } = await logout();
      if (error) throw new Error(error || "An unknown error occurred");
      auth_token.value = null;
      currentUser.value = null;
      isAuthenticated.value = false;
      message.value = dataRes.message;
    } catch (err) {
      error.value = err.message || "An error occurred";
    } finally {
      isLoading.value = false;
    }
  }
  return {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    message,
    initFormStorage,
    authLogin,
    authLogout,
  };
});

import { defineStore } from "pinia";
import { useAuthApi } from "@/api/auth"; // Import API
import { useRolesStore } from "./roles";
import type { User } from "~/types/auth";

export const useAuthStore = defineStore("auth_store", () => {
  if (import.meta.server) return; // Prevent SSR
  const { login, getProfile, updateProfile, signup } = useAuthApi();
  // state
  const currentUser: Ref<User | null> = ref(null);
  const isAuthenticated = ref(false);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const message = ref<string | null>(null);
  // computed
  const userName = computed(() => currentUser.value?.name || "");
  const userImage = computed(() => currentUser.value?.image || "");
  // methods
  async function initFormStorage() {
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
    try {
      const auth_token = useCookie("auth_token");
      if (!auth_token) {
        throw new Error("No auth token found");
      }
      // Clear authentication-related values
      auth_token.value = ""; // Clear cookie properly
      currentUser.value = null;
      message.value = "User logged out successfully";
      isAuthenticated.value = false;
    } catch (err) {
      error.value = err.message || "An error occurred during logout";
    }
  }

  async function authUpdateProfile(userData: User) {
    isLoading.value = true;
    error.value = null;
    const auth_token = useCookie("auth_token");
    try {
      const { error, res: dataUserRes } = await updateProfile(userData);
      if (error) throw new Error(error || "An unknown error occurred");
      auth_token.value = dataUserRes.token;
      currentUser.value = dataUserRes.user;
      isAuthenticated.value = true;
      message.value = dataUserRes.message;
    } catch (err) {
      error.value = err.message || "An error occurred";
    } finally {
      isLoading.value = false;
    }
  }
  async function authSignup(userData: User) {
    isLoading.value = true;
    error.value = null;
    const auth_token = useCookie("auth_token");
    try {
      const { error, res: dataUserRes } = await signup(userData);
      if (error) throw new Error(error || "An unknown error occurred");
      auth_token.value = dataUserRes.token;
      currentUser.value = dataUserRes.user;
      isAuthenticated.value = true;
      message.value = dataUserRes.message;
    } catch (err) {
      error.value = err.message || "An error occurred";
    } finally {
      isLoading.value = false;
    }
  }
  // Check if user has permission for an action
  function hasPermission(permission: string): boolean {
    if (!isAuthenticated.value || !currentUser.value) return false;

    const rolesStore = useRolesStore();
    console.log(currentUser.value.role, 'ccccccccccc');
    return rolesStore.hasPermission(currentUser.value.role, permission);
  }
  return {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    message,
    userName,
    userImage,
    initFormStorage,
    authLogin,
    authUpdateProfile,
    authLogout,
    authSignup,
    hasPermission,
  };
});

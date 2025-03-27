import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/auth") return;
  const authStore = useAuthStore();
  const token = useCookie("auth_token");
  if (!authStore.isAuthenticated && token.value) {
    await authStore.initFormStorage();
  }

  if (authStore.error) {
    return navigateTo("/auth");
  }
  if (!authStore.isAuthenticated) {
    if (to.path !== "/auth") {
      return navigateTo("/auth");
    }
    return;
  }
  if (
    to.meta.requiredPermissions &&
    Array.isArray(to.meta.requiredPermissions)
  ) {
    const requiredPermissions = to.meta.requiredPermissions as string[];

    // Check if the user has all required permissions
    const hasAllPermissions = requiredPermissions.every((permission) =>
      authStore.hasPermission(permission)
    );

    if (!hasAllPermissions) {
      // Redirect to unauthorized page or dashboard
      return navigateTo("/unauthorized");
    }
  }
});

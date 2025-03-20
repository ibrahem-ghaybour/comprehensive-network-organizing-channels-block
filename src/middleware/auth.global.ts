import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;
  const authStore = useAuthStore();
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

<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <div class="w-full max-w-md bg-background-card rounded-lg shadow-md p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-center mb-2">
          {{ route.query.signup ? $t("auth.signup") : $t("auth.login") }}
        </h1>
        <p class="text-text opacity-80">
          {{
            route.query.signup
              ? $t("auth.signupSubtitle")
              : $t("auth.loginSubtitle")
          }}
        </p>
      </div>
      <!-- <h1 class="text-3xl font-bold text-white text-center mb-2">
        Create an Account
      </h1> -->
      <!-- <p class="text-[#B5BAC1] text-center mb-8">Join our community today</p> -->
      <div class="min-h-14">
        <div
          v-if="authStore.error"
          class="bg-danger text-white p-3 rounded-md mb-6"
        >
          {{ authStore.error }}
        </div>
        <div v-if="authStore.message">
          <p class="bg-primary text-white p-3 rounded-md mb-6">
            {{ authStore.message }}
          </p>
        </div>
        <div
          v-if="sessionExpired"
          class="bg-warning text-text p-3 rounded-md mb-6"
        >
          {{ $t("auth.sessionExpired") }}
        </div>
      </div>
      <AuthLogin v-if="!route.query.signup"></AuthLogin>
      <AuthSignup v-else></AuthSignup>
      <p class="mt-6 text-sm text-center text-[#B5BAC1]">
        {{ $t("auth.dontHaveAccount") }}
        <NuxtLink
          :to="{ query: route.query.signup ? {} : { signup: 'true' } }"
          class="text-[--secondary-color] font-medium hover:underline"
        >
          {{ route.query.signup ? $t("auth.login") : $t("auth.signup") }}
        </NuxtLink>
      </p>
      <!-- <div class="mt-8 pt-6 border-t border-border">
          <h3 class="text-lg font-semibold mb-2">{{ $t("auth.demoUsers") }}</h3>
          <p class="text-text opacity-80 mb-4">
            {{ $t("auth.demoUsersDescription") }}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              class="btn bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
              @click="loginAs('admin@example.com', 'admin123')"
              :disabled="isLoading"
            >
              {{ $t("auth.loginAsAdmin") }}
            </button>

            <button
              class="btn bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
              @click="loginAs('manager@example.com', 'manager123')"
              :disabled="isLoading"
            >
              {{ $t("auth.loginAsManager") }}
            </button>

            <button
              class="btn bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
              @click="loginAs('user@example.com', 'user123')"
              :disabled="isLoading"
            >
              {{ $t("auth.loginAsUser") }}
            </button>

            <button
              class="btn bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
              @click="loginAs('guest@example.com', 'guest123')"
              :disabled="isLoading"
            >
              {{ $t("auth.loginAsGuest") }}
            </button>
          </div>
        </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
// Form state
const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);
const rememberMe = ref(false);
const sessionExpired = ref(false);
const redirectPath = ref("/");
// Check for query parameters on mount
onMounted(async () => {
  // Check if session expired
  if (route.query.expired === "true") {
    sessionExpired.value = true;
  }

  // Check if there's an error message
  if (route.query.error) {
    error.value = route.query.error as string;
  }

  // Check if there's a message
  if (route.query.message) {
    error.value = route.query.message as string;
  }

  // Check if there's a redirect path
  if (route.query.redirect) {
    redirectPath.value = route.query.redirect as string;
  }

  // Check if user is already logged in
  if (authStore.isAuthenticated) {
    router.push(redirectPath.value);
  }
});

// Handle login form submission
async function handleLogin() {
  if (isLoading.value) return;

  // error.value = "";
  sessionExpired.value = false;
  isLoading.value = true;

  // try {
  //   await authStore.login(email.value, password.value);
  //   router.push(redirectPath.value);
  // } catch (err: any) {
  //   // error.value = err.message || $i18n.t("auth.loginError");
  // } finally {
  //   isLoading.value = false;
  // }
}

// Login as a predefined user
async function loginAs(userEmail: string, userPassword: string) {
  email.value = userEmail;
  password.value = userPassword;
  await handleLogin();
}
</script>

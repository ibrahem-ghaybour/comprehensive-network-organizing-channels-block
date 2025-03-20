<template>
  <form @submit.prevent="handleLogin" class="space-y-6">
    <div class="h-7">
      <p class="text-primary">{{ authStore.message }}</p>
      <p class="text-danger">{{ authStore.error }}</p>
    </div>

    <UiInput
      v-model="email"
      :type-input="'email'"
      :label="$t('auth.email')"
      :forId="'emailLogin'"
    >
      <span
        v-if="email"
        :class="[formatEmail.valid ? 'text-primary' : 'text-danger', 'text-sm']"
      >
        {{ formatEmail.message }}
      </span>
    </UiInput>

    <UiInput
      v-model="password"
      :label="$t('auth.password')"
      :type-input="passwordType"
      :forId="'passwordLogin'"
    >
      <span
        class="absolute text-primary right-0 mt-1 me-2 cursor-pointer"
        @click="passwordType = passwordType === 'password' ? 'text' : 'password'"
      >
        <font-awesome-icon :icon="['fas',passwordType === 'password' ? 'eye-slash' : 'eye']" />
      </span>
      <span
        v-if="password"
        :class="[
          formatPassword.valid ? 'text-primary' : 'text-danger',
          'text-sm',
        ]"
      >
        {{ formatPassword.message }}
      </span>
    </UiInput>

    <div class="flex items-center justify-between">
      <label class="flex items-center">
        <input
          type="checkbox"
          v-model="rememberMe"
          class="rounded border-none bg-[#1E1F22] text-[--secondary-color] focus:ring-[--secondary-color]"
        />
        <span class="ml-2 text-sm text-[#B5BAC1]">{{
          $t("auth.rememberMe")
        }}</span>
      </label>
      <a href="#" class="text-sm text-[--secondary-color] hover:underline">
        {{ $t("auth.forgotPassword") }}
      </a>
    </div>

    <UiButton
      type="submit"
      class="w-full !text-center py-2"
      :color-button="'var(--secondary-color)'"
      :loading="authStore.isLoading"
    >
      <p class="text-center">{{ $t("auth.login") }}</p>
    </UiButton>
  </form>
</template>

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/stores/auth";
library.add(faEye,faEyeSlash);
const authStore = useAuthStore();
const rememberMe = ref(false);
const email = ref("");
const password = ref("");
const passwordType = ref("password");
const formatEmail = computed(() => validateEmail(email.value.trim()));
const formatPassword = computed(() => validatePassword(password.value.trim()));

const handleLogin = async () => {
  if (authStore.isLoading) return;
  // if (!formatEmail.value.valid || !formatPassword.value.valid) return;
  await authStore.authLogin(email.value, password.value);
};
</script>

<style lang="scss" scoped></style>

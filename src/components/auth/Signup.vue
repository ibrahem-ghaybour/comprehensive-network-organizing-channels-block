<template>
  <form @submit.prevent="handleLogin" class="space-y-6">
    <UiInput
      v-model="name"
      :for-id="'usernamecreateUser'"
      :label="'Username'"
      :forId="'usernameNewUser'"
    />
    <UiInput
      v-model="email"
      :for-id="'emailcreateUser'"
      :label="'Email'"
      :forId="'emailNewUser'"
      :type-input="'email'"
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
      :for-id="'passwordcreateUser'"
      :label="'Password'"
      :forId="'passwordNewUser'"
      :type-input="passwordType"
    >
      <span
        class="absolute !text-primary right-0 mt-1 me-2 cursor-pointer"
        @click="
          passwordType = passwordType === 'password' ? 'text' : 'password'
        "
      >
        <font-awesome-icon
          :icon="['fas', passwordType === 'password' ? 'eye-slash' : 'eye']"
        />
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
    <UiInput
      v-model="confirmPassword"
      :for-id="'confirmPasswordcreateUser'"
      :label="'Confirm Password'"
      :forId="'confirmPasswordNewUser'"
      :type-input="passwordType"
    >
      <span
        class="absolute !text-primary right-0 mt-1 me-2 cursor-pointer"
        @click="
          passwordType = passwordType === 'password' ? 'text' : 'password'
        "
      >
        <font-awesome-icon
          :icon="['fas', passwordType === 'password' ? 'eye-slash' : 'eye']"
        />
      </span>
      <span
        v-if="password"
        :class="[
          password === confirmPassword ? 'text-primary' : 'text-danger',
          'text-sm',
        ]"
      >
        {{
          password === confirmPassword
            ? $t("auth.passwordMatch")
            : $t("auth.passwordNotMatch")
        }}
      </span>
    </UiInput>

    <!--  :loading="authStore.isLoading" -->
    <UiButton
      type="submit"
      class="w-full !text-center py-2"
      :color-button="'var(--secondary-color)'"
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
library.add(faEye, faEyeSlash);
const authStore = useAuthStore();
const rememberMe = ref(false);
const email = ref("");
const password = ref("");
const passwordType = ref("password");
const name = ref("");
const confirmPassword = ref("");
const formatEmail = computed(() => validateEmail(email.value.trim()));
const formatPassword = computed(() => validatePassword(password.value.trim()));

const handleLogin = async () => {
  if (authStore.isLoading) return;
  if (
    !formatEmail.value.valid ||
    !formatPassword.value.valid ||
    password.value !== confirmPassword.value
  )
    return;
  await authStore.authSignup({
    email: email.value,
    password: password.value,
    name: name.value,
  });
  if (authStore.isAuthenticated) {
    await navigateTo("/");
  }
};
</script>

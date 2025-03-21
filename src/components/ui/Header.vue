<template>
  <header
    :class="classParent"
    class="fixed-header h-[60px] bg-background-card border-b border-border shadow-sm flex items-center w-full !z-40"
  >
    <div class="flex px-4 justify-between items-center w-full">
      <div class="flex items-center gap-4">
        <slot name="left"></slot>
        <h2>Ibrahim</h2>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <span class="text-sm md:text-base font-medium">{{
            authStore?.userName
          }}</span>
          <button
            v-if="authStore?.userName"
            class="bg-transparent border-none text-primary text-xs md:text-sm px-2 py-1 rounded hover:bg-gray-light cursor-pointer"
            @click="shPopup = true"
          >
            {{ $t("auth.logout") }}
          </button>
        </div>

        <!-- Language Selector -->
        <LanguageSelector />

        <!-- Theme Toggle -->
        <ThemeToggle class="ml-0 md:ml-4" />
      </div>
    </div>
  </header>
  <UiPopup v-model:isOpen="shPopup">
    <div class="text-center">
      <h3 class="text-lg font-semibold mb-4">{{ $t("auth.logout") }}</h3>
      <p class="text-sm text-gray-600">
        {{ $t("auth.logoutConfirmation") }}
      </p>
      <div class="flex justify-center mt-4">
        <UiButton @click="logout">
          {{ $t("auth.logout") }}
        </UiButton>
      </div>
    </div>
  </UiPopup>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import ThemeToggle from "~/components/ui/ThemeToggle.vue";
import LanguageSelector from "~/components/ui/LanguageSelector.vue";

const router = useRouter();
const authStore = useAuthStore();
// const { init } = useThemeStore();
const props = defineProps({
  classParent: {
    type: String,
    default: "",
  },
});
const shPopup = ref(false);
async function logout() {
  authStore.authLogout();
  router.push("/auth");
}
</script>

<style scoped>
.app-header {
  background-color: var(--card-background);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--heading-color);
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>

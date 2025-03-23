<script setup>
import { onMounted, ref, watch } from "vue";
// import { onClickOutside } from "@vueuse/core";

const STORAGE_KEY = "sidebar-is-open";

const isOpen = ref(false);
const sidebarRef = ref(null);

// Read saved state on mount
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  isOpen.value = saved === "true";
});

// Persist state whenever it changes
watch(isOpen, (val) => {
  localStorage.setItem(STORAGE_KEY, String(val));
});

// Toggle sidebar
const toggle = () => {
  isOpen.value = !isOpen.value;
};

// Optional: Close sidebar when clicking outside
// onClickOutside(sidebarRef, () => {
//   isOpen.value = false
// })

// Expose to parent
defineExpose({ toggle, isOpen });
</script>

<template>
  <div
    ref="sidebarRef"
    class="fixed top-0 left-0 h-dvh overflow-y-auto lg:w-64 w-full bg-background-card shadow-lg p-5 z-50 transition-all duration-300"
    :class="isOpen ? 'translate-x-0' : 'lg:-translate-x-64 -translate-x-full'"
  >
  <UiCloseButton class="hidden max-lg:block" @click="toggle" />
    <slot />
  </div>
</template>

<style scoped>
/* Add any extra styles you want here */
</style>

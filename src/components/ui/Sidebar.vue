<script setup>
import { onClickOutside } from "@vueuse/core";

const isOpen = ref(false);
const sidebarRef = ref(null);

// Toggle sidebar
const toggle = () => {
  isOpen.value = !isOpen.value;
};

// Close sidebar when clicking outside
// onClickOutside(sidebarRef, () => {
//   isOpen.value = false;
// });

// Expose toggle function so parent can control the sidebar
defineExpose({ toggle, isOpen });
</script>

<template>
  <div
    ref="sidebarRef"
    class="fixed top-0 left-0 h-full w-64 bg-background-card shadow-lg p-5 z-50 transition-all duration-300"
    :class="isOpen ? 'translate-x-0' : ' -translate-x-64'"
  >
    <div>
      <slot></slot>
      <!-- Sidebar content -->
    </div>
  </div>
</template>

<style scoped>
/* Smooth width transition */
</style>

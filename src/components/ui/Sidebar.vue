<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";

// Props
const props = defineProps({
  direction: {
    type: String as () => "left" | "right",
    default: "left",
  },
  storageId: {
    type: String,
    default: "default",
  },
  classParent: {
    type: String,
    default: "",
  },
});

// Dynamic keys based on storageId
const STORAGE_KEY = computed(() => `sidebar-is-open-${props.storageId}`);
const WIDTH_KEY = computed(() => `sidebar-width-${props.storageId}`);

// Reactive state
const isOpen = ref(false);
const sidebarWidth = ref(250);
const isResizing = ref(false);
const sidebarRef = ref<HTMLElement | null>(null);
const isDesktop = ref(false);

// Init on mount
onMounted(() => {
  isOpen.value = localStorage.getItem(STORAGE_KEY.value) === "true";
  const savedWidth = localStorage.getItem(WIDTH_KEY.value);
  if (savedWidth) sidebarWidth.value = Number(savedWidth);

  const mediaQuery = window.matchMedia("(min-width: 1024px)");
  isDesktop.value = mediaQuery.matches;
  mediaQuery.addEventListener("change", () => {
    isDesktop.value = mediaQuery.matches;
  });
});

// Persist to localStorage
watch(isOpen, (val) => {
  localStorage.setItem(STORAGE_KEY.value, String(val));
});
watch(sidebarWidth, (val) => {
  localStorage.setItem(WIDTH_KEY.value, String(val));
});

// Resize logic
const toggle = () => {
  isOpen.value = !isOpen.value;
};

const startResize = (e: MouseEvent) => {
  if (!isDesktop.value) return;
  isResizing.value = true;
  window.addEventListener("mousemove", resizeSidebar);
  window.addEventListener("mouseup", stopResize);
};

const resizeSidebar = (e: MouseEvent) => {
  if (!isResizing.value || !sidebarRef.value) return;

  const sidebarRect = sidebarRef.value.getBoundingClientRect();
  let newWidth = 250;

  if (props.direction === "left") {
    newWidth = e.clientX - sidebarRect.left;
  } else {
    newWidth = sidebarRect.right - e.clientX;
  }

  sidebarWidth.value = Math.min(Math.max(newWidth, 180), 500);
};

const stopResize = () => {
  isResizing.value = false;
  window.removeEventListener("mousemove", resizeSidebar);
  window.removeEventListener("mouseup", stopResize);
};

// Expose for parent
defineExpose({ toggle, isOpen });
</script>

<template>
  <div
    ref="sidebarRef"
    v-show="isOpen"
    class="h-dvh px-3 rounded-t-xl overflow-y-auto bg-background-card shadow-lg transition-all duration-300 !select-none max-lg:!w-full min-w-[180px] lg:max-w-[500px]"
    :class="[
      isDesktop ? 'relative' : 'fixed top-0 z-50',
      direction === 'right' ? 'right-0' : 'left-0',
      classParent,
    ]"
    :style="{ width: isDesktop ? sidebarWidth + 'px' : undefined }"
  >
    <!-- Resize Handle -->
    <div
      v-if="isDesktop"
      class="absolute top-0 h-full w-1 cursor-col-resize hover:bg-gray-600 transition"
      :class="[props.direction === 'left' ? 'right-0' : 'left-0']"
      @mousedown="startResize"
    />

    <!-- Mobile Close -->
    <UiCloseButton class="hidden max-lg:block" @click="toggle" />

    <!-- Slot Content -->
    <slot />
  </div>
</template>

<style scoped>
* {
  user-select: none;
}
</style>

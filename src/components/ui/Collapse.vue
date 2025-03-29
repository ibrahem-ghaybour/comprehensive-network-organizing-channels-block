<template>
<Transition name="fade">
  <div
    v-if="show"
    class="lg:w-[20rem] max-sm:absolute start-0 top-0 sm:w-[15rem] h-dvh w-full bg-sidebar overflow-y-auto"
    @scroll="handleScroll"
    ref="sidebarRef"
  >
    <div
      :class="[
        'p-2 w-full bg-sidebar flex items-end font-bold h-[50px] overflow-hidden transition-all',
        isSticky ? 'fixed top-10 z-10 !bg-green-600' : 'relative',
      ]"
    >
      <slot name="header"></slot>
      <UiCloseButton
        @click="emit('close')"
        class="absolute end-2 top-1 text-base"
      />
      <slot></slot>
    </div>
  </div>
</Transition>

</template>

<script setup>
const emit = defineEmits(["close"]);
const props = defineProps({
  show: Boolean,
});

const sidebarRef = ref<HTMLElement | null>(null);
const isSticky = ref(false);

const handleScroll = () => {
  if (!sidebarRef.value) return;
  const scrollTop = sidebarRef.value.scrollTop;
  isSticky.value = scrollTop > 100; // Change `100` to your desired trigger height
};

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateX(2.5rem);
}
</style>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="lg:w-[20rem] max-sm:absolute start-0 top-0 sm:w-[15rem] h-dvh w-full bg-sidebar"
    >
      <div
        class="p-2 w-full relative bg-sidebar flex items-end font-bold h-[50px] overflow-hidden"
      >
        <slot name="header"></slot>
        <UiCloseButton
          @click="emit('close')"
          class="absolute end-2 top-1 text-base"
        />
      </div>
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup>
const emit = defineEmits(["close"]);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateX(-2.5rem); ;
}
</style>

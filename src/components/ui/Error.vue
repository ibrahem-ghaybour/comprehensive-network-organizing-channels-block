<template>
  <div
    class="!text-[12px] z-50 fixed bottom-4 w-[calc(100%-22rem)] !text-white -translate-x-1/2 left-[50%] bg-[#80332D] bg-opacity-80 flex flex-wrap gap-3 items-center justify-between p-3 rounded-sm"
  >
    <p class="text-sm">{{ errorMessages }}</p>
    <div class="flex gap-2">
      <button
        type="button"
        @click="emit('reset')"
        class="transition hover:border-b"
      >
        Reset
      </button>
      <UiButton
        :color-button="'var(--primary-color)'"
        type="button"
        @click="emit('restart')"
        >Restart
      </UiButton>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["reset", "restart"]);
const props = defineProps({
  errorMessages: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="!text-[12px] bg-background-card flex items-center justify-between p-3 rounded-sm"
  >
    <p class="text-sm">Careful - you have unsaved changes!</p>
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
        @click="emit('save')"
        >Save Changes
      </UiButton>
      <!-- <button
        type="button"
        @click="emit('save')"
        class="bg-[#248045] px-2 py-2 rounded-md hover:bg-green-700 transition"
      >
        Save Changes
      </button> -->
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["reset", "save"]);
</script>

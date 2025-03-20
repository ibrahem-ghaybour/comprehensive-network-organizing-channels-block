<template>
  <div class="w-full relative">
    <label class="block w-full mb-1 font-semibold !text-[0.7rem]" :for="forId">
      {{ label }}
    </label>
    <input
      class="bg-gray-dark py-1 px-2 rounded-sm w-full"
      :id="forId"
      :type="typeInput"
      :maxlength="`${typeInput === 'text' ? '30' : '124'}`"
      minlength="3"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  typeInput: {
    type: String,
    default: "text",
  },
  forId: String,
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped></style>

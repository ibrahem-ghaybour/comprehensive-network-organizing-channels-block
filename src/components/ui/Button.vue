<template>
  <button
    class="relative flex items-center px-4 py-1 overflow-hidden font-medium transition-all rounded-sm group"
    :style="`background: ${colorButton}`"
  >
    <span
      class="absolute span1 top-0 right-0 bg-[#393c41] !bg-opacity-50 inline-block w-4 h-4 transition-all duration-500 ease-in-out rounded group-hover:-mr-4 group-hover:-mt-4"
    >
      <span
        class="absolute bg-sidebar top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2"
      ></span>
    </span>
    <span
      class="absolute span2 bottom-0 rotate-180 bg-[#393c41] !bg-opacity-50 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out rounded group-hover:-ml-4 group-hover:-mb-4"
    >
      <span
        class="absolute top-0 bg-sidebar right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2"
      ></span>
    </span>
    <span
      class="absolute bottom-0 bg-[#393c41] bg-opacity-50 left-0 group-hover:!bg-opacity-10 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full rounded-sm group-hover:translate-x-0"
    ></span>
    <div
      class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white flex items-center justify-center"
    >
      <slot v-if="!loading"></slot>
      <div
        v-else
        class="flex-col gap-4 w-full flex items-center justify-center"
      >
        <div
          class="w-6 h-6 border-4 border-transparent text-4xl animate-spin flex items-center justify-center border-t-[--primary-light-color] rounded-full"
        >
          <div
            class="w-5 h-5 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
          ></div>
        </div>
      </div>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  colorButton: {
    type: String,
    default: "#248046cc",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>

<template>
  <span>{{ relativeTimeString }}</span>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Enable the relativeTime plugin
dayjs.extend(relativeTime);
const props = defineProps<{
  time: string;
}>();

const relativeTimeString = computed(() => dayjs(props.time).fromNow());
</script>

<style lang="scss" scoped></style>

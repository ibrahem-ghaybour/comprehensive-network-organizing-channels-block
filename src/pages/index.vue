<script setup>
const route = useRoute();
const sectionEdit = ref(false);
onMounted(() => {
  if (route.query.edit === "true") {
    sectionEdit.value = true;
  }
});
watch(
  () => route.query.edit,
  (newVal) => {
    if (newVal === "true") {
      sectionEdit.value = true;
    } else {
      sectionEdit.value = false;
    }
  }
);
</script>

<template>
  <div class="flex flex-col min-h-dvh bg-background">
    <Transition name="change" mode="out-in">
      <ChannelEdit v-if="sectionEdit" :channel-id="route?.query?.id" />
    </Transition>
    <p></p>
  </div>
</template>

<style scoped>
.change-enter-active,
.change-leave-active {
  transition: all 0.2s ease;
}
.change-enter-from,
.change-leave-to {
  transform: translateY(30px);
  opacity:0;
}
</style>

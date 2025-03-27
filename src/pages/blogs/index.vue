<script setup>
// import { useChannelStore } from "~/stores/channels";
// const route = useRoute();
// const useChannels = useChannelStore();
// const sectionEdit = ref(false);

// watch(
//   () => route.query.edit,
//   (newVal) => {
//     if (newVal === "true") {
//       sectionEdit.value = true;
//     } else {
//       sectionEdit.value = false;
//     }
//   },
//   { immediate: true }
// );
</script>

<template>
  <div class="flex flex-col min-h-dvh bg-background">
    <!-- <Transition name="change" mode="out-in">
      <ChannelEdit v-if="sectionEdit" :channel-id="route?.query?.id" />
    </Transition>
    <Transition name="error">
      <Teleport to="body">
        <UiError
          v-if="useChannels.error"
          :error-messages="useChannels.error"
          @restart="
            useChannels.channels = [];
            useChannels.fetchChannels();
          "
          @reset="useChannels.error = null"
        ></UiError>
      </Teleport>
    </Transition> -->
  </div>
</template>

<style scoped>
/* .change-enter-active,
.change-leave-active {
  transition: all 0.2s ease;
}
.change-enter-from,
.change-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
.error-enter-active,
.error-leave-active {
  transition: all 0.2s ease;
}
.error-enter-from,
.error-leave-to {
  bottom: -30px;
  opacity: 0;
} */
</style>

<template>
  <div class="p-5 w-full relative h-[90vh]">
    <h2 class="mb-3 text-xl">Overview</h2>

    <fieldset class="">
      <legend class="sr-only">Channel Settings</legend>
      <CoreInput
        class="pb-10"
        v-model="updateDataChannel.name"
        :label="'CHANNEL NAME'"
        aria-label="Channel Name"
      />

      <div class="w-full pt-5 border-t border-t-[#dbdee16f]">
        <label for="channelTopic" class="mb-1 !text-[0.7rem] block"
          >CHANNEL TOPIC</label
        >
        <textarea
          id="channelTopic"
          v-model="updateDataChannel.topic"
          class="w-full"
          rows="3"
          maxlength="1024"
          placeholder="Let everyone know how to use this channel!"
          aria-label="Channel Topic"
        ></textarea>
      </div>
      <div class="w-full pt-6">
        <span class="text-[0.7rem]">SECLECT ICONS</span>
        <CoreSelectIcon @select="select" />
      </div>
    </fieldset>
    <Transition name="change" mode="out-in">
      <ChannelSaveEdit
        v-if="showSaveChange"
        class="absolute w-[calc(100%-2.5rem)] bottom-0"
        @reset="showSaveChange = false"
        @save="saveChannel"
    /></Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  groupId: {
    type: String,
    default: "",
  },
});
const { updateGroup, getGroupById } = useGroupStore();
const showSaveChange = ref(false);
const updateDataChannel = ref({});
const saveChannel = () => {
  updateGroup(props.groupId, updateDataChannel.value);
  showSaveChange.value = false;
};
const select = (val) => {
  updateDataChannel.value.icon = val;
};

watchEffect(() => {
  const group = getGroupById(props.groupId);
  if (group) {
    updateDataChannel.value = { ...group };
  }
});
watch(
  updateDataChannel,
  (newVal, oldVal) => {
    if (oldVal != newVal) return;
    showSaveChange.value = true;
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.change-enter-active,
.change-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.change-enter-from,
.change-leave-to {
  opacity: 0;
  transform: scale(1.5);
}

.change-enter-to,
.change-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>

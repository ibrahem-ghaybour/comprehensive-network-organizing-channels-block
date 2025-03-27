<template>
  <div class="p-5 w-full relative">
    <h2 class="mb-3 text-xl">
      Overview
      <UiCloseButton @click="router.push('?')" />
    </h2>
    <fieldset class="">
      <legend class="sr-only">Channel Settings</legend>
      <UiInput
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
          v-model="updateDataChannel.description"
          class="w-full bg-gray-dark mt-2"
          rows="3"
          maxlength="1024"
          placeholder="Let everyone know how to use this channel!"
          aria-label="Channel Topic"
        ></textarea>
      </div>
      <div class="w-full py-6">
        <span class="text-[0.7rem]">SECLECT ICONS</span>
        <!-- <UiSelectIcon @select="select" /> -->
        <UiIcons @select-icon="select" />
      </div>
    </fieldset>
    <Transition name="change" mode="out-in">
      <ChannelSaveEdit
        v-if="showSaveChange"
        class="fixed w-[calc(100%-20rem)] bottom-6"
        @reset="showSaveChange = false"
        @save="saveChannel"
    /></Transition>
  </div>
</template>

<script setup>
import { useChannelStore } from "~/stores/channels";
import { useAuthStore } from "~/stores/auth";
const props = defineProps({
  channelId: {
    type: String,
    default: "",
  },
});

const useChannel = useChannelStore();
const useAuth = useAuthStore();
const showSaveChange = ref(false);
const router = useRouter();
const channel = computed(() => {
  return useChannel.getChannelById(props.channelId);
});
const updateDataChannel = ref({
  name: "",
  description: "",
  icon: "",
});
const select = (icon) => {
  updateDataChannel.value.icon = icon;
};
const saveChannel = () => {
  if (props.channelId === "") newChannel();
  else useChannel.updateChannel(props.channelId, updateDataChannel.value);
  router.push("?");
};
const newChannel = () => {
  useChannel.createChannel({
    ...updateDataChannel.value,
    userId: useAuth.currentUser._id,
  });
  console.log(updateDataChannel.value);
};
const skipWatch = ref(false);

watch(
  updateDataChannel,
  (newVal) => {
    if (skipWatch.value) return;
    newVal.name !== channel.value?.name ||
    newVal.description !== channel.value?.description ||
    newVal.icon !== channel.value?.icon
      ? (showSaveChange.value = true)
      : (showSaveChange.value = false);
  },
  { deep: true }
);

watch(
  () => props.channelId,
  (newVal) => {
    const group = useChannel.getChannelById(newVal);
    if (!group) {
      updateDataChannel.value = {};
    }
    skipWatch.value = true;
    updateDataChannel.value = { ...group };
    skipWatch.value = false;

    showSaveChange.value = false;
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>

</style>

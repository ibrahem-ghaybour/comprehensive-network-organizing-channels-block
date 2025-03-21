<template>
  <div>
    <ul>
      <li
        v-for="channel in useChannels.channels"
        :key="channel.id"
        class="relative group my-1 w-full hover:bg-[#404249] transition duration-200 flex !text-start rounded-[5px]"
      >
        <button
          class="w-full p-2 rounded-[5px] truncate"
          @click="useChannels.onChannelSelected(channel._id)"
        >
          {{ channel.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useChannelStore } from "~/stores/channels";
import { useAuthStore } from "~/stores/auth";
const useChannels = useChannelStore();
const useAuth = useAuthStore();
const route = useRoute();
// onMounted(() => {
//   if (useAuth.isAuthenticated) {
//     if (import.meta.client) useChannels.fetchChannels();
//   }
// });
watchEffect(() => {
  if (useAuth.isAuthenticated) {
    if (import.meta.client) useChannels.fetchChannels();
  }
});
</script>

<style lang="scss" scoped></style>

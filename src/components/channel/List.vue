<template>
  <div>
    <p class="text-sm my-2 border-b flex justify-between">
      <span>{{ $t("channels.newChannel") }}</span>
      <button
        @click="directing('/?edit=true')"
        class="transition duration-200 hover:bg-gray-light px-2 rounded-lg"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
    </p>
    <ul>
      <li
        v-for="channel in useChannels.channels"
        :key="channel.id"
        class="relative group my-1 w-full hover:bg-gray-light transition duration-200 flex items-center rounded-[5px]"
      >
        <button
          class="w-full group p-2 rounded-[5px] flex items-center justify-between capitalize truncate !text-start"
          @click="
            useChannels.onChannelSelected(channel._id);
            directing(`/${channel._id}`);
          "
        >
          <div class="w-full flex items-center gap-x-1">
            <span><UiIcon :icon="channel.icon" /></span>
            <span class="truncate">{{ channel.name }}</span>
          </div>
          <!-- Instead of hidden/flex, we animate opacity and position -->
          <div
            class="flex absolute right-1 gap-x-1 text-primary opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          >
            <span
              class=""
              @click.stop="directing(`?edit=true&id=${channel._id}`)"
            >
              <font-awesome-icon :icon="['fas', 'file-pen']" />
            </span>
            <span @click.stop="channelId = channel._id">
              <font-awesome-icon :icon="['fas', 'trash-can']" />
            </span>
          </div>
        </button>
      </li>
    </ul>
  </div>
  <UiPopup v-model:isOpen="channelId">
    <div class="text-center">
      <h3 class="mb-10">{{ $t("common.sureDelete") }}</h3>
      <div class="flex justify-center gap-x-2">
        <UiButton
          type="button"
          @click="channelId = null"
          :color-button="'var(--primary-color)'"
        >
          {{ $t("common.cancel") }}
        </UiButton>
        <UiButton
          type="button"
          @click="
            useChannels.deleteChannel(channelId);
            channelId = null;
          "
          :color-button="'var(--danger-color)'"
        >
          {{ $t("common.delete") }}
        </UiButton>
      </div>
    </div>
  </UiPopup>
</template>

<script setup>
import { useChannelStore } from "~/stores/channels";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFilePen,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
library.add(faFilePen, faTrashCan, faPlus);
const useChannels = useChannelStore();
const channelId = ref(false);
const router = useRouter();
const directing = (param) => {
  router.push(`${param}`);
};
</script>

<style lang="scss" scoped></style>

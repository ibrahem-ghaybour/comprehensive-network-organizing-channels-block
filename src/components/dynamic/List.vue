<template>
  <div class="relative">
    <UiShearchPar @search="search" class="mb-3 !w-full p-0">
      <template #icon>
        <font-awesome-icon :icon="['fas', 'people-group']" />
      </template>
    </UiShearchPar>
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
        :key="channel._id"
        class="relative group my-1 w-full hover:bg-gray-light transition duration-200 flex items-center rounded-[5px]"
      >
        <Transition name="channel" :key="channel._id" mode="out-in">
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
              v-royal="channel.userId"
              class="flex absolute right-1 gap-x-1 text-primary opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            >
              <span
                class=""
                @click.stop="directing(`?edit=true&id=${channel._id}`)"
              >
                <font-awesome-icon :icon="['fas', 'file-pen']" />
              </span>
              <span
                @click.stop="((channelId = channel._id), (isOpenPopup = true))"
              >
                <font-awesome-icon :icon="['fas', 'trash-can']" />
              </span>
            </div>
          </button>
        </Transition>
      </li>
    </ul>
  </div>
  <UiPopup v-model:isOpen="isOpenPopup">
    <div class="text-center">
      <h3 class="mb-10">{{ $t("common.sureDelete") }}</h3>
      <div class="flex justify-center gap-x-2">
        <UiButton
          type="button"
          @click="closePopup"
          :color-button="'var(--primary-color)'"
        >
          {{ $t("common.cancel") }}
        </UiButton>
        <UiButton
          type="button"
          @click="deleteChannel"
          :color-button="'var(--danger-color)'"
        >
          {{ $t("common.delete") }}
        </UiButton>
      </div>
    </div>
  </UiPopup>
  <Transition name="error" mode="out-in">
    <Teleport to="body">
      <UiError
        v-if="useChannels.error"
        :error-messages="useChannels.error"
        @reset="useChannels.error = null"
        @restart="useChannels.fetchChannels()"
      ></UiError>
    </Teleport>
  </Transition>
</template>

<script lang="ts" setup>
import { useChannelStore } from "~/stores/channels";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFilePen,
  faTrashCan,
  faPlus,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
library.add(faFilePen, faTrashCan, faPlus, faPeopleGroup);
const router = useRouter();
const useChannels = useChannelStore();
const channelId = ref<string | null>("");
const isOpenPopup = ref<boolean>(false);

const directing = (param: string) => {
  router.push(`${param}`);
};
const search = async (searchTerm: string) => {
  useChannels.filters.name = searchTerm;
  useChannels.fetchChannels();
};
const deleteChannel = () => {
  if (!channelId.value) return;
  useChannels.deleteChannel(channelId.value);
  channelId.value = null;
  isOpenPopup.value = false;
};
const closePopup = () => {
  isOpenPopup.value = false;
  channelId.value = null;
};
</script>

<style lang="scss" scoped>
.error-enter-active,
.error-leave-active {
  transition: all 0.2s ease;
}
.error-enter-from,
.error-leave-to {
  bottom: -30px;
  opacity: 0;
}
</style>

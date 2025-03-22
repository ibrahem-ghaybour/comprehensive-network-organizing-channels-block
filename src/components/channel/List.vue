<template>
  <div>
    <ul>
      <li
        v-for="channel in useChannels.channels"
        :key="channel.id"
        class="relative group my-1 w-full hover:bg-gray-light transition duration-200 flex items-center rounded-[5px]"
      >
        <button
          class="w-full group p-2 rounded-[5px] flex items-center justify-between capitalize truncate !text-start"
          @click="useChannels.onChannelSelected(channel._id)"
        >
          <span>{{ channel.name }}</span>
          <!-- Instead of hidden/flex, we animate opacity and position -->
          <div
            class="flex gap-x-1 text-primary opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          >
            <span @click.stop="editChannel(channel._id)">
              <font-awesome-icon :icon="['fas', 'file-pen']" />
            </span>
            <span>
              <font-awesome-icon :icon="['fas', 'trash-can']" />
            </span>
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useChannelStore } from "~/stores/channels";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFilePen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
library.add(faFilePen, faTrashCan);
const useChannels = useChannelStore();
const showEdit = ref(false);
const router = useRouter();
const editChannel = (id) => {
  router.push(`?edit=true&id=${id}`);
};
</script>

<style lang="scss" scoped></style>

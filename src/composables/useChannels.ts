import { ref } from "vue";
import { useChannelsApi } from "@/api/channels";
import type {
  Channel,
  ChannelFilters,
  PaginatedResponse,
  CreateChannelRequest,
  UpdateChannelRequest,
} from "~/types/channel";

export function useChannels() {
  const {
    fetchChannels,
    fetchChannelById,
    createChannel,
    updateChannel,
    deleteChannel,
  } = useChannelsApi();

  //  Reactive States
  const channels = ref<Channel[]>([]);
  const channel = ref<Channel | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch All Channels
  const loadChannels = async (filters: ChannelFilters) => {
    loading.value = true;
    error.value = null;

    const res = await fetchChannels(filters);

    if (res.error) {
      error.value = res.error;
    } else {
      channels.value = res.dataRes?.data || [];
    }

    loading.value = false;
  };

  //  Fetch Single Channel
  const loadChannelById = async (id: string) => {
    loading.value = true;
    error.value = null;

    const response = await fetchChannelById(id);

    if (response.error) {
      error.value = response.error;
    } else {
      channel.value = response.dataRes || null;
    }

    loading.value = false;
  };

  //  Create a Channel
  const addChannel = async (data: CreateChannelRequest) => {
    loading.value = true;
    error.value = null;

    const response = await createChannel(data);

    if (response.error) {
      error.value = response.error;
    } else {
      channels.value.push(response.dataRes!);
    }

    loading.value = false;
  };

  //  Update a Channel
  const editChannel = async (id: string, data: UpdateChannelRequest) => {
    loading.value = true;
    error.value = null;

    const response = await updateChannel(id, data);

    if (response.error) {
      error.value = response.error;
    } else {
      const index = channels.value.findIndex((ch) => ch._id === id);
      if (index !== -1) {
        channels.value[index] = response.dataRes!;
      }
    }

    loading.value = false;
  };

  // Delete a Channel
  const removeChannel = async (id: string) => {
    loading.value = true;
    error.value = null;

    const response = await deleteChannel(id);

    if (response.error) {
      error.value = response.error;
    } else {
      channels.value = channels.value.filter((ch) => ch._id !== id);
    }

    loading.value = false;
  };

  return {
    channels,
    channel,
    loading,
    error,
    loadChannels,
    loadChannelById,
    addChannel,
    editChannel,
    removeChannel,
  };
}

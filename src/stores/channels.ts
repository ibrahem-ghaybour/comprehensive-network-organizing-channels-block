import { defineStore } from "pinia";
import { useChannelsApi } from "~/api/channels"; // Import your API
import type {
  Channel,
  ChannelFilters,
  CreateChannelRequest,
  UpdateChannelRequest,
} from "~/types/channel";

export const useChannelStore = defineStore(
  "channels",
  () => {
    if (import.meta.server) return; // Prevent SSR
    const api = useChannelsApi();
    // State: Stores channels and loading status
    const channels = ref<Channel[]>([]);
    const totalChannels = ref<number>(0);
    const loading = ref<boolean>(false);
    const selectedChannel = ref<Channel | null>(null);
    const error = ref<string | null>(null);

    // Fetch all channels
    const fetchChannels = async (params: ChannelFilters) => {
      if (channels.value.length > 0) return; // Use cached data, prevent unnecessary
      try {
        loading.value = true;
        const { res: response, error: errorChannel } =
          await api.fetchChannels(params);
        if (errorChannel) {
          error.value = errorChannel;
          throw new Error(
            errorChannel
              ? errorChannel
              : "An error occurred while fetching channels"
          );
        }

        channels.value = response.data;
        console.log(response);
        totalChannels.value = response.total;
      } catch (error) {
        console.error("Error fetching channels:", error);
      } finally {
        loading.value = false;
      }
    };

    // Fetch a single channel by ID
    const fetchChannelById = async (id: string) => {
      try {
        loading.value = true;
        const { res: channelSe, error: errorChannel } =
          await api.fetchChannelById(id);
        if (errorChannel) {
          error.value = errorChannel;
          throw new Error(
            errorChannel
              ? errorChannel
              : "An error occurred while fetching channel"
          );
        }

        selectedChannel.value = channelSe;
      } catch (error) {
        console.error("Error fetching channel:", error);
      } finally {
        loading.value = false;
      }
    };
    const onChannelSelected = (id: string) => {
      selectedChannel.value =
        channels.value.find((ch) => ch._id === id) || null;
    };
    // Create a new channel
    const createChannel = async (data: CreateChannelRequest) => {
      try {
        loading.value = true;
        const { res: newChannel, error: errorChannel } =
          await api.createChannel(data);
        if (errorChannel) {
          error.value = errorChannel;
          throw new Error(
            errorChannel
              ? errorChannel
              : "An error occurred while creating channel"
          );
        }
        channels.value.push(newChannel); // Add to local state
      } catch (error) {
        console.error("Error creating channel:", error);
      } finally {
        loading.value = false;
      }
    };

    // Update an existing channel
    const updateChannel = async (id: string, data: UpdateChannelRequest) => {
      try {
        loading.value = true;
        const { res: updatedChannel, error: errorChannel } =
          await api.updateChannel(id, data);
        if (errorChannel) {
          error.value = errorChannel;
          throw new Error(
            errorChannel
              ? errorChannel
              : "An error occurred while updating channel"
          );
        }
        const index = channels.value.findIndex((ch) => ch._id === id);
        if (index !== -1) channels.value[index] = updatedChannel; // Update local state
      } catch (error) {
        console.error("Error updating channel:", error);
      } finally {
        loading.value = false;
      }
    };

    // Delete a channel
    const deleteChannel = async (id: string) => {
      try {
        loading.value = true;
        const { error: errorChannel } = await api.deleteChannel(id);
        if (errorChannel) {
          error.value = errorChannel;
          throw new Error(
            errorChannel
              ? errorChannel
              : "An error occurred while deleting channel"
          );
        }
        channels.value = channels.value.filter((ch) => ch._id !== id); // Remove from state
      } catch (error) {
        console.error("Error deleting channel:", error);
      } finally {
        loading.value = false;
      }
    };
    const clearSectionChannels = () => {
      selectedChannel.value = null;
      channels.value = [];
      totalChannels.value = 0;
    };
    return {
      channels,
      totalChannels,
      selectedChannel,
      loading,
      fetchChannels,
      fetchChannelById,
      createChannel,
      updateChannel,
      deleteChannel,
      onChannelSelected,
      clearSectionChannels,
    };
  },
  {
    persist: {
      storage: import.meta.client ? sessionStorage : undefined,
    },
  }
);

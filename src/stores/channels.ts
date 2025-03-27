import { defineStore } from "pinia";
import { useChannelsApi } from "~/api/channels"; // Import your API
import { useAuthStore } from "@/stores/auth";
import type {
  Channel,
  ChannelFilters,
  CreateChannelRequest,
  UpdateChannelRequest,
} from "~/types/channel";

export const useChannelStore = defineStore(
  "channel",
  () => {
    // if (import.meta.server) return; // Prevent SSR
    const api = useChannelsApi();
    const useAuth = useAuthStore();
    // State: Stores channels and isLoading status
    const channels = ref<Channel[]>([]);
    const totalChannels = ref<number>(0);
    const isLoading = ref<boolean>(false);
    const selectedChannel = ref<Channel | null>(null);
    const error = ref<string | null>(null);

    // Methods
    // Fetch all channels
    const fetchChannels = async (params: ChannelFilters) => {
      if (channels.value.length > 0) return; // Use cached data, prevent unnecessary
      try {
        isLoading.value = true;
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
        isLoading.value = false;
      }
    };

    // Fetch a single channel by ID
    const fetchChannelById = async (id: string) => {
      try {
        isLoading.value = true;
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
        isLoading.value = false;
      }
    };
    const onChannelSelected = (id: string) => {
      selectedChannel.value =
        channels.value.find((ch) => ch._id === id) || null;
    };
    // Create a new channel
    const createChannel = async (data: CreateChannelRequest) => {
      try {
        isLoading.value = true;
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
        isLoading.value = false;
      }
    };

    // Update an existing channel
    const updateChannel = async (id: string, data: UpdateChannelRequest) => {
      try {
        isLoading.value = true;
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
        isLoading.value = false;
      }
    };

    // Delete a channel
    const deleteChannel = async (id: string) => {
      try {
        isLoading.value = true;
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
        isLoading.value = false;
      }
    };
    const clearSectionChannels = () => {
      selectedChannel.value = null;
      channels.value = [];
      totalChannels.value = 0;
      console.log("Cleared channels", channels.value);
    };
    const getChannelById = (id: string) =>
      channels.value.find((ch) => ch._id === id) || null;

    watch(
      () => useAuth.isAuthenticated,
      (isAuth) => {
        if (!isAuth) {
          clearSectionChannels();
        }
        fetchChannels({ pageSize: 15, page: 1 });
      },
      { immediate: true } // So it also runs on first load
    );
    return {
      channels,
      totalChannels,
      selectedChannel,
      isLoading,
      error,
      getChannelById,
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
      storage: sessionStorage as any,
      pick: ["channels", "selectedChannel"],
    },
  }
);

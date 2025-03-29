import { defineStore } from "pinia";
import { useChannelsApi } from "~/api/channels"; // Import your API
import { useAuthStore } from "@/stores/auth";
import { useBlogsStore } from "@/stores/blogs";
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
    const useBlogs = useBlogsStore();
    // State: Stores channels and isLoading status
    const channels = ref<Channel[]>([]);
    const totalChannels = ref<number>(0);
    const isLoading = ref<boolean>(false);
    const selectedChannel = ref<Channel | null>(null);
    const error = ref<string | null>(null);
    const filters = ref<ChannelFilters>({});
    const sortBy = ref<string | undefined>(undefined);
    const sortDirection = ref<SortDirection>("asc");
    const pagination = ref({
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0,
    });

    // Methods
    // Fetch all channels
    const fetchChannels = async () => {
      // if (channels.value.length > 0) return;
      isLoading.value = true;
      error.value = null;
      try {
        const queryParams: Record<string, string> = {
          pageSize: pagination.value.pageSize.toString(),
          page: pagination.value.page.toString(),
        };
        if (filters.value.name) queryParams.search = filters.value.name;
        if (filters.value.description)
          queryParams.search = filters.value.description;
        const { res: response, error: errorChannel } =
          await api.fetchChannels(queryParams);
        if (errorChannel) {
          error.value = errorChannel;
          throw new Error(
            errorChannel
              ? errorChannel
              : "An error occurred while fetching channels"
          );
        }
        console.log(response.data);
        channels.value = sortList<Channel>(
          response.data,
          sortBy.value,
          sortDirection.value
        );
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
      const channel = channels.value.find((ch) => ch._id === id) || null;
      if (!channel) {
        throw new Error("Channel not found");
      }
      useBlogs.selectedBlog = null;
      useBlogs.filters = {};
      selectedChannel.value = channel;
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
    };
    const getChannelById = (id: string) =>
      channels.value.find((ch) => ch._id === id) || null;

    watch(
      () => useAuth.isAuthenticated,
      (isAuth) => {
        if (!isAuth) {
          clearSectionChannels();
        }
        fetchChannels();
      },
      { immediate: true } // So it also runs on first load
    );
    return {
      channels,
      totalChannels,
      selectedChannel,
      isLoading,
      filters,
      pagination,
      sortBy,
      sortDirection,
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
      pick: ["selectedChannel"],
    },
  }
);

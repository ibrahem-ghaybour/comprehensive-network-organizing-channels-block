import { defineStore } from "pinia";
import { useChannelsApi } from "@/api/channels";
import type { Channel, ChannelFilters } from "~/types/channel";

export const useChannelStore = defineStore("chanssnels", {
  state: () => ({
    channels: [] as Channel[],
    channel: null as Channel | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchChannels(filters: ChannelFilters) {
      if (this.channels.length > 0) return; // Use cached data, prevent unnecessary API calls

      this.loading = true;
      this.error = null;
      const { fetchChannels } = useChannelsApi();
      const response = await fetchChannels(filters);

      if (response.error) {
        this.error = response.error;
      } else {
        this.channels = response.dataRes.data || [];
      }

      this.loading = false;
    },

    async fetchChannel(id: string) {
      if (this.channel?._id === id) return; // Use cached data if already available

      this.loading = true;
      this.error = null;
      const { fetchChannelById } = useChannelsApi();
      const response = await fetchChannelById(id);

      if (response.error) {
        this.error = response.error;
      } else {
        this.channel = response.dataRes || null;
      }

      this.loading = false;
    },
  },

  // ✅ Enable Caching & SSR Support
  persist: {
    storage: import.meta.client ? sessionStorage : undefined,
  },
});

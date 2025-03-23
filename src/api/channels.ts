import { apiRequest } from "~/api/request";
import type { ChannelFilters } from "~/types/channel";
import type {
  Channel,
  CreateChannelRequest,
  PaginatedResponse,
  UpdateChannelRequest,
} from "~/types/channel";

export function useChannelsApi() {
  return {
    fetchChannels: async (params: ChannelFilters) =>
      await apiRequest<PaginatedResponse<Channel>>({
        endpoint: "groups",
        method: "GET",
        params,
        requireAuth: true,
      }),

    fetchChannelById: async (id: string) =>
      await apiRequest<Channel>({ endpoint: `groups/${id}`, method: "GET" }),

    createChannel: async (data: CreateChannelRequest) =>
      await apiRequest<Channel>({
        endpoint: "groups",
        method: "POST",
        body: data,
        requireAuth: true,
      }),

    updateChannel: async (id: string, data: UpdateChannelRequest) =>
      await apiRequest<Channel>({
        endpoint: `groups/${id}`,
        method: "PATCH",
        body: data,
        requireAuth: true,
      }),

    deleteChannel: async (id: string) =>
      await apiRequest<void>({
        endpoint: `groups/${id}`,
        method: "DELETE",
        requireAuth: true,
      }),
  };
}

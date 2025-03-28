import { apiRequest } from "~/api/request";
import type {
  Blog,
  CreateBlogRequest,
  PaginatedResponse,
  UpdateBlogRequest,
  BlogFilters,
} from "~/types/blogs";

export function useBlogsApi() {
  return {
    fetchBlogs: async (params: Record<string, string>) =>
      apiRequest<PaginatedResponse<Blog>>({
        endpoint: "blogs",
        method: "GET",
        params,
        requireAuth: true,
      }),
    fetchBlogsByChannelId: async (
      channelId: string,
      params: Record<string, string>
    ) =>
      apiRequest<PaginatedResponse<Blog>>({
        endpoint: `blogs/group/${channelId}`,
        method: "GET",
        requireAuth: true,
        params,
      }),
    fetchBlogById: async (id: string, params?: BlogFilters) =>
      apiRequest<Blog>({
        endpoint: `blogs/${id}`,
        method: "GET",
        params,
        requireAuth: true,
      }),

    createBlog: async (data: CreateBlogRequest) =>
      apiRequest<Blog>({
        endpoint: "blogs",
        method: "POST",
        body: data,
        requireAuth: true,
      }),

    updateBlog: async (id: string, data: UpdateBlogRequest) =>
      apiRequest<Blog>({
        endpoint: `blogs/${id}`,
        method: "PATCH",
        body: data,
        requireAuth: true,
      }),

    deleteBlog: async (id: string) =>
      apiRequest<void>({
        endpoint: `blogs/${id}`,
        method: "DELETE",
        requireAuth: true,
      }),
  };
}

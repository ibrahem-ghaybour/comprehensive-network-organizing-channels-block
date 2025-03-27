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
    fetchBlogs: async (params: BlogFilters) =>
      await apiRequest<PaginatedResponse<Blog>>({
        endpoint: "blogs",
        method: "GET",
        params,
        requireAuth: true,
      }),
    fetchBlogsByChannelId: async (channelId: string) =>
      await apiRequest<Blog[]>({
        endpoint: `blogs/group/${channelId}`,
        method: "GET",
        requireAuth: true,
      }),
    fetchBlogById: async (id: string) =>
      await apiRequest<Blog>({
        endpoint: `blogs/${id}`,
        method: "GET",
        requireAuth: true,
      }),

    createBlog: async (data: CreateBlogRequest) =>
      await apiRequest<Blog>({
        endpoint: "blogs",
        method: "POST",
        body: data,
        requireAuth: true,
      }),

    updateBlog: async (id: string, data: UpdateBlogRequest) =>
      await apiRequest<Blog>({
        endpoint: `blogs/${id}`,
        method: "PATCH",
        body: data,
        requireAuth: true,
      }),

    deleteBlog: async (id: string) =>
      await apiRequest<void>({
        endpoint: `blogs/${id}`,
        method: "DELETE",
        requireAuth: true,
      }),
  };
}

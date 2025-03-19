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
      }),

    fetchBlogById: async (id: string) =>
      await apiRequest<Blog>({ endpoint: `blogs/${id}`, method: "GET" }),

    createBlog: async (data: CreateBlogRequest) =>
      await apiRequest<Blog>({
        endpoint: "channels",
        method: "POST",
        body: data,
      }),

    updateBlog: async (id: string, data: UpdateBlogRequest) =>
      await apiRequest<Blog>({
        endpoint: `blogs/${id}`,
        method: "PATCH",
        body: data,
      }),

    deleteBlog: async (id: string) =>
      await apiRequest<void>({ endpoint: `blogs/${id}`, method: "DELETE" }),
  };
}

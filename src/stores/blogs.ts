import { defineStore } from "pinia";
import type {
  Blog,
  CreateBlogRequest,
  PaginatedResponse,
  UpdateBlogRequest,
  BlogFilters,
} from "~/types/blogs";
import { useBlogsApi } from "~/api/blogs"; // adjust the import path as needed

export const useBlogsStore = defineStore(
  "blogs",
  () => {
    // State
    const blogs = ref<Blog[]>([]);
    const selectedBlog = ref<Blog | null>(null);
    const isLoading = ref(false);
    const error = ref<Error | null>(null);

    // Access the blogs API
    const api = useBlogsApi();

    // Actions
    async function fetchBlogs(filters: BlogFilters) {
      isLoading.value = true;
      error.value = null;
      try {
        const { res: response, error: err } = await api.fetchBlogs(filters);
        // Assuming response.data contains the blogs array
        blogs.value = response.data;
      } catch (err: any) {
        error.value = err;
      } finally {
        isLoading.value = false;
      }
    }

    async function fetchBlogsByIdChannelId(channelId: string) {
      // if (blogs.value.length > 0) return; // Use cached data, prevent unnecessary
      isLoading.value = true;
      error.value = null;
      try {
        const { res: response, error: err } =
          await api.fetchBlogsByChannelId(channelId);
        // Assuming response.data contains the blogs array
        blogs.value = response;
      } catch (err: any) {
        error.value = err;
      } finally {
        isLoading.value = false;
      }
    }

    async function fetchBlogById(id: string) {
      isLoading.value = true;
      error.value = null;
      try {
        const { res: blog, error: err } = await api.fetchBlogById(id);
        selectedBlog.value = blog;
      } catch (err: any) {
        error.value = err;
      } finally {
        isLoading.value = false;
      }
    }
    function onBlogSelected(id: string) {
      selectedBlog.value = blogs.value.find((blog) => blog._id === id);
    }
    async function createBlog(data: CreateBlogRequest) {
      isLoading.value = true;
      error.value = null;
      try {
        const { res: blog, error: err } = await api.createBlog(data);
        blogs.value.push(blog);
        return blog;
      } catch (err: any) {
        error.value = err;
      } finally {
        isLoading.value = false;
      }
    }

    async function updateBlog(id: string, data: UpdateBlogRequest) {
      isLoading.value = true;
      error.value = null;
      try {
        const { res: updatedBlog, error: err } = await api.updateBlog(id, data);
        const index = blogs.value.findIndex((blog) => blog._id === id);
        if (index !== -1) {
          blogs.value[index] = updatedBlog;
        }
        if (selectedBlog.value && selectedBlog.value._id === id) {
          selectedBlog.value = updatedBlog;
        }
        return updatedBlog;
      } catch (err: any) {
        error.value = err;
      } finally {
        isLoading.value = false;
      }
    }

    async function deleteBlog(id: string) {
      isLoading.value = true;
      error.value = null;
      try {
        await api.deleteBlog(id);
        blogs.value = blogs.value.filter((blog) => blog._id !== id);
        if (selectedBlog.value && selectedBlog.value._id === id) {
          selectedBlog.value = null;
        }
      } catch (err: any) {
        error.value = err;
      } finally {
        isLoading.value = false;
      }
    }

    // Getters (computed properties)
    const blogCount = computed(() => blogs.value.length);

    return {
      // State
      blogs,
      selectedBlog,
      isLoading,
      error,
      // Computed
      blogCount,
      // Actions
      fetchBlogsByIdChannelId,
      fetchBlogs,
      fetchBlogById,
      onBlogSelected,
      createBlog,
      updateBlog,
      deleteBlog,
    };
  }
  // {
  //   persist: {
  //     storage: sessionStorage as any,
  //     pick: ["blogs", "selectedBlog"],
  //   },
  // }
);

import { defineStore } from "pinia";
import type {
  Blog,
  CreateBlogRequest,
  UpdateBlogRequest,
  BlogFilters,
} from "~/types/blogs";
import { useBlogsApi } from "~/api/blogs"; // adjust the import path as needed
import { useActiveComponent } from "./activeComponent";

export const useBlogsStore = defineStore(
  "blogs",
  () => {
    // State
    const blogs = ref<Blog[]>([]);
    const selectedBlog = ref<Blog | null>(null);
    const isLoading = ref(false);
    const error = ref<Error | null>(null);
    const filters = ref<BlogFilters>({});
    const sortBy = ref<string | undefined>(undefined);
    const sortDirection = ref<SortDirection>("asc");
    const pagination = ref({
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0,
    });
    // Computed properties
    const totalBlogs = computed(() => pagination.value.total);
    const currentPage = computed(() => pagination.value.page);

    const totalPages = computed(() => pagination.value.totalPages);
    const hasNextPage = computed(() => currentPage.value < totalPages.value);
    const hasPreviousPage = computed(() => currentPage.value > 1);

    // Access the blogs API
    const api = useBlogsApi();
    const useActiveCom = useActiveComponent();
    // Actions
    async function fetchBlogs() {
      isLoading.value = true;
      error.value = null;
      try {
        const queryParams: Record<string, string> = {
          pageSize: pagination.value.pageSize.toString(),
          page: pagination.value.page.toString(),
        };
        // filters
        if (filters.value.title) queryParams.search = filters.value.title;
        if (filters.value.htmlText) queryParams.search = filters.value.htmlText;
        const { res: response, error: err_ } =
          await api.fetchBlogs(queryParams);
        // storting
        // Assuming response.data contains the blogs array
        if (err_) {
          throw new Error(err_);
        }
        blogs.value = sortList<Blog>(
          response.data,
          sortBy.value,
          sortDirection.value
        );
        pagination.value = response.pagination;
      } catch (err: any) {
        error.value = typeof err === "string" ? new Error(err) : err;
        blogs.value = [];
      } finally {
        isLoading.value = false;
      }
    }

    async function fetchBlogsByIdChannelId(channelId: string) {
      isLoading.value = true;
      error.value = null;
      try {
        const queryParams: Record<string, string> = {
          page: pagination.value.page.toString(),
          pageSize: pagination.value.pageSize.toString(),
        };
        if (filters.value.title) queryParams.search = filters.value.title;
        if (filters.value.htmlText) queryParams.search = filters.value.htmlText;
        const { res: response, error: err_ } = await api.fetchBlogsByChannelId(
          channelId,
          queryParams
        );
        if (err_) {
          throw new Error(err_);
        }
        // Assuming response.data contains the blogs array
        blogs.value = blogs.value = sortList<Blog>(
          response.data,
          sortBy.value,
          sortDirection.value
        );
        // pagination.value = response.pagination;
      } catch (err: any) {
        error.value = typeof err === "string" ? new Error(err) : err;
        blogs.value = [];
      } finally {
        isLoading.value = false;
      }
    }

    async function fetchBlogById(id: string) {
      isLoading.value = true;
      error.value = null;
      try {
        const { res: blog, error: err_ } = await api.fetchBlogById(id);
        selectedBlog.value = blog;
        if (err_) {
          throw new Error(err_);
        }
      } catch (err: any) {
        error.value = err;
      } finally {
        isLoading.value = false;
      }
    }
    function onBlogSelected(id: string) {
      selectedBlog.value = blogs.value.find((blog) => blog._id === id);
      if (!selectedBlog.value) {
        throw new Error("Blog not found");
      }
      useActiveCom.showComponent("right", "Details");
    }
    async function createBlog(data: CreateBlogRequest) {
      isLoading.value = true;
      error.value = null;
      try {
        const { res: blog, error: err_ } = await api.createBlog(data);
        blogs.value.push(blog);
        if (err_) {
          throw new Error(err_);
        }
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
        if (err) throw new Error(err);
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
      totalBlogs,
      hasNextPage,
      hasPreviousPage,
      sortBy,
      sortDirection,
      filters,
      // Actions
      fetchBlogsByIdChannelId,
      fetchBlogs,
      fetchBlogById,
      onBlogSelected,
      createBlog,
      updateBlog,
      deleteBlog,
    };
  },
  {
    persist: {
      storage: sessionStorage as any,
      pick: ["selectedBlog"],
    },
  }
);

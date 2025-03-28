import { defineStore } from "pinia";
import type {
  Blog,
  CreateBlogRequest,
  UpdateBlogRequest,
  BlogFilters,
  SortDirection,
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
        blogs.value = sortBlogs(
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
        blogs.value = blogs.value = sortBlogs(
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
    const sortBlogs = (
      blogs: Blog[],
      sortBy?: string,
      sortDirection: SortDirection = "asc"
    ): Blog[] => {
      if (!sortBy) return blogs;

      return [...blogs].sort((a: any, b: any) => {
        let valueA: string | number | Date, valueB: string | number | Date;

        // Handle special case for full name
        if (sortBy === "title" || sortBy === "htmlText") {
          valueA = a.title || a.htmlText;
          valueB = b.title || b.htmlText;
        } else {
          valueA = a[sortBy as keyof Blog];
          valueB = b[sortBy as keyof Blog];
        }
        console.log("valueA, valueB");
        // Handle null values
        if (valueA === null && valueB === null) return 0;
        if (valueA === null) return sortDirection === "asc" ? -1 : 1;
        if (valueB === null) return sortDirection === "asc" ? 1 : -1;

        // Compare dates
        if (sortBy === "created_at") {
          valueA = new Date(valueA).getTime();
          valueB = new Date(valueB).getTime();
        }

        // Compare strings case-insensitive
        if (typeof valueA === "string" && typeof valueB === "string") {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }

        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    };
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
  }
  // {
  //   persist: {
  //     storage: sessionStorage as any,
  //     pick: ["blogs", "selectedBlog"],
  //   },
  // }
);

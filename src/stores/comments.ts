import { defineStore } from "pinia";
import { useCommentsApi } from "~/api/comments";
import { useBlogsStore } from "~/stores/blogs";
import type {
  Comment,
  CreateCommentlRequest,
  UpdateCommentlRequest,
} from "~/types/comment";

export const useCommentStore = defineStore(
  "comment",
  () => {
    const comments = ref<Comment[]>([]);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const api = useCommentsApi();
    const useBlogs = useBlogsStore();
    // Fetch all comments
    const fetchComments = async (params: Record<string, string> = {}) => {
      isLoading.value = true;
      error.value = null;
      try {
        const { res, error: er } = await api.fetchComments(params);
        if (er) {
          comments.value = [];
          error.value = er || "Failed to fetch comments.";
          throw new Error(er);
        }
        comments.value = res.data;
      } catch (err: any) {
        error.value = err.message || "Failed to fetch comments.";
      } finally {
        isLoading.value = false;
      }
    };

    // Fetch a single comment by ID
    const fetchCommentById = async (id: string) => {
      isLoading.value = true;
      error.value = null;
      try {
        return await api.fetchCommentById(id);
      } catch (err: any) {
        error.value = err.message || "Failed to fetch the comment.";
        return null;
      } finally {
        isLoading.value = false;
      }
    };

    // Create a new comment
    const createComment = async (data: CreateCommentlRequest) => {
      isLoading.value = true;
      error.value = null;
      try {
        const { res: newComment, error } = await api.createComment(data);
        if (error) throw new Error(error);
      } catch (err: any) {
        error.value = err.message || "Failed to create comment.";
      } finally {
        isLoading.value = false;
      }
    };
    const addComment = (comment: Comment) => {
      comments.value.push(comment);
    };
    // Update an existing comment
    const updateComment = async (id: string, data: UpdateCommentlRequest) => {
      isLoading.value = true;
      error.value = null;
      try {
        const { res: updatedComment, error } = await api.updateComment(
          id,
          data
        );
        if (error) throw new Error(error);
        const index = comments.value.findIndex((c) => c._id === id);
        if (index !== -1) comments.value[index] = updatedComment;
      } catch (err: any) {
        error.value = err.message || "Failed to update comment.";
      } finally {
        isLoading.value = false;
      }
    };

    // Delete a comment
    const deleteComment = async (id: string) => {
      isLoading.value = true;
      error.value = null;
      try {
        await api.deleteComment(id);
        comments.value = comments.value.filter((c) => c._id !== id);
      } catch (err: any) {
        error.value = err.message || "Failed to delete comment.";
      } finally {
        isLoading.value = false;
      }
    };
    const clearComments = () => (comments.value = []);
    watch(
      () => useBlogs.selectedBlog,
      () => {
        if (useBlogs.selectedBlog) {
          fetchComments({ blogId: useBlogs.selectedBlog._id });
        }
      }
    );
    return {
      comments,
      isLoading,
      error,
      fetchComments,
      fetchCommentById,
      createComment,
      updateComment,
      deleteComment,
      addComment,
      clearComments,
    };
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["comments"],
    },
  }
);

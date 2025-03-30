import { apiRequest } from "~/api/request";
import type {
  Comment,
  CreateCommentlRequest,
  PaginatedResponse,
  UpdateCommentlRequest,
  CommentlFilters,
} from "~/types/comment";

export function useCommentsApi() {
  return {
    fetchComments: async (params: Record<string, string>) =>
      apiRequest<PaginatedResponse<Comment>>({
        endpoint: "comments",
        method: "GET",
        params,
        requireAuth: true,
      }),
    fetchCommentById: async (id: string, params?: CommentlFilters) =>
      apiRequest<Comment>({
        endpoint: `comments/${id}`,
        method: "GET",
        params,
        requireAuth: true,
      }),

    createComment: async (data: CreateCommentlRequest) =>
      apiRequest<Comment>({
        endpoint: "comments",
        method: "POST",
        body: data,
        requireAuth: true,
      }),

    updateComment: async (id: string, data: UpdateCommentlRequest) =>
      apiRequest<Comment>({
        endpoint: `comments/${id}`,
        method: "PATCH",
        body: data,
        requireAuth: true,
      }),

    deleteComment: async (id: string) =>
      apiRequest<void>({
        endpoint: `comments/${id}`,
        method: "DELETE",
        requireAuth: true,
      }),
  };
}

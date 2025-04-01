<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useCommentStore } from "~/stores/comments";
import { useBlogsStore } from "~/stores/blogs";
import { useSocket } from "@/composables/useSocket";

const commentStore = useCommentStore();
const blogStore = useBlogsStore();
const { isConnected, onEvent, offEvent } = useSocket();

onMounted(() => {
  onEvent("commentCreated", (comment) => {
    console.log("New Comment:", comment);
    if (comment.blogId === blogStore.selectedBlog._id)
      commentStore.addComment(comment);
  });

  onEvent("commentUpdated", (updatedComment) => {
    console.log("Updated Comment:", updatedComment);
    if (comment.blogId === blogStore.selectedBlog._id)
      commentStore.updateComment(updatedComment);
  });

  onEvent("commentDeleted", ({ id }) => {
    if (comment.blogId === blogStore.selectedBlog._id)
      commentStore.deleteComment(id);
  });
  onEvent("allCommentsDeleted", (message) => {
    console.log("Deleted all comments:", message);
    commentStore.clearComments();
  });
});

onBeforeUnmount(() => {
  offEvent("commentCreated");
  offEvent("commentUpdated");
  offEvent("commentDeleted");
});
</script>

<template>
  <div>
    <h3 class="text-lg font-semibold py-3">comments</h3>
    <ul class="p-2">
      <li v-for="comment in commentStore.comments" :key="comment.id">
        <div
          id="toast-notification"
          class="w-full my-2 p-4 bg-background-card rounded-lg shadow-xl"
          role="alert"
        >
          <div class="flex items-center mb-3"></div>
          <div class="flex items-center">
            <div class="relative inline-block shrink-0">
              <div
                class="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center font-bold text-xl"
              >
                {{ comment.userName.slice(0, 2) }}
              </div>
            </div>
            <div class="ms-3 text-sm font-normal">
              <div class="text-sm font-semibold">{{ comment.userName }}</div>
              <div class="text-sm font-normal">{{ comment.text }}</div>
              <span class="text-xs font-medium text-primary"
                ><UiRelativeTime :time="comment.created_at"
              /></span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

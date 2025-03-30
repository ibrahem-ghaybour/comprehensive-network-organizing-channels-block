<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useCommentStore } from "~/stores/comments";
import { useSocket } from "@/composables/useSocket";

const commentStore = useCommentStore();
const { isConnected, onEvent, offEvent } = useSocket();

onMounted(() => {
  onEvent("commentCreated", (comment) => {
    console.log("New Comment:", comment);
    commentStore.addComment(comment);
  });

  onEvent("commentUpdated", (updatedComment) => {
    console.log("Updated Comment:", updatedComment);
    commentStore.updateComment(updatedComment);
  });

  onEvent("commentDeleted", ({ id }) => {
    console.log("Deleted Comment:", id);
    commentStore.removeComment(id);
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

const createComment = async () => {
  const comment = await $fetch("http://localhost:5000/comments", {
    method: "POST",
    body: {
      text: "New Comment",
      blogId: "author",
      userId: "djksdlf",
      userName: "ibrahim",
      avatar: "dad",
    },
  });
};
</script>

<template>
  <div>
    <h1>Live Comments</h1>
    <button @click="createComment">
      {{ isConnected ? "Add Comment" : "Connecting..." }}
    </button>
    <ul>
      <li v-for="comment in commentStore.comments" :key="comment.id">
        {{ comment.text }}
      </li>
    </ul>
  </div>
</template>

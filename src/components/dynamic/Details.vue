<template>
  <div class="w-full group relative blogTextVaueEdit">
    <article>
      <div
        ref="articleRef"
        class="!h-[calc(100dvh-80px)] overflow-y-auto relative"
      >
        <div
          class="px-4 relative py-3 min-h-[60px] flex items-center bg-background"
        >
          <h2 class="text-4xl">{{ useBlogs.selectedBlog?.title }}</h2>
          <UiTooltip
            v-if="useBlogs.selectedBlog?.userId"
            v-royal="useBlogs.selectedBlog?.userId"
            @click.stop="toggleEdit"
            :data-tooltip="isEdit ? 'Save Blog' : 'Edit Blog'"
            class="opacity-0 !absolute end-5 top-full !transition-opacity !duration-300 group-hover:opacity-100"
            :class="'text-primary'"
          >
            <font-awesome-icon :icon="['fas', isEdit ? 'check' : 'gear']" />
          </UiTooltip>
        </div>
        <div
          v-if="!isEdit"
          v-html="useBlogs.selectedBlog?.htmlText"
          ref="textHtml"
          class="ql-editor !h-auto overflow-hidden shadow-lg !mt-6 multiline-truncate content-container"
        ></div>
        <UiEditorText
          v-else
          @update:edit="updateContent"
          :textEdit="contentHtml"
        />
        <Comments ref="commentContainer" />
      </div>
      <div class="!bg-inherit shadow-lg p-3">
        <UiInputMessage @send="sendComment" class="!w-full" v-model="comment" />
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import type { CreateCommentlRequest } from "~/types/comment";
import { useBlogsStore } from "~/stores/blogs";
import { useCommentStore } from "~/stores/comments";
import { useAuthStore } from "~/stores/auth";
import { faCheck, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faCheck, faGear);

const useBlogs = useBlogsStore();
const useComments = useCommentStore();
const useAuth = useAuthStore();
const textHtml = ref<HTMLElement | null>(null);
const articleRef = ref<HTMLElement | null>(null);
const contentHtml = ref<string>("");
const isEdit = ref<boolean>(false);
const comment = ref<string>("");
const updateContent = (val: string) => {
  contentHtml.value = val;
};
const sendComment = () => {
  if (!comment.value) return;
  const commentObject: CreateCommentlRequest = {
    text: comment.value,
    blogId: useBlogs.selectedBlog._id,
    userId: useAuth.currentUser._id,
    userName: useAuth.currentUser.name,
  };
  useComments.createComment(commentObject);
  comment.value = "";
  nextTick(() => {
    if (articleRef.value) {
      articleRef.value.scrollTop = articleRef.value.scrollHeight;
    }
  });
};
const toggleEdit = async () => {
  if (isEdit.value) {
    if (!contentHtml.value) return;
    if (contentHtml.value !== useBlogs.selectedBlog?.htmlText)
      await useBlogs.updateBlog(useBlogs.selectedBlog._id, {
        htmlText: contentHtml.value,
      });
  } else {
    contentHtml.value = useBlogs.selectedBlog?.htmlText || "";
  }
  isEdit.value = !isEdit.value;
  await nextTick();
};
</script>

<style lang="scss">
.blogTextVaueEdit {
  user-select: none !important;
}
</style>

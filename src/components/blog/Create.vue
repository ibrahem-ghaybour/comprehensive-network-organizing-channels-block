<template>
  <div>
    <form @submit.prevent="createBlog">
      <UiInput v-model="title" :for-id="'titlecreateUser'" :label="'Title'" />
      <span class="inline-block pt-4 pb-1 text-sm">Description</span>
      <UiEditorText class="!bg-background" @update:edit="htmlText = $event" />
    </form>
    <div class="mt-3">
      <UiButton :loading="useBlogs.isLoading" color-button="var(--primary-color)" @click="createBlog"
        >create</UiButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CreateBlogRequest } from "~/types/blogs";
import { useBlogsStore } from "~/stores/blogs";
import { useAuthStore } from "~/stores/auth";

const route = useRoute();
const useBlogs = useBlogsStore();
const useAuth = useAuthStore();
const htmlText = ref("");
const title = ref("");
const idChannel = computed(() =>
  Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
);
const createBlog = async () => {
  const data: CreateBlogRequest = {
    title: title.value,
    htmlText: htmlText.value,
    groupId: idChannel.value,
    userId: useAuth.currentUser._id,
    avtar: useAuth.currentUser?.image,
    userName: useAuth.currentUser.name,
  };
  await useBlogs.createBlog(data);
};
</script>

<style lang="scss" scoped></style>

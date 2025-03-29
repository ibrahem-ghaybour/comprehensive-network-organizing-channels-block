<template>
  <div class="w-full blogTextVaueEdit">
    <p class="px-4 h-[60px] flex items-center bg-background">
      {{ useBlogs.selectedBlog.title }}
    </p>
    <div
      v-html="useBlogs.selectedBlog.htmlText"
      ref="textHtml"
      class="ql-editor multiline-truncate content-container"
    ></div>
  </div>
</template>

<script setup>
// import { storeToRefs } from "pinia";
import { useBlogsStore } from "~/stores/blogs";
const useBlogs = useBlogsStore();
// const useBlogsReactive = storeToRefs(selectedBlog);
const textHtml = ref(null);
</script>

<style lang="scss">
.blogTextVaueEdit {
  // @import "@/assets/scss/textSi.scss";
  user-select: none !important;
}
</style>

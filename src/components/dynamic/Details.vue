<template>
  <div class="w-full group relative blogTextVaueEdit">
    <h2 class="px-4 text-4xl py-3 min-h-[60px] flex items-center bg-background">
      {{ useBlogs.selectedBlog?.title }}
    </h2>
    <div class="relative">
      <UiTooltip
        v-if="useBlogs.selectedBlog?.userId"
        @click.stop="toggleEdit"
        :data-tooltip="isEdit ? 'Save Blog' : 'Edit Blog'"
        class="opacity-0 !absolute top-2 end-4 !transition-opacity !duration-300 group-hover:opacity-100"
        :class="'text-primary'"
      >
        <font-awesome-icon :icon="['fas', isEdit ? 'check' : 'gear']" />
      </UiTooltip>

      <div
        v-if="!isEdit"
        v-html="useBlogs.selectedBlog?.htmlText"
        ref="textHtml"
        class="ql-editor shadow-lg !mb-10 border-b-[10px] border-[--blog-color]  multiline-truncate content-container"
      ></div>

      <div v-else>
        <UiEditorText @update:edit="updateContent" :textEdit="contentHtml" />
        <UiImageInput class="mt-4 !text-start" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBlogsStore } from "~/stores/blogs";
import { faCheck, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faCheck, faGear);

const useBlogs = useBlogsStore();
const textHtml = ref<HTMLElement | null>(null);
const contentHtml = ref<string>("");
const isEdit = ref<boolean>(false);

const updateContent = (val: string) => {
  contentHtml.value = val;
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

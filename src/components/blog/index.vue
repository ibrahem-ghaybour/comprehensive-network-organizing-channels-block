<template>
  <div
    @click="emit('openDetailsBlog')"
    class="w-full !text-text blogTextValueEdit p-3 pb-6 h-[140px] group relative bg-[--blog-color] rounded-lg mb-3 shadow-lg transition-all !cursor-pointer hover:-translate-y-1 hover:shadow-2xl"
  >
    <UiTooltip
      v-role="blog.userId"
      @click.stop="saveChange"
      :data-tooltip="isOpenEdit ? 'Save Blog' : 'Edit Blog'"
      class="opacity-0 !absolute top-2 end-4 !transition-opacity !duration-300 group-hover:opacity-100"
      :class="isOpenEdit ? 'text-primary' : 'text-white'"
    >
      <font-awesome-icon :icon="isOpenEdit ? 'check' : 'gear'" />
    </UiTooltip>
    <div class="flex flex-col justify-between h-full">
      <h2 v-if="!isOpenEdit" class="!line-clamp-3">{{ blog.title }}</h2>
      <UiInput class="!w-[95%]" v-else v-model="dataChange.title" />
      <div class="pe-4 !text-[12px] flex items-center">
        <span class="font-bold">{{ blog.userName }} :</span>
        <span class=" !select-none ">
          <UiTextHtml
          :qlEditor="false"
          :text="blog.htmlText"
        />
        </span>
      </div>
    </div>
    <div class="absolute bottom-1 start-2 text-sm flex items-center gap-1">
      <span><font-awesome-icon :icon="['fas', 'comment']" /></span>
      .
      <UiRelativeTime class="!text-xs" :time="blog.created_at" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBlogsStore } from "~/stores/blogs";
import type { Blog } from "~/types/blogs";
import {
  faCaretDown,
  faComment,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faCaretDown, faComment, faCheck);

const emit = defineEmits(["openDetailsBlog"]);

const props = defineProps<{
  blog: Blog;
}>();
const isOpenEdit = ref<boolean>(false);
const dataChange = ref<Blog>({ ...props.blog });

const { updateBlog } = useBlogsStore();

// Function to save changes
const saveChange = () => {
  if (isOpenEdit.value && dataChange.value.title !== props.blog.title)
    updateBlog(props.blog._id, dataChange.value);
  isOpenEdit.value = !isOpenEdit.value;
};
</script>

<style lang="scss">
.blogTextValueEdit {
  user-select: none !important;
  // cursor: pointer !important;
//   .ql-editor {
//     * {
//       cursor: pointer !important;
//     }
//   }
}
.popupEditorText {
  user-select: none !important;
  // cursor: pointer !important;
}
</style>

<template>
  <div
    v-html="text"
    ref="textHtml"
    :class="{
      'ql-editor multiline-truncate !line-clamp-3 pb-12 content-container':
        qlEditor,
      'no-ql-editor !line-clamp-1': !qlEditor,
    }"
  ></div>
</template>

<script lang="ts" setup>
import Quill from "quill";

const props = defineProps<{
  text: string;
  qlEditor: boolean;
}>();
// Local reactive state
const textHtml = ref<HTMLElement | null>(null);
const contentHTML = ref<string>("");

let quill: Quill;
// Function to set editor content using Quill's clipboard method for HTML
const setContents = (content: string) => {
  if (quill) {
    quill.clipboard.dangerouslyPasteHTML(content);
    console.log(content);
    contentHTML.value = quill.root.innerHTML;
  }
};

// Initialize Quill on mount
onMounted(() => {
  if (textHtml.value) {
    quill = new Quill(textHtml.value);
    setContents(props.text);
  }
});
</script>

<style lang="scss">
.ql-editor {
  @import "@/assets/css/textSi.scss";
  * {
    cursor: pointer !important;
  }
}
.no-ql-editor {
  .ql-editor {
    padding: 0 !important;
    margin: 0 !important;
    overflow: hidden !important;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 1 !important;
  }
}
</style>

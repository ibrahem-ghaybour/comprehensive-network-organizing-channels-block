<template>
  <div
    v-html="props.text"
    contenteditable="false"
    ref="textHtml"
    :class="{
      'ql-editor multiline-truncate !line-clamp-3 pb-12 content-container':
        qlEditor,
      'no-ql-editor !line-clamp-1 !select-none': !qlEditor,
    }"
  ></div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  text: string;
  qlEditor: boolean;
}>();
</script>

<style lang="scss">
.ql-editor {
  @import "@/assets/css/textSi.scss";
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

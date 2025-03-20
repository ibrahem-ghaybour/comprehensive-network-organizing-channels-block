<template>
  <div class="w-full blogTextVaueEdit">
    <CoreEditorImag />
    <div
      v-html="contentHTML"
      ref="textHtml"
      class="ql-editor multiline-truncate content-container"
    ></div>
  </div>
</template>

<script setup>
const emit = defineEmits("openDetails");
import Quill from "quill";

const props = defineProps({
  idBlog: {
    type: String,
    default: "",
  },
});
let quill;
const { getBlogById } = useBlogsStore();
const dataBlog = computed(() => getBlogById(props.idBlog));
const textHtml = ref(null);
const contentHTML = ref("");

onMounted(() => {
  quill = new Quill(textHtml.value);
  quill.setContents(dataBlog.value?.title);
  contentHTML.value = quill.root.innerHTML;
});
watch(dataBlog, () => {
  quill.setContents(dataBlog.value?.title);
  contentHTML.value = quill.root.innerHTML;
});
</script>

<style lang="scss">
.blogTextVaueEdit {
  @import "@/assets/scss/textSi.scss";
  user-select: none !important;
}
</style>

<script setup lang="ts">
import { Delta } from "quill";

const props = defineProps({
  textEdit: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:edit"]);

const editor = ref<HTMLElement | null>(null);
const contentHTML = ref("");

onMounted(async () => {
  const { default: Quill } = await import("quill");

  const quill = new Quill(editor.value!, {
    theme: "snow",
    placeholder: "Start typing...",
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["link", "blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    },
  });

  // 🔒 Remove background styles + block image embeds on paste
  quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
    delta.ops = delta.ops.filter((op: any) => {
      if (op.insert && typeof op.insert === "object" && op.insert.image) {
        return false; // Block image embeds
      }
      if (op.attributes?.background) {
        delete op.attributes.background;
      }
      return true;
    });
    return delta;
  });

  // 🧹 Clean pasted base64 images directly via event
  quill.root.addEventListener("paste", (e) => {
    const clipboardData = (e as ClipboardEvent).clipboardData;
    if (!clipboardData) return;

    for (const item of clipboardData.items) {
      if (item.type.indexOf("image") !== -1) {
        e.preventDefault(); // Block image paste
        return;
      }
    }
  });

  // 🧹 Prevent drag-drop of images
  quill.root.addEventListener("drop", (e) => {
    e.preventDefault();
  });

  // 🧼 Load content safely, stripping images
  if (props.textEdit) {
    const cleaned = props.textEdit.replace(/<img[^>]*>/gi, "");
    quill.root.innerHTML = cleaned;
  }

  // ✨ Clean up any rogue <img> tags on change
  quill.on("text-change", () => {
    const html = quill.root.innerHTML;
    const cleanedHTML = html.replace(/<img[^>]*>/gi, ""); // Ensure cleanup
    quill.root.innerHTML = cleanedHTML;

    contentHTML.value = cleanedHTML;
    emit("update:edit", contentHTML.value);
  });
});
</script>

<template>
  <div>
    <div class="QuEditorText bg-gray-dark" ref="editor"></div>
  </div>
</template>

<style lang="scss">
.QuEditorText {
  .ql-container {
    min-height: 200px;
    background-color: var(--dark-gray); // Tailwind bg-gray-800
  }

  .ql-toolbar {
    border: none;
    background-color: var(--dark-gray); // Tailwind bg-gray-700
  }

  .ql-editor {
    min-height: 150px;
  }

  // Optional: prevent leftover inline background styles
  .ql-editor [style*="background-color"] {
    background-color: transparent !important;
  }
}
</style>

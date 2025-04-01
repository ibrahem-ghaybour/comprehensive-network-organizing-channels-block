<script setup lang="ts">
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

  // 🧼 Remove pasted images and background colors
  quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
    delta.ops = delta.ops.filter((op: any) => {
      if (op.insert && typeof op.insert === "object" && op.insert.image) {
        return false;
      }
      if (op.attributes?.background) {
        delete op.attributes.background;
      }
      return true;
    });
    return delta;
  });

  // 🛡️ Block pasted images via raw data
  quill.root.addEventListener("paste", (e) => {
    const clipboardData = (e as ClipboardEvent).clipboardData;
    if (!clipboardData) return;

    for (const item of clipboardData.items) {
      if (item.type.includes("image")) {
        e.preventDefault(); // ⛔ Kill image paste
        return;
      }
    }
  });

  // 🔒 Block dropped images
  quill.root.addEventListener("drop", (e) => {
    const hasImage = Array.from(e.dataTransfer?.items || []).some((item) =>
      item.type.includes("image")
    );
    if (hasImage) {
      e.preventDefault();
    }
  });

  // 🧾 Set cleaned initial content
  if (props.textEdit) {
    const cleaned = props.textEdit.replace(/<img[^>]*>/gi, "");
    quill.root.innerHTML = cleaned;
  }

  // 🧼 MutationObserver: remove any sneaky image nodes
  const observer = new MutationObserver(() => {
    const images = quill.root.querySelectorAll("img");
    images.forEach((img) => img.remove());
  });
  observer.observe(quill.root, {
    childList: true,
    subtree: true,
  });

  // ✍️ Emit on change
  quill.on("text-change", () => {
    contentHTML.value = quill.root.innerHTML;
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
    background-color: var(--dark-gray);
  }

  .ql-toolbar {
    border: none;
    background-color: var(--dark-gray);
  }

  .ql-editor {
    min-height: 150px;
  }

  .ql-editor [style*="background-color"] {
    background-color: transparent !important;
  }
}
</style>

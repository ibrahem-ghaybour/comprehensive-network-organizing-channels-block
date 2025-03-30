<template>
  <div class="flex flex-col items-start gap-4">
    <div
      v-if="previewUrl"
      class="relative border border-gray-300"
      :style="{ width: `${width}px`, height: `${height}px` }"
      @mousedown="startResizing"
    >
      <img
        :src="previewUrl"
        alt="Preview"
        class="w-full h-full object-cover select-none pointer-events-none"
        draggable="false"
      />
      <!-- Resize handle -->
      <div
        class="absolute right-0 bottom-0 w-4 h-4 bg-blue-500 cursor-se-resize"
        @mousedown.stop.prevent="startResizing"
      />
    </div>

    <label
      class="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Select Image
      <input
        type="file"
        class="hidden"
        accept="image/*"
        @change="onFileChange"
      />
    </label>
  </div>
</template>

<script setup lang="ts">

const previewUrl = ref<string | null>(null);
const imageFile = ref<File | null>(null);
const width = ref(200);
const height = ref(200);

let isResizing = false;

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file && file.type.startsWith("image/")) {
    imageFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

function startResizing(e: MouseEvent) {
  isResizing = true;
  const startX = e.clientX;
  const startY = e.clientY;
  const startWidth = width.value;
  const startHeight = height.value;

  function onMouseMove(e: MouseEvent) {
    if (!isResizing) return;
    width.value = Math.max(100, startWidth + (e.clientX - startX));
    height.value = Math.max(100, startHeight + (e.clientY - startY));
  }

  function onMouseUp() {
    isResizing = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}
</script>

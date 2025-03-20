<template>
  <v-container>
    <v-expansion-panels multiple v-model="activePanels">
      <v-expansion-panel v-for="(item, index) in items" :key="index">
        <v-expansion-panel-title>
          <v-icon
            left
            :icon="
              activePanels.includes(index)
                ? 'mdi-chevron-down'
                : 'mdi-chevron-right'
            "
          ></v-icon>
          {{ item.title }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          {{ item.content }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
import { ref } from "vue";


const items = ref([
  {
    title: "🔥 Best Collapse Combo",
    content: "This is an optimized expandable panel with animation and icons.",
  },
  {
    title: "💡 Supports Multiple Panels",
    content: "You can open multiple panels at the same time.",
  },
  {
    title: "🚀 Smooth & Dynamic",
    content: "The best user experience with animations and states.",
  },
]);

const activePanels = ref([]); // Track active panels manager123Q#@Adff//

</script>

<style scoped></style>

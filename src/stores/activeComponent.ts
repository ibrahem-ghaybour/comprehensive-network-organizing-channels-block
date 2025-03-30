import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useDynamicComponentMap } from "~/composables/useDynamicComponentMap";

type PanelPosition = "left" | "right";

export const useActiveComponent = defineStore("activeComponent", () => {
  const isVisible = ref(false);

  // One key per position
  const componentKeys = reactive<Record<PanelPosition, string | null>>({
    left: "List",
    right: null,
  });

  const componentMap = useDynamicComponentMap();

  // One computed per component position
  const components = computed(() => ({
    left: componentKeys.left ? componentMap[componentKeys.left] : null,
    right: componentKeys.right ? componentMap[componentKeys.right] : null,
  }));

  // Show component for a specific side
  function showComponent(position: PanelPosition, key: string) {
    componentKeys[position] = key;
    isVisible.value = true;
  }

  // Hide a component for a specific side
  function hideComponent(position: PanelPosition) {
    componentKeys[position] = null;
    if (!componentKeys.left && !componentKeys.right) {
      isVisible.value = false;
    }
  }

  const hasComponent = computed(() => ({
    left: !!components.value.left,
    right: !!components.value.right,
  }));

  return {
    isVisible,
    componentKeys,
    components,
    hasComponent,
    showComponent,
    hideComponent,
  };
}, {
  persist: {
    storage: sessionStorage as any,
    pick: ["componentKeys", "isVisible"],
  },
});

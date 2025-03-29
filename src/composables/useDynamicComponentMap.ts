import { defineAsyncComponent } from "vue";

export function useDynamicComponentMap() {
  const components = import.meta.glob("~/components/dynamic/*.vue");

  const map: Record<string, ReturnType<typeof defineAsyncComponent>> = {};

  for (const path in components) {
    const key = path.split("/").pop()?.replace(".vue", "") ?? "";
    map[key] = defineAsyncComponent(components[path]);
  }

  return map;
}

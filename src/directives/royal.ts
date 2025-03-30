import type { ObjectDirective } from "vue";
import { useAuthStore } from "~/stores/auth";

export const vRoyal: ObjectDirective<HTMLElement, string> = {
  mounted(el, binding) {
    updateElement(el, binding);
  },
  updated(el, binding) {
    updateElement(el, binding);
  },
};

function updateElement(el: HTMLElement, binding: any) {
  const authStore = useAuthStore();
  const authorized = authStore.currentUser._id === binding.value;
  if (!authorized && el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

export default vRoyal;

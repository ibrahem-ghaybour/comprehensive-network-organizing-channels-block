import type { ObjectDirective } from "vue";
import { useAuthStore } from "~/stores/auth";

export const vRole: ObjectDirective<HTMLElement, string> = {
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

  // When authorized: reinsert element if it was previously removed
  if (authorized) {
    // Check if a placeholder exists that indicates the element was removed
    if ((el as any).__placeholder) {
      // Insert the element back before the placeholder
      (el as any).__placeholder.parentNode?.insertBefore(el, (el as any).__placeholder);
      // Remove the placeholder from the DOM
      (el as any).__placeholder.remove();
      // Delete the placeholder reference
      delete (el as any).__placeholder;
    }
    return;
  }

  // When not authorized: remove the element and create a placeholder
  if (!authorized && el.parentNode) {
    // If we haven't created a placeholder already, create one
    if (!(el as any).__placeholder) {
      // Create a comment node as a placeholder
      const placeholder = document.createComment("vRole placeholder");
      // Store the placeholder on the element so we can reference it later
      (el as any).__placeholder = placeholder;
      // Insert the placeholder into the DOM before the element
      el.parentNode.insertBefore(placeholder, el);
    }
    // Remove the element from the DOM
    el.parentNode.removeChild(el);
  }
}

export default vRole;

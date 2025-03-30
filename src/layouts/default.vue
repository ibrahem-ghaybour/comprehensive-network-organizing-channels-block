<template>
  <div class="flex flex-col h-dvh overflow-hidden bg-background text-text">
    <div
      :class="[
        'flex gap-x-2 bg-[--dark-gray]',
        authStore.isAuthenticated ? 'py-3' : '',
      ]"
    >
      <UiSidebar
        :storage-id="'left-sidebar'"
        :default-storage="true"
        v-if="authStore.isAuthenticated"
        ref="sidebarRef"
      >
        <div v-if="activeComponent.hasComponent.left">
          <component :is="activeComponent.components.left" />
        </div>
      </UiSidebar>
      <main id="main-content" class="flex-1">
        <UiHeader />
        <div :class="['h-dvh pb-16 !overflow-y-auto']">
          <slot></slot>
          <footer
            class="bg-background-card border-t border-border py-4 text-center text-sm"
          >
            <div class="container">
              <p>
                &copy; {{ new Date().getFullYear() }} IBRAHIM. All rights
                reserved.{{ activeComponent?.isVisible }}
              </p>
            </div>
          </footer>
        </div>
      </main>
      <UiSidebar
        :storage-id="'right-sidebar'"
        v-if="authStore.isAuthenticated"
        :direction="'right'"
        :class-parent="'!p-0'"
        ref="sidebarRefRight"
      >
        <template #mobile-close>
          <UiCloseButton class="!z-50" @click="toggleSidebarRight" />
        </template>
        <div v-if="activeComponent.hasComponent.right">
          <component :is="activeComponent.components.right" />
        </div>
      </UiSidebar>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { useActiveComponent } from "~/stores/activeComponent";
const sidebarRef = ref(null);
const sidebarRefRight = ref(null);
const authStore = useAuthStore();
const activeComponent = useActiveComponent();

const toggleSidebarRight = () => {
  sidebarRefRight.value.toggle();
  activeComponent.hideComponent("right");
};
watch(
  () => activeComponent.hasComponent,
  () => {
    sidebarRefRight.value.isOpen = activeComponent.hasComponent.right;
  }
);
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.app-header {
  background-color: var(--card-background);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--heading-color);
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
}

.user-name {
  font-weight: 500;
}

.logout-button {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.logout-button:hover {
  background-color: var(--light-gray);
}

.ml-4 {
  margin-left: 1rem;
}

.app-main {
  flex: 1;
  padding: 2rem 0;
}

.app-footer {
  background-color: var(--card-background);
  border-top: 1px solid var(--border-color);
  padding: 1rem 0;
  text-align: center;
  font-size: 0.875rem;
}

/* Accessibility: Skip to content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-color);
  color: white;
  padding: 8px;
  z-index: 100;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}

/* Focus styles for keyboard navigation */
:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Button Styles */
.btn-logout {
  @apply bg-transparent border-none text-primary text-sm px-2 py-1 rounded hover:bg-gray-light cursor-pointer;
}
</style>

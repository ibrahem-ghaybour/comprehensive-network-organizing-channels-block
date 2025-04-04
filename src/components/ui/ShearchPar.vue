<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <UiInput
        v-model="searchTerm"
        :placeholder="$t('common.search')"
        class="search-input px-3 py-1 !rounded-lg"
        @input="debouncedSearch"
      />

      <button class="search-button text-xs" @click="search">
        <slot name="icon">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']"
        /></slot>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faMagnifyingGlass);
// Props
const props = defineProps({
  initialValue: {
    type: String,
    default: "",
  },
});

// Emits
const emit = defineEmits<{
  (e: "search", term: string): void;
}>();

// State
const searchTerm = ref(props.initialValue);

// Debounce search to avoid too many API calls
let debounceTimeout: NodeJS.Timeout | null = null;

function debouncedSearch() {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(() => {
    search();
  }, 300);
}

function search() {
  emit("search", searchTerm.value);
}

// Watch for external changes to initialValue
watch(
  () => props.initialValue,
  (newValue) => {
    searchTerm.value = newValue;
  }
);
</script>

<style scoped>
.search-bar {
  flex: 1;
  min-width: 150px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding: 0.5rem 0.33rem;
  width: 100%;
  font-size: 0.875rem;
  color: var(--text-color);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
}

.search-button {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
}

.search-button:hover {
  color: var(--primary-color);
}
</style>

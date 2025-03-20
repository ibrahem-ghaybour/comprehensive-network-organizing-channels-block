<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <div class="text-xl font-bold">
        <NuxtLink to="/">MyLogo</NuxtLink>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-8">
        <NuxtLink
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.href"
          class="text-gray-700 hover:text-blue-600 transition duration-200"
        >
          {{ item.name }}
        </NuxtLink>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden focus:outline-none"
        aria-label="Toggle Menu"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-white shadow-md">
      <div class="px-4 py-4 flex flex-col space-y-4">
        <NuxtLink
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.href"
          class="text-gray-700 hover:text-blue-600 transition duration-200"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { NuxtLink } from "#components";

const isOpen = ref(false);
const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];
</script>

<style scoped>
/* Optional: add any additional styling here */
</style>

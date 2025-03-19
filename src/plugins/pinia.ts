import { defineNuxtPlugin } from "#app";
import { createPinia } from "pinia";
import piniaPersistedState from "pinia-plugin-persistedstate";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return; //  Prevent execution on the server

  const pinia = createPinia();
  pinia.use(piniaPersistedState); //  Runs only on the client
  nuxtApp.vueApp.use(pinia);
});

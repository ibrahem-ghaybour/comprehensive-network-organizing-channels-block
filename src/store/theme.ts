import { defineStore } from "pinia";

type Theme = "light" | "dark";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "light" as Theme, // Default to light theme initially
  }),

  actions: {
    // Initialize the theme after hydration
    init() {
      this.theme = this.getInitialTheme();

      this.applyTheme();

      // Watch for system preference changes
      if (window.matchMedia) {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (event) => {
            if (!localStorage.getItem("theme")) {
              // Only update if user hasn't manually set a preference
              this.setTheme(event.matches ? "dark" : "light");
            }
          });
      }
    },

    getInitialTheme(): Theme {
      const storedTheme = localStorage.getItem("theme") as Theme | null;
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }

      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      }

      return "light";
    },

    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      this.applyTheme();
    },

    setTheme(newTheme: Theme) {
      this.theme = newTheme;
      this.applyTheme();
    },

    applyTheme() {
      const html = document.documentElement;

      if (this.theme === "dark") {
        html.classList.add("dark-theme");
      } else {
        html.classList.remove("dark-theme");
      }

      localStorage.setItem("theme", this.theme);
    },
  },
});

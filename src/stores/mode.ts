import { defineStore } from "pinia";
import { ref } from "vue";

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
    if (typeof window === "undefined") return "light";

    try {
        const savedTheme = window.localStorage.getItem("wh0rigin-theme");
        if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    } catch {
        // Use the system preference if local storage is unavailable.
    }

    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export const useModeStore = defineStore("mode", () => {
    const mode = ref(0);
    const theme = ref<Theme>(getInitialTheme());

    function getNewRandomMode() {
        mode.value = Math.floor(Math.random() * 3);
    }

    function setTheme(nextTheme: Theme) {
        theme.value = nextTheme;
        if (typeof window === "undefined") return;

        document.documentElement.dataset.theme = nextTheme;
        try {
            window.localStorage.setItem("wh0rigin-theme", nextTheme);
        } catch {
            // The current page still uses the selected theme for this session.
        }
    }

    function toggleTheme() {
        setTheme(theme.value === "dark" ? "light" : "dark");
    }

    if (typeof document !== "undefined") {
        document.documentElement.dataset.theme = theme.value;
    }

    return { mode, theme, getNewRandomMode, setTheme, toggleTheme };
});

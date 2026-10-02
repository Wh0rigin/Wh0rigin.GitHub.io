import { defineStore } from "pinia";
import { ref } from "vue";

export type Theme = "light" | "dark" | "golden";

type ViewTransitionDocument = Document & {
    startViewTransition?: (updateCallback: () => void) => { finished: Promise<void> };
};

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
    const mode = ref(Math.floor(Math.random() * 3));
    const theme = ref<Theme>(getInitialTheme());

    function getNewRandomMode() {
        mode.value = Math.floor(Math.random() * 3);
    }

    function setTheme(nextTheme: Theme, origin?: HTMLElement) {
        if (theme.value === nextTheme) return;

        const applyTheme = () => {
            theme.value = nextTheme;
            document.documentElement.dataset.theme = nextTheme;
            try {
                // The hidden channel must be entered through the footer television.
                if (nextTheme !== "golden") window.localStorage.setItem("wh0rigin-theme", nextTheme);
            } catch {
                // The current page still uses the selected theme for this session.
            }
        };

        if (typeof window === "undefined") {
            theme.value = nextTheme;
            return;
        }

        const root = document.documentElement;
        const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        const transitionDocument = document as ViewTransitionDocument;
        if (!transitionDocument.startViewTransition || reducedMotion) {
            applyTheme();
            return;
        }

        const toggleButton = origin ?? document.querySelector<HTMLElement>(".theme-button");
        const buttonBounds = toggleButton?.getBoundingClientRect();
        if (buttonBounds) {
            root.style.setProperty("--theme-transition-x", `${buttonBounds.left + buttonBounds.width / 2}px`);
            root.style.setProperty("--theme-transition-y", `${buttonBounds.top + buttonBounds.height / 2}px`);
        }

        const clearTransitionOrigin = () => {
            root.style.removeProperty("--theme-transition-x");
            root.style.removeProperty("--theme-transition-y");
        };

        try {
            const transition = transitionDocument.startViewTransition(applyTheme);
            void transition.finished.then(clearTransitionOrigin, clearTransitionOrigin);
        } catch {
            clearTransitionOrigin();
            applyTheme();
        }
    }

    function toggleTheme() {
        setTheme(theme.value === "light" ? "dark" : "light");
    }

    function tuneTelevision(event: MouseEvent) {
        const origin = event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;
        setTheme(theme.value === "golden" ? "light" : "golden", origin);
    }

    if (typeof document !== "undefined") {
        document.documentElement.dataset.theme = theme.value;
    }

    return { mode, theme, getNewRandomMode, setTheme, toggleTheme, tuneTelevision };
});

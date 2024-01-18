import { defineStore } from "pinia";
import { ref } from "vue";

export const useModeStore = defineStore("mode", () => {
    const mode = ref(0);
    function getNewRandomMode() {
        mode.value = Math.floor(Math.random() * 3)
    }

    return { mode, getNewRandomMode };
});

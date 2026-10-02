<script setup lang="ts">
withDefaults(defineProps<{ depth?: 2 | 3 }>(), { depth: 2 });
</script>

<template>
    <span class="wired-accent">
        <i v-if="depth === 3" class="wired-accent-underlay" aria-hidden="true"></i>
        <slot />
    </span>
</template>

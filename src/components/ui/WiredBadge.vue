<script setup lang="ts">
withDefaults(defineProps<{
    as?: 'span' | 'p' | 'li';
    variant?: 'solid' | 'soft' | 'outline' | 'tag';
    flat?: boolean;
}>(), { as: 'span', variant: 'solid', flat: false });
</script>

<template>
    <component :is="as" class="wired-badge" :class="[`wired-badge--${variant}`, { 'wired-badge--flat': flat }]">
        <slot />
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, type RouteLocationRaw } from 'vue-router';

const props = withDefaults(defineProps<{
    to?: RouteLocationRaw;
    href?: string;
    variant?: 'primary' | 'paper' | 'ghost';
    arrow?: 'right' | 'up-right' | 'left' | 'none';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}>(), { variant: 'primary', arrow: 'right', type: 'button', disabled: false });

const element = computed(() => props.to ? RouterLink : props.href ? 'a' : 'button');
const binding = computed(() => props.to
    ? { to: props.to }
    : props.href ? { href: props.href } : { type: props.type, disabled: props.disabled });
</script>

<template>
    <component :is="element" v-bind="binding" class="wired-action" :class="`wired-action--${variant}`">
        <svg v-if="arrow === 'left'" class="wired-action-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M20 12H5m6-6-6 6 6 6" /></svg>
        <span class="wired-action-label"><slot /></span>
        <svg v-if="arrow === 'right'" class="wired-action-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
        <svg v-else-if="arrow === 'up-right'" class="wired-action-icon" aria-hidden="true" viewBox="0 0 20 20"><path d="M5 15 15 5M5 5h10v10" /></svg>
    </component>
</template>

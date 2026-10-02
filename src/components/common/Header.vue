<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useModeStore } from '../../stores/mode';

const modeStore = useModeStore();
const route = useRoute();
const isBlog = computed(() => route.path.startsWith('/blog'));
const themeLabel = computed(() => modeStore.theme === 'golden'
    ? '退出电视主题，切换到日间模式'
    : modeStore.theme === 'dark' ? '切换到日间模式' : '切换到夜间模式');
const isOpen = ref(false);
const isAtTop = ref(true);

const checkScrollPosition = () => {
    // The record spotlight locks the body in place, which resets window.scrollY.
    const scrollY = document.body.style.position === 'fixed'
        ? Math.abs(Number.parseFloat(document.body.style.top) || 0)
        : window.scrollY;
    isAtTop.value = scrollY === 0;
};

const closeMenu = () => {
    isOpen.value = false;
};

onMounted(() => {
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
});

onUnmounted(() => {
    window.removeEventListener('scroll', checkScrollPosition);
});
</script>

<template>
    <header class="site-header" :class="{ 'at-top': isAtTop && !isBlog }">
        <nav class="navbar wired-container" aria-label="主导航">
            <router-link to="/" class="brand" aria-label="The Wired World home" @click="closeMenu">
                <span class="brand-text"><span class="brand-prefix">THE</span> <span class="brand-accent">WIRED WORLD</span></span>
            </router-link>

            <div class="nav-links">
                <router-link to="/" class="nav-link" @click="closeMenu">首页</router-link>
                <router-link :to="{ path: '/', hash: '#page2' }" class="nav-link" @click="closeMenu">关于</router-link>
                <router-link to="/blog" class="nav-link" :class="{ 'blog-active': isBlog }" :aria-current="isBlog ? 'page' : undefined" @click="closeMenu">Blog</router-link>
            </div>

            <div class="nav-actions">
                <a class="github-link" href="https://github.com/Wh0rigin" target="_blank" rel="noreferrer">
                    GitHub
                    <svg aria-hidden="true" viewBox="0 0 20 20">
                        <path d="M5 15 15 5M6 5h9v9" />
                    </svg>
                </a>

                <button
                    class="icon-button theme-button"
                    type="button"
                    :aria-label="themeLabel"
                    :title="themeLabel"
                    @click="modeStore.toggleTheme"
                >
                    <svg v-if="modeStore.theme === 'golden'" aria-hidden="true" viewBox="0 0 24 24">
                        <path d="m8 2 4 4 4-4M6 20l-1 2m13-2 1 2" />
                        <rect x="2" y="6" width="20" height="14" rx="2" />
                        <rect x="5" y="9" width="11" height="8" rx="1" />
                        <path d="M19 10v1m0 4v1" />
                    </svg>
                    <svg v-else-if="modeStore.theme === 'dark'" aria-hidden="true" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                    </svg>
                    <svg v-else aria-hidden="true" viewBox="0 0 24 24">
                        <path d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.6 8.6 0 1 0 20.2 15.4Z" />
                    </svg>
                </button>

                <button
                    class="icon-button menu-button"
                    type="button"
                    :aria-expanded="isOpen"
                    aria-controls="mobile-menu"
                    :aria-label="isOpen ? '关闭导航菜单' : '打开导航菜单'"
                    @click="isOpen = !isOpen"
                >
                    <svg aria-hidden="true" viewBox="0 0 24 24">
                        <path d="M4 7h16M4 12h16M4 17h16" />
                    </svg>
                </button>
            </div>
        </nav>

        <Transition name="slide-fade">
            <div v-if="isOpen" id="mobile-menu" class="mobile-menu">
                <router-link to="/" class="menu-link" @click="closeMenu">首页</router-link>
                <router-link :to="{ path: '/', hash: '#page2' }" class="menu-link" @click="closeMenu">关于</router-link>
                <router-link to="/blog" class="menu-link" :aria-current="isBlog ? 'page' : undefined" @click="closeMenu">Blog / 连线手记</router-link>
                <a class="menu-link" href="https://github.com/Wh0rigin" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
        </Transition>
    </header>
</template>

<style lang="less" scoped>
.site-header {
    position: fixed;
    inset: 0 0 auto;
    z-index: 1000;
    color: var(--text);
    background: color-mix(in srgb, var(--surface) 88%, transparent);
    border-bottom: 0.0625rem solid var(--border);
    backdrop-filter: blur(1rem);
    transition: background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.site-header.at-top {
    background: transparent;
    border-color: transparent;
    backdrop-filter: none;
}

.navbar {
    min-height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.75rem;
}

.brand {
    display: inline-flex;
    align-items: center;
    color: var(--text);
    text-decoration: none;
    white-space: nowrap;
}

.brand-text {
    font-size: 0.98rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    transition: transform 180ms ease, text-shadow 180ms ease;
}

.brand-prefix {
    color: var(--text-muted);
    font-size: 0.78em;
    letter-spacing: 0.18em;
}

.brand-accent {
    color: var(--accent-strong);
    background: linear-gradient(110deg, var(--accent-strong), var(--mint));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.nav-links,
.nav-actions {
    display: flex;
    align-items: center;
}

.nav-links {
    gap: 1.875rem;
    margin-left: auto;
    margin-right: 0.875rem;
}

.nav-link,
.menu-link {
    color: var(--text-muted);
    font-size: 0.92rem;
    font-weight: 600;
    text-decoration: none;
    transition: color 160ms ease;

    &:hover,
    &:focus-visible {
        color: var(--accent-strong);
    }
}

.nav-actions {
    gap: 0.75rem;
}

.nav-link.blog-active {
    position: relative;
}

.nav-link.blog-active::after {
    position: absolute;
    right: -0.1875rem;
    bottom: -0.5625rem;
    left: -0.1875rem;
    height: 0.1875rem;
    background: var(--accent);
    transform: skewX(-25deg);
    content: '';
}

.github-link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.625rem 0.9375rem;
    border: 0.0625rem solid var(--border);
    border-radius: 62.4375rem;
    color: var(--text);
    font-size: 0.88rem;
    font-weight: 650;
    text-decoration: none;
    transition: color 160ms ease, border-color 160ms ease, background-color 160ms ease;

    &:hover {
        color: var(--accent-strong);
        border-color: var(--accent);
        background: var(--accent-soft);
    }

    svg {
        width: 0.875rem;
        height: 0.875rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
}

.icon-button {
    display: grid;
    width: 2.5rem;
    height: 2.5rem;
    place-items: center;
    border: 0.0625rem solid var(--border);
    border-radius: 50%;
    color: var(--text);
    background: var(--surface);
    cursor: pointer;
    transition: color 160ms ease, border-color 160ms ease, transform 160ms ease;

    &:hover {
        color: var(--accent-strong);
        border-color: var(--accent);
        transform: translateY(-0.0625rem);
    }

    &:focus-visible {
        outline: 0.1875rem solid var(--accent);
        outline-offset: 0.1875rem;
    }

    svg {
        width: 1.1875rem;
        height: 1.1875rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.7;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
}

.menu-button,
.mobile-menu {
    display: none;
}

:global(html[data-theme="light"] .site-header:not(.at-top)) {
    border-bottom: 0.1875rem solid #23e8ed;
    background: rgba(0, 39, 130, 0.93);
    box-shadow: 0 0.3125rem 0 rgba(0, 23, 96, 0.25);
}

:global(html[data-theme="light"] .site-header:not(.at-top) .brand),
:global(html[data-theme="light"] .site-header:not(.at-top) .brand-prefix) {
    color: #ffffff;
}

:global(html[data-theme="light"] .site-header:not(.at-top) .brand-accent) {
    background: linear-gradient(105deg, #ffffff, #3efaf3);
    background-clip: text;
    -webkit-background-clip: text;
}

:global(html[data-theme="light"] .brand-text) {
    font-style: italic;
    font-weight: 950;
    letter-spacing: 0.08em;
    transform: skewX(-7deg);
}

:global(html[data-theme="light"] .nav-link) {
    color: #ffffff;
    font-style: italic;
    font-weight: 850;
    text-shadow: 0.125rem 0.125rem 0 rgba(0, 28, 116, 0.6);
}

:global(html[data-theme="light"] .nav-link:hover),
:global(html[data-theme="light"] .nav-link:focus-visible) {
    color: #43fff1;
}

:global(html[data-theme="light"] .github-link) {
    border: 0.125rem solid #ffffff;
    border-radius: 0;
    color: #ffffff;
    background: #003490;
    box-shadow: 0.3125rem 0.3125rem 0 #1de3e8;
    font-style: italic;
    font-weight: 850;
    transform: skewX(-7deg);
}

:global(html[data-theme="light"] .github-link:hover) {
    color: #001b64;
    background: #39f5ef;
    transform: translate(0.125rem, 0.125rem) skewX(-7deg);
}

:global(html[data-theme="light"] .icon-button) {
    border: 0.125rem solid #ffffff;
    border-radius: 0.0625rem;
    color: #ffffff;
    background: #0045a6;
    box-shadow: 0.25rem 0.25rem 0 #1de3e8;
    transform: skewX(-7deg);
}

:global(html[data-theme="light"] .icon-button:hover) {
    color: #001b64;
    background: #39f5ef;
    transform: translate(0.125rem, 0.125rem) skewX(-7deg);
}

:global(html[data-theme="dark"] .site-header:not(.at-top)) {
    border-bottom: 0.1875rem solid var(--accent);
    background: color-mix(in srgb, #09090c 92%, transparent);
    box-shadow: 0 0.3125rem 0 rgba(0, 0, 0, 0.58);
}

:global(html[data-theme="dark"] .brand-text) {
    text-shadow: 0.1875rem 0.1875rem 0 #000000;
    transform: skewX(-5deg);
}

:global(html[data-theme="dark"] .github-link) {
    border-width: 0.125rem;
    border-radius: 0.125rem;
    box-shadow: 0.25rem 0.25rem 0 #000000;
    transform: skewX(-5deg);
}

:global(html[data-theme="dark"] .github-link:hover) {
    color: #ffffff;
    background: var(--accent);
    box-shadow: 0.125rem 0.125rem 0 #000000;
    transform: translate(0.125rem, 0.125rem) skewX(-5deg);
}

:global(html[data-theme="dark"] .icon-button) {
    border-width: 0.125rem;
    border-radius: 0.125rem;
    box-shadow: 0.1875rem 0.1875rem 0 #000000;
    transform: rotate(-2deg);
}

:global(html[data-theme="dark"] .icon-button:hover) {
    color: #ffffff;
    background: var(--accent);
    transform: translate(0.125rem, 0.125rem) rotate(-2deg);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: opacity 160ms ease, transform 160ms ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-0.375rem);
}

@media (max-width: 720px) {
    :global(html[data-theme="light"] .site-header.at-top .icon-button) {
        border-color: #003490;
        color: #003490;
        background: #ffffff;
    }

    :global(html[data-theme="light"] .mobile-menu) {
        border: 0.125rem solid #003490;
        border-radius: 0.0625rem;
        background: #faffff;
        box-shadow: 0.4375rem 0.4375rem 0 #1de3e8;
    }

    .navbar {
        --ui-container-gutter: 2rem;
        min-height: 4rem;
        gap: 0.75rem;
    }

    .nav-links,
    .nav-actions > .github-link {
        display: none;
    }

    .nav-actions {
        margin-left: auto;
        gap: 0.5rem;
    }

    .menu-button {
        display: grid;
    }

    .mobile-menu {
        position: absolute;
        top: calc(100% + 0.5rem);
        right: 1rem;
        display: flex;
        width: min(17.5rem, calc(100vw - 2rem));
        flex-direction: column;
        gap: 0.125rem;
        padding: 0.5rem;
        border: 0.0625rem solid var(--border);
        border-radius: 1.125rem;
        background: var(--surface);
        box-shadow: var(--shadow);
    }

    :global(html[data-theme="dark"] .mobile-menu) {
        border-width: 0.125rem;
        border-radius: 0.1875rem;
        box-shadow: 0.5rem 0.5rem 0 #000000, 0.6875rem 0.6875rem 0 var(--accent);
    }

    .menu-link {
        padding: 0.75rem 0.875rem;
        border-radius: 0.6875rem;

        &:hover {
            background: var(--surface-muted);
        }
    }
}
</style>

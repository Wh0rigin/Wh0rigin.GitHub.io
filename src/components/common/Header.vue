<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useModeStore } from '../../stores/mode';

const modeStore = useModeStore();
const isOpen = ref(false);
const isAtTop = ref(true);

const checkScrollPosition = () => {
    isAtTop.value = window.scrollY === 0;
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
    <header :class="{ 'at-top': isAtTop }">
        <nav class="navbar" aria-label="主导航">
            <router-link to="/" class="brand" aria-label="The Wired World home" @click="closeMenu">
                <span class="brand-text"><span class="brand-prefix">THE</span> <span class="brand-accent">WIRED WORLD</span></span>
            </router-link>

            <div class="nav-links">
                <router-link to="/" class="nav-link">首页</router-link>
                <a class="nav-link" href="#page2">关于</a>
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
                    :aria-label="modeStore.theme === 'dark' ? '切换到日间模式' : '切换到夜间模式'"
                    :title="modeStore.theme === 'dark' ? '切换到日间模式' : '切换到夜间模式'"
                    @click="modeStore.toggleTheme"
                >
                    <svg v-if="modeStore.theme === 'dark'" aria-hidden="true" viewBox="0 0 24 24">
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
                <a class="menu-link" href="#page2" @click="closeMenu">关于</a>
                <a class="menu-link" href="https://github.com/Wh0rigin" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
        </Transition>
    </header>
</template>

<style lang="less" scoped>
header {
    position: fixed;
    inset: 0 0 auto;
    z-index: 1000;
    color: var(--text);
    background: color-mix(in srgb, var(--surface) 88%, transparent);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(16px);
    transition: background-color 220ms ease, border-color 220ms ease;
}

header.at-top {
    background: transparent;
    border-color: transparent;
    backdrop-filter: none;
}

.navbar {
    width: min(1120px, calc(100% - 48px));
    min-height: 72px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
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
    gap: 30px;
    margin-left: auto;
    margin-right: 14px;
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
    gap: 12px;
}

.github-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 15px;
    border: 1px solid var(--border);
    border-radius: 999px;
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
        width: 14px;
        height: 14px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
}

.icon-button {
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    border: 1px solid var(--border);
    border-radius: 50%;
    color: var(--text);
    background: var(--surface);
    cursor: pointer;
    transition: color 160ms ease, border-color 160ms ease, transform 160ms ease;

    &:hover {
        color: var(--accent-strong);
        border-color: var(--accent);
        transform: translateY(-1px);
    }

    &:focus-visible {
        outline: 3px solid var(--accent);
        outline-offset: 3px;
    }

    svg {
        width: 19px;
        height: 19px;
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

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: opacity 160ms ease, transform 160ms ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

@media (max-width: 720px) {
    .navbar {
        width: calc(100% - 32px);
        min-height: 64px;
        gap: 12px;
    }

    .nav-links,
    .nav-actions > .github-link {
        display: none;
    }

    .nav-actions {
        margin-left: auto;
        gap: 8px;
    }

    .menu-button {
        display: grid;
    }

    .mobile-menu {
        position: absolute;
        top: calc(100% + 8px);
        right: 16px;
        display: flex;
        width: min(280px, calc(100vw - 32px));
        flex-direction: column;
        gap: 2px;
        padding: 8px;
        border: 1px solid var(--border);
        border-radius: 18px;
        background: var(--surface);
        box-shadow: var(--shadow);
    }

    .menu-link {
        padding: 12px 14px;
        border-radius: 11px;

        &:hover {
            background: var(--surface-muted);
        }
    }
}
</style>

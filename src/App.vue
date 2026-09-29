<script setup lang="ts">
import { ref,onMounted,Ref } from 'vue';

import Header from './components/common/Header.vue';
import Footer from './components/common/Footer.vue';
import Loading from './components/common/Loading.vue';

import { useModeStore } from './stores/mode.ts'

// 预加载的图片资源
// import logo1_url from './assets/logo/logo1.png'
// import logo1_slink_url from './assets/logo/logo1_slink.png'
// import logo2_url from './assets/logo/logo2.png'
// import logo2_error_url from './assets/logo/logo2_error.png'
// import logo2_none_url from './assets/logo/logo2_none.png'
// import logo2_smile_url from './assets/logo/logo2_smile.png'
// import logo3_url from './assets/logo/logo3.png'

let logo1_url = 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo1.png'
let logo1_slink_url= 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo1_slink.png'
let logo2_url= 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo2.png'
let logo2_error_url = 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo2_error.png'
let logo2_none_url = 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo2_none.png'
let logo2_smile_url = 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo2_smile.png'
let logo3_url = 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo3.png'

let preloadedImages: Ref<Array<string>> = ref([])

onMounted(() => {
  const modeStore = useModeStore()
  modeStore.getNewRandomMode()
  switch (modeStore.mode) {
    case 0:
      preloadedImages.value = [logo1_slink_url, logo1_url];
      break;
    case 1:
      preloadedImages.value = [logo2_error_url, logo2_none_url, logo2_smile_url, logo2_url];
      break;
    case 2:
      preloadedImages.value = [logo3_url];
      break;
  }
  preloadedImages.value.forEach((imageUrl) => {
    const key = `preloadedImage_${imageUrl}`;
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, imageUrl);
    }
  });
})

</script>

<template>
  <Loading></Loading>
  <Header />
  <Transition name="nested">
    <router-view></router-view>
  </Transition>
  <Footer />
  <div style="display: none;">
    <img v-for="(imageUrl, index) in preloadedImages" :key="index" :src="imageUrl" />
  </div>
  
</template>

<style>
:root {
  color-scheme: light;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --page-bg: #063493;
  --surface: #faffff;
  --surface-muted: #d5f8ff;
  --text: #061b54;
  --text-muted: #355b90;
  --border: #0c6fc5;
  --accent: #10cbe5;
  --accent-strong: #096bd5;
  --accent-soft: #bbf3ff;
  --mint: #31f3ee;
  --shadow: 9px 9px 0 rgba(0, 27, 111, 0.8), 0 28px 48px rgba(0, 20, 80, 0.28);
  --footer-surface: #001b64;
  --footer-icon: #ffffff;
  --panel-radius: 3px;
  --panel-border-width: 2px;
  --theme-glow: rgba(49, 243, 238, 0.2);
  --theme-contrast: #ffffff;
  --page-pattern:
    radial-gradient(ellipse at 72% -14%, rgba(55, 255, 243, 0.9), transparent 40%),
    radial-gradient(ellipse at 90% 26%, rgba(26, 173, 232, 0.45), transparent 34%),
    linear-gradient(180deg, #0aace4 0%, #0879d1 22%, #064aa7 55%, #001d79 100%);
  --page-pattern-size: auto;
  --terminal-surface: #ffffff;
  --terminal-border: rgba(12, 116, 190, 0.2);
  --terminal-divider: rgba(12, 116, 190, 0.14);
  --terminal-text: #183858;
  --terminal-muted: #66809f;
  --terminal-prompt: #0787b5;
  --terminal-cursor: #116fc2;
}

html[data-theme="dark"] {
  color-scheme: dark;

  --page-bg: #09090c;
  --surface: #151519;
  --surface-muted: #212126;
  --text: #f6f2ec;
  --text-muted: #b9adb2;
  --border: rgba(255, 255, 255, 0.16);
  --accent: #e5222d;
  --accent-strong: #ff3842;
  --accent-soft: #351015;
  --mint: #f6eee3;
  --shadow: 12px 14px 0 rgba(0, 0, 0, 0.42), 0 24px 70px rgba(0, 0, 0, 0.34);
  --footer-surface: #111114;
  --footer-icon: var(--text);
  --panel-radius: 5px;
  --panel-border-width: 2px;
  --theme-glow: rgba(229, 34, 45, 0.28);
  --theme-contrast: #050506;
  --page-pattern:
    radial-gradient(circle, rgba(255, 255, 255, 0.075) 0 1px, transparent 1.5px),
    linear-gradient(118deg, transparent 0 57%, rgba(229, 34, 45, 0.085) 57% 66%, transparent 66%),
    linear-gradient(62deg, transparent 0 72%, rgba(255, 255, 255, 0.025) 72% 73%, transparent 73%);
  --page-pattern-size: 18px 18px, 100% 100%, 100% 100%;
  --terminal-surface: #0d0d10;
  --terminal-border: rgba(255, 56, 66, 0.72);
  --terminal-divider: rgba(255, 56, 66, 0.32);
  --terminal-text: #f5f0ea;
  --terminal-muted: #c8b9bd;
  --terminal-prompt: #ff3842;
  --terminal-cursor: #ffffff;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}

html {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

body {
  min-width: 320px;
  background-color: var(--page-bg);
  background-image: var(--page-pattern);
  background-size: var(--page-pattern-size);
  background-attachment: fixed;
  color: var(--text);
  transition: background-color 320ms ease, color 320ms ease;
}

button,
a {
  font: inherit;
}

a {
  color: inherit;
}

::selection {
  color: var(--text);
  background: var(--accent-soft);
}

#app {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  overflow-x: hidden;
  isolation: isolate;
}

#app::before {
  position: fixed;
  z-index: -1;
  inset: -12%;
  pointer-events: none;
  background: radial-gradient(circle at 50% 50%, var(--theme-glow), transparent 42%);
  opacity: 0.65;
  transform: translate3d(-8%, -4%, 0);
  animation: ambient-drift 18s ease-in-out infinite alternate;
  content: "";
}

@keyframes ambient-drift {
  to { transform: translate3d(9%, 7%, 0) scale(1.08); }
}

::view-transition-group(root) {
  animation-duration: 1160ms;
}

::view-transition-old(root) {
  animation: theme-old-shift 1160ms cubic-bezier(0.65, 0, 0.35, 1) both;
}

::view-transition-new(root) {
  animation: theme-new-reveal 1160ms cubic-bezier(0.65, 0, 0.35, 1) both;
}

@keyframes theme-old-shift {
  to { transform: scale(1.018); }
}

@keyframes theme-new-reveal {
  0% {
    clip-path: circle(0 at var(--theme-transition-x, 50vw) var(--theme-transition-y, 50vh));
    filter: brightness(0.92) saturate(0.88);
    animation-timing-function: cubic-bezier(0.55, 0, 0.72, 0.16);
  }
  12% {
    clip-path: circle(5vmax at var(--theme-transition-x, 50vw) var(--theme-transition-y, 50vh));
    filter: brightness(0.96) saturate(0.94);
    animation-timing-function: cubic-bezier(0.72, 0, 0.28, 1);
  }
  72% {
    clip-path: circle(118vmax at var(--theme-transition-x, 50vw) var(--theme-transition-y, 50vh));
    filter: brightness(1.04) saturate(1.06);
    animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  100% {
    clip-path: circle(160vmax at var(--theme-transition-x, 50vw) var(--theme-transition-y, 50vh));
    filter: brightness(1) saturate(1);
  }
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none !important;
  }

  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>

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

  --page-bg: #f6f7fb;
  --surface: #ffffff;
  --surface-muted: #eef0f7;
  --text: #202235;
  --text-muted: #697087;
  --border: rgba(35, 39, 65, 0.1);
  --accent: #6655dc;
  --accent-strong: #5643cb;
  --accent-soft: #edeaff;
  --mint: #39aa9d;
  --shadow: 0 24px 70px rgba(35, 39, 65, 0.1);
  --footer-surface: #e9ebf3;
  --terminal-surface: #ffffff;
  --terminal-border: rgba(35, 39, 65, 0.12);
  --terminal-divider: rgba(35, 39, 65, 0.1);
  --terminal-text: #263047;
  --terminal-muted: #697087;
  --terminal-prompt: #16845e;
  --terminal-cursor: #6655dc;
}

html[data-theme="dark"] {
  color-scheme: dark;

  --page-bg: #10121b;
  --surface: #191c28;
  --surface-muted: #222635;
  --text: #f1f2fa;
  --text-muted: #a5abc0;
  --border: rgba(223, 226, 255, 0.12);
  --accent: #a99aff;
  --accent-strong: #c2b8ff;
  --accent-soft: #2c2845;
  --mint: #70d8c9;
  --shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
  --footer-surface: #171a25;
  --terminal-surface: #171b27;
  --terminal-border: rgba(255, 255, 255, 0.08);
  --terminal-divider: rgba(255, 255, 255, 0.08);
  --terminal-text: #d8deec;
  --terminal-muted: #969eb2;
  --terminal-prompt: #78d6a4;
  --terminal-cursor: #b5a8ff;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}

body {
  min-width: 320px;
  background: var(--page-bg);
  color: var(--text);
  transition: background-color 220ms ease, color 220ms ease;
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
  min-height: 100vh;
  min-height: 100svh;
  overflow-x: hidden;
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
</style>

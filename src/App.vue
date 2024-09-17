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
  <Header color="#bd34fe" />
  <Transition name="nested">
    <router-view></router-view>
  </Transition>
  <Footer />
  <div style="display: none;">
    <img v-for="(imageUrl, index) in preloadedImages" :key="index" :src="imageUrl" />
  </div>
  
</template>

<style>
* {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
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

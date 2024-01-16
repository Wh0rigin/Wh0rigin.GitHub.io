<script setup lang="ts">
import Header from './components/common/Header.vue';
import Footer from './components/common/Footer.vue';
import Loading from './components/common/Loading.vue';

// 预加载的图片资源
import logo1_url from './assets/logo/logo1.png'
import logo1_slink_url from './assets/logo/logo1_slink.png'
import logo2_url from './assets/logo/logo2.png'
import logo2_error_url from './assets/logo/logo2_error.png'
import logo2_none_url from './assets/logo/logo2_none.png'
import logo2_smile_url from './assets/logo/logo2_smile.png'
import logo3_url from './assets/logo/logo3.png'
const logos:Array<string> = [
    logo1_url,
    logo2_url,
    logo3_url,
    logo1_slink_url,
    logo2_error_url,
    logo2_none_url,
    logo2_smile_url
]

</script>

<template>
  <Loading></Loading>
  <Header color="#bd34fe" />
  <Transition name="nested">
    <router-view></router-view>
  </Transition>
  <Footer />
  <div style="display: none;">
    <img v-for="(item,key) in logos" :key="key" :src="item">
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}

.nested-enter-active ,
.nested-leave-active  {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from ,
.nested-leave-to  {
  transform: translateX(30px);
  opacity: 0;
}


</style>

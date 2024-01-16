<script setup lang="ts">
import Header from './components/common/Header.vue';
import Footer from './components/common/Footer.vue';
import Loading from './components/common/Loading.vue';
</script>

<template>
  <Loading></Loading>
  <Header color="#bd34fe" />
  <Transition name="nested">
    <router-view></router-view>
  </Transition>
  <Footer />
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

<script setup lang="ts">
import Header from './components/common/Header.vue';
import Footer from './components/common/Footer.vue';
</script>

<template>
  <Header />
  <Transition>
    <router-view></router-view>
  </Transition>
  <Footer />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

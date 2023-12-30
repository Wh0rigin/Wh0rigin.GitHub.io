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

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

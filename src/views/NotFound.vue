<script lang="ts" setup>
</script>

<template>
    <div class="not-found-container">
        <h1 class="not-found-title">404</h1>
        <p class="not-found-message">Oops! Something went wrong. This page doesn't exist.</p>
        <router-link to="/" class="home-link">Go back to Home</router-link>
        <div class="funny-image"></div>
    </div>
</template>


<style lang="less">
.not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;

    .not-found-title {
        font-size: 8em;
        margin: 0;
        color: #f00;
    }

    .not-found-message {
        font-size: 1.5em;
        color: #333;
        margin: 10px 0;
    }

    .home-link {
        margin-top: 20px;
        color: #3498db;
        text-decoration: none;
        font-size: 1.2em;
    }

    .funny-image {
        width: 200px;
        height: 200px;
        background: url('https://placekitten.com/200/200') center/cover;
        margin-top: 20px;
        border-radius: 50%;
    }
}
</style>
  
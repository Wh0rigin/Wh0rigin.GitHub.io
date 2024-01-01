<script lang="ts" setup>
// d是阿里矢量库的那一坨d
const props = defineProps({
    url: String,
    d: String,
    color: String,
});
</script>

<template>
    <a class="media-container" :href="props.url">
        <span></span>
        <span></span>
        <span></span>
        <span><svg viewBox="0 0 1024 1024" width="50" height="50">
                <path
                    :d="props.d"
                    fill="#ffffff"></path>
            </svg></span>
    </a>
</template>

<style lang="less" scoped>
.media-container {
    position: relative;
    width: 60px;
    height: 60px;
    margin: 0 30px;
    transform: rotate(-30deg) skew(25deg);
    cursor: pointer;
    filter: drop-shadow(0 0 1rem v-bind("props.color"));

    // background: #ccc;
    span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: v-bind("props.color");
        transition: 0.5s;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &:hover {
        span {
            &:nth-child(5) {
                transform: translate(40px, -40px);
                opacity: 1;
            }

            &:nth-child(4) {
                transform: translate(30px, -30px);
                opacity: 0.8;
            }

            &:nth-child(3) {
                transform: translate(20px, -20px);
                opacity: 0.6;
            }

            &:nth-child(2) {
                transform: translate(10px, -10px);
                opacity: 0.4;
            }

            &:nth-child(1) {
                transform: translate(0, 0);
                opacity: 0.2;
            }
        }
    }
}</style>
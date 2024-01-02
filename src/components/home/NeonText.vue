<script lang="ts" setup>
const props = defineProps({
    'text': String,
    'color': String
});
</script>

<template>
    <div class="neon-wrap">
        <span class="neon-text">{{ props.text }}</span>
    </div>
</template>

<style lang="less" scoped>
.neon-wrap {

    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    // text-align: center;
    span {
        display: block;
    }
}

.neon-text {
    font-family: 'Monoton', cursive;
    // font-size: 3rem;
    animation: neon 4s infinite;
}

.neon-by {
    color: v-bind("props.color");
    text-shadow: -3px 0px 5px v-bind("props.color"), 0px 0px 2px v-bind("props.color");
}

@keyframes neon {

    0%,
    30%,
    32%,
    34% {
        color: #222;
        text-shadow: -3px 0px 5px #222, 0px 0px 2px #222;
    }

    31%,
    33%,
    35%,
    100% {
        color: v-bind("props.color");
        text-shadow: -3px 0px 5px v-bind("props.color"), 0px 0px 2px v-bind("props.color");
    }
}
</style>
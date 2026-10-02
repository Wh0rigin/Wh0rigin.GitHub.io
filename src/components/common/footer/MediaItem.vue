<script lang="ts" setup>
// d是阿里矢量库的那一坨d
const props = defineProps({
    url: String,
    d: String,
    color: String,
    iconColor: { type: String, default: '#ffffff' },
    crisp: Boolean,
});
</script>

<template>
    <a class="media-container" :class="{ 'is-crisp': props.crisp }" :href="props.url">
        <span></span>
        <span></span>
        <span></span>
        <span><svg viewBox="0 0 1024 1024" width="50" height="50" aria-hidden="true">
                <path
                    :d="props.d"
                    :fill="props.iconColor"></path>
            </svg></span>
    </a>
</template>

<style lang="less" scoped>
.media-container {
    position: relative;
    width: 3.75rem;
    height: 3.75rem;
    margin: 0 1.875rem;
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
                transform: translate(2.5rem, -2.5rem);
                opacity: 1;
            }

            &:nth-child(4) {
                transform: translate(1.875rem, -1.875rem);
                opacity: 0.8;
            }

            &:nth-child(3) {
                transform: translate(1.25rem, -1.25rem);
                opacity: 0.6;
            }

            &:nth-child(2) {
                transform: translate(0.625rem, -0.625rem);
                opacity: 0.4;
            }

            &:nth-child(1) {
                transform: translate(0, 0);
                opacity: 0.2;
            }
        }
    }
}

.media-container.is-crisp {
    filter: drop-shadow(0.1875rem 0.25rem 0 rgba(0, 0, 0, .28));

    span { border: 0.125rem solid #101014; }
    span:last-child { opacity: 1; }
}

.media-container:focus-visible {
    outline: 0.1875rem solid var(--accent);
    outline-offset: 0.4375rem;
}

@media (prefers-reduced-motion: reduce) {
    .media-container span { transition: none; }
}
</style>

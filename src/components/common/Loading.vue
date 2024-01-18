<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FlipTextCarousel from './FlipTextCarousel.vue';
import router from '../../router';



var loaded = ref(false);

const check_loading = function () {
    let timer = setInterval(() => {
        if (document.readyState == 'complete') {
            clearInterval(timer)
            loaded.value = true
        }
    }, 500)
}

onMounted(() => {
    router.beforeEach((_to, _from, next) => {
        // 在路由切换前执行逻辑
        loaded.value = false
        setTimeout(() => {
            next()
        }, 1000)
    })

    router.afterEach((_to, _from) => {
        // 在路由切换后执行逻辑
        check_loading()
    });

});

</script>

<template>
    <div class="loading" :class="{ 'loading_out': loaded }">
        <div class="center"></div>
        <p>
            <span style="--index: 1;">L</span>
            <span style="--index: 2;">O</span>
            <span style="--index: 3;">A</span>
            <span style="--index: 4;">D</span>
            <span style="--index: 5;">I</span>
            <span style="--index: 6;">N</span>
            <span style="--index: 7;">G</span>
            <span style="--index: 8;">.</span>
            <span style="--index: 9;">.</span>
            <span style="--index: 10;">.</span>
        </p>
        <flip-text-carousel></flip-text-carousel>
    </div>
</template>

<style lang="less" scoped  >
.loading {
    position: fixed;
    flex-direction: column;
    display: flex;
    top: 0;
    margin: 0;
    width: 100%;
    justify-content: center;
    align-items: center;

    height: 100vh;
    background-color: #f7f7f7;
    z-index: 1000000000000;
    transition: 1s ease;



    p {
        font-family: sans-serif;
        font-size: 2rem;
        color: #171717;
        align-items: center;
        font-weight: 900;
        transition: 0.3s ease;
        text-align: center;

        span {
            margin-bottom: 0;
            display: inline-block;
            animation: jump 7s infinite;
            animation-delay: calc(0.1s * var(--index));

            @keyframes jump {
                0% {
                    transform: translateY(0);
                    // opacity: 0;
                }

                10% {
                    transform: translateY(-20px);
                    // opacity: 1;
                }

                20% {
                    transform: translateY(0);
                    // opacity: 0;
                }

                30% {
                    transform: translateY(-20px);
                    // opacity: 1;
                }

                40% {
                    transform: translateY(0);
                    // opacity: 0;
                }

                50% {
                    transform: translateY(-20px);
                    // opacity: 1;
                }

                60% {
                    transform: translateY(0);
                    // opacity: 0;
                }

                70% {
                    transform: translateY(-20px);
                    // opacity: 1;
                }

                80% {
                    transform: translateY(0);
                    // opacity: 0;
                }

                90% {
                    transform: translateY(-20px);
                    // opacity: 1;
                }

                100% {
                    transform: translateY(0);
                    // opacity: 1;
                }
            }
        }

    }



}

.loading_out {
    transform: translateY(100%);

    p {
        opacity: 0;
    }

}
</style>
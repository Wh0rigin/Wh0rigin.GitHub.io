<script lang="ts" setup>
// import {ref} from 'vue';
import WhoIntro from '../components/home/WhoIntro.vue';
// let imgUrl = ref(require('../assets/logo.png'))
</script>

<template>
    <div class="container">
        <div class="page1">
            <div class="img-container">
                <div class="img-bg"></div>
                <img class="logo" src="../assets/logo.png"  />
            </div>

            <div class="title">
                <div class="title-header">
                    <div class="cn">欢迎来到</div>
                    <div class="en">Welcome to</div>
                </div>
                <div class="title-footer">
                    <div class="cn">连线世界</div>
                    <div class="en">The Wired World</div>
                </div>
            </div>
        </div>
        <div class="page2">
            <who-intro></who-intro>
        </div>
    </div>
</template>



<style lang="less" scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .page1 {
        width: 80%;
        height: 100vh;
        border-bottom: 1px solid gainsboro;
        // align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: center;

        @media (max-width: 992px) {
            flex-direction: column;
            overflow: hidden;
        }

        .img-container {
            position: relative;
            margin: 0 auto;
            .img-bg {
                position: absolute;
                top: 35%;
                left: 50%;
                border-radius: 50%;
                width: 500px;
                height: 500px;
                z-index: -1;
                background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50% );
                filter: blur(72px);
                transform: translate(-50%, -50%);
            }

            .logo {
                margin-top: 50px;
                // height: 500px;
                width: 500px;
                // filter: drop-shadow(4rem -4rem 2rem red)  drop-shadow(-4rem 4rem 2rem green) drop-shadow(-4rem -4rem 2rem blue);
            }
        }



        .title {


            // font-size: 7em;
            .cn {

                font-size: 7em;
                filter: drop-shadow(3px 3px red) sepia(100%) drop-shadow(-3px -3px blue);

                @media (max-width: 992px) {
                    font-size: 5em;
                }
            }

            .en {
                color: gray;
                font-size: 3em;
                filter: drop-shadow(3px 3px red) sepia(100%) drop-shadow(-3px -3px blue);

                @media (max-width: 992px) {
                    font-size: 3em;
                }
            }

            display: flex;
            flex-direction: column;
            width: 60%;
            justify-content: center;

            @media (max-width: 992px) {
                width: 100%;
            }

            .title-header {
                display: flex;
                flex-direction: column;

                @media (max-width: 992px) {
                    flex-direction: row;
                    justify-content: center;
                }
            }

            .title-footer {
                display: flex;
                flex-direction: column;

                @media (max-width: 992px) {
                    flex-direction: row;
                    justify-content: center;
                }

                .cn,
                .en {
                    @media (max-width: 992px) {
                        white-space: inherit;
                    }

                    filter: drop-shadow(3px 3px red) drop-shadow(-3px -3px blue);
                    display: flex;
                    flex-direction: row;
                    justify-content: end;
                }

            }
        }
    }

    .page2 {
        width: 80%;
        height: 100vh;
        border-bottom: 1px solid gainsboro;
    }
}</style>
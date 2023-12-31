<script lang="ts" setup>
import WhoIntro from '../components/home/WhoIntro.vue';
import CodeWin from '../components/home/CodeWin.vue';
</script>

<template>
    <div class="container">
        <div class="page1">

            <div class="left-container">
                <img class="logo" src="../assets/logo.png" />
            </div>


            <div class="title">
                <div class="img-bg"></div>
                <div class="title-header">
                    <div class="cn">欢迎来到</div>
                    <div class="en">Welcome to</div>
                </div>
                <div class="title-footer">
                    <div class="cn">连线世界</div>
                    <div class="en">The Wired World</div>
                </div>
            </div>


            <a class="cursor" href="#page2"><svg t="1704031982313" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4208" width="40" height="40">
                    <path
                        d="M512.0512 768c3.456 0.042667 6.741333-0.554667 10.112-1.322667 1.450667-0.341333 2.858667-0.554667 4.266667-1.066666 6.954667-2.304 13.525333-5.717333 18.688-11.477334l382.762666-427.178666a42.461867 42.461867 0 0 0-3.754666-60.288c-17.834667-15.573333-45.312-13.909333-61.098667 3.712L512.0512 662.101333l-351.061333-391.722666c-15.786667-17.621333-43.264-19.285333-61.098667-3.712a42.461867 42.461867 0 0 0-3.754667 60.288l382.848 427.178666c5.162667 5.76 11.733333 9.173333 18.688 11.477334 1.408 0.512 2.816 0.725333 4.266667 1.066666 3.370667 0.768 6.656 1.365333 10.112 1.322667"
                        fill="#515152" p-id="4209"></path>
                </svg></a>
        </div>
        <div id="page2" class="page2">
            <who-intro style="flex: 1;"></who-intro>
            <code-win style="flex: 1;"></code-win>
        </div>
    </div>
</template>



<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
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
        overflow: hidden;

        .cursor {
            top: 95%;
            position: absolute;
            animation: floatMove 1.5s infinite;
            -webkit-animation: floatMove 1.5s infinite;

            @keyframes floatMove {
                0% {
                    transform: translate(0px, 0px);
                }

                50% {
                    transform: translate(0px, -10px);
                }

                100% {
                    transform: translate(0px, 0px);
                }
            }

            /*Safari 和 Chrome:*/
            @-webkit-keyframes floatMove {
                0% {
                    transform: translate(0px, 0px);
                }

                50% {
                    transform: translate(0px, -10px);
                }

                100% {
                    transform: translate(0px, 0px);
                }
            }

        }

        @media (max-width: 992px) {
            flex-direction: column;
            // overflow: hidden;
            height: auto;
        }

        .img-bg {
            position: absolute;
            top: 45%;
            left: 65%;
            z-index: -1;
            border-radius: 50%;
            width: 700px;
            height: 350px;
            background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
            filter: blur(180px);
            transform: translate(-50%, -50%);

            @media (max-width: 992px) {
                display: none;
            }
        }

        .left-container {
            display: flex;
            flex-direction: column;

            .code-container {
                background-color: rgb(38, 50, 56);
                margin-top: 10px;
                width: 100%;
                height: 300px;
                border-radius: 5px;
            }

            .logo {
                margin-top: 15%;
                // height: 500px;
                width: 100%;

                &:hover {
                    filter: drop-shadow(0 0 2em gray);
                }
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
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
}
</style>
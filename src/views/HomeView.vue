<script lang="ts" setup>
import WhoIntro from '../components/home/WhoIntro.vue';
import CodeWin from '../components/home/CodeWin.vue';
import NeonText from '../components/home/NeonText.vue';

// import { onMounted, ref, onUnmounted } from 'vue';

import { ref} from 'vue';
// const fallbackImageUrl = 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo3.png'


// const preloadedImages: Array<string> = [
//     'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo1.png',
//     'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo1_slink.png',
//     'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2.png',
//     'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2_smile.png',
//     'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2_none.png',
//     'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2_error.png',
//     // 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo3_none.png',
// ]

// // 网络资源
// '/src/assets/logo/logo1.png'
// let img_url = ref(`https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo1.png`)
// let timerId: any;
// onMounted(() => {

//     preloadedImages.forEach((imageUrl, index) => {
//         const key = `preloadedImage_${index}`;
//         if (!localStorage.getItem(key)) {
//             localStorage.setItem(key, imageUrl);
//         }
//     });

//     // '/src/assets/logo/logo1.png'
//     img_url.value = `https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo${(Math.floor(Math.random() * 3) + 1)}.png`
//     switch (img_url.value) {
//         case 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo1.png':
//             timerId = setInterval(() => {
//                 img_url.value = 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo1_slink.png'
//                 setTimeout(() => {
//                     img_url.value = 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo1.png'
//                 }, 100);
//             }, 5000); // 每5秒执行一次眨眼
//             break;
//         case 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2.png':
//             timerId = setInterval(() => {
//                 switch ((Math.floor(Math.random() * 3) + 1)) {
//                     case 1:
//                         img_url.value = 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2_smile.png'
//                         break;
//                     case 2:
//                         img_url.value = 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2_none.png'
//                         break;
//                     case 3:
//                         img_url.value = 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2_error.png'
//                         break;
//                 }
//                 // if((Math.floor(Math.random() * 2) +1) == 2){
//                 //     img_url.value = '/src/assets/logo/logo2_none.png'
//                 // }else{
//                 //     img_url.value = '/src/assets/logo/logo2_smile.png'
//                 // }

//                 setTimeout(() => {
//                     img_url.value = 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2.png'
//                 }, (Math.floor(Math.random() * 250) + 1));
//             }, (Math.floor(Math.random() * 10000) + 1000));
//             break;
//         case 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo3.png':
//             break;
//     }
// });
// onUnmounted(() => {
//     clearInterval(timerId);
// })

// const mousedown = () => {
//     switch (img_url.value) {
//         case 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo1.png':

//             img_url.value = 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo1_slink.png'

//             break;
//         case 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2.png':

//             switch ((Math.floor(Math.random() * 3) + 1)) {
//                 case 1:
//                     img_url.value = 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2_smile.png'
//                     break;
//                 case 2:
//                     img_url.value = 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2_none.png'
//                     break;
//                 case 3:
//                     img_url.value = 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2_error.png'
//                     break;
//             }
//             break;
//         case 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo3.png':
//             break;
//     }
// }

// const mouseup = () => {
//     switch (img_url.value) {
//         case 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo1_slink.png':

//             img_url.value = 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo1.png'
//             break;
//         case 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2_smile.png':
//         case 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2_none.png':
//         case 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2_error.png':
//             img_url.value = 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo2.png'
//             break;
//         case 'https://raw.githubusercontent.com/Wh0rigin/Wh0rigin.GitHub.io/main/src/assets/logo/logo3.png':
//             break;
//     }
// }

// const handleImageError = function () {
//     // 图片加载失败时触发此方法
//     // 切换到另一张图片
//     img_url.value = fallbackImageUrl;
// }

import logo1_url from '../assets/logo/logo1.png'
// 本地资源

// import getAssets from '../utils/pub-use'
let img_url = ref(logo1_url)
// let timerId: any;
// onMounted(() => {
//     // '/src/assets/logo/logo1.png'
//     img_url.value = getAssets(`../assets/logo/logo${(Math.floor(Math.random() * 3) + 1)}.png`)
//     switch (img_url.value) {
//         case getAssets('../assets/logo/logo1.png'):
//             timerId = setInterval(() => {
//                 img_url.value = getAssets('../assets/logo/logo1_slink.png')
//                 setTimeout(() => {
//                     img_url.value = getAssets('../assets/logo/logo1.png')
//                 }, 100);
//             }, 5000); // 每5秒执行一次眨眼
//             break;
//         case getAssets('../assets/logo/logo2.png'):
//             timerId = setInterval(() => {
//                 switch ((Math.floor(Math.random() * 3) + 1)) {
//                     case 1:
//                         img_url.value = getAssets('../assets/logo/logo2_smile.png')
//                         break;
//                     case 2:
//                         img_url.value = getAssets('../assets/logo/logo2_none.png')
//                         break;
//                     case 3:
//                         img_url.value = getAssets('../assets/logo/logo2_error.png')
//                         break;
//                 }
//                 setTimeout(() => {
//                     img_url.value = getAssets('../assets/logo/logo2.png')
//                 }, (Math.floor(Math.random() * 250) + 1));
//             }, (Math.floor(Math.random() * 10000) + 1000));
//             break;
//         case getAssets('../assets/logo/logo3.png'):
//             break;
//     }
// });
// onUnmounted(() => {
//     clearInterval(timerId);
// })

// const mousedown = () => {
//     switch (img_url.value) {
//         case getAssets('../assets/logo/logo1.png'):

//             img_url.value = getAssets('../assets/logo/logo1_slink.png')

//             break;
//         case getAssets('../assets/logo/logo2.png'):

//             switch ((Math.floor(Math.random() * 3) + 1)) {
//                 case 1:
//                     img_url.value = getAssets('../assets/logo/logo2_smile.png')
//                     break;
//                 case 2:
//                     img_url.value = getAssets('../assets/logo/logo2_none.png')
//                     break;
//                 case 3:
//                     img_url.value = getAssets('../assets/logo/logo2_error.png')
//                     break;
//             }
//             break;
//         case getAssets('../assets/logo/logo3.png'):
//             break;
//     }
// }

// const mouseup = () => {
//     switch (img_url.value) {
//         case getAssets('../assets/logo/logo1_slink.png'):

//             img_url.value = getAssets('../assets/logo/logo1.png')
//             break;
//         case getAssets('../assets/logo/logo2_smile.png'):
//         case getAssets('../assets/logo/logo2_none.png'):
//         case getAssets('../assets/logo/logo2_error.png'):
//             img_url.value = getAssets('../assets/logo/logo2.png')
//             break;
//         case getAssets('../assets/logo/logo3.png'):
//             break;
//     }
// }

</script>

<template>
    <div class="container">
        <!-- <img v-for="(imageUrl, index) in preloadedImages" :key="index" :src="imageUrl" style="display: none;" /> -->
        <div class="page1">

            <div class="left-container">
                <!-- 有动画 -->
                <!-- <img class="logo" draggable="false" @mousedown="mousedown" @mouseup="mouseup" :src="img_url"
                    @error.once="handleImageError" /> -->

                    <img class="logo" draggable="false" :src="img_url"/>
                <!-- 无动画 -->
                <!-- <img class="logo" draggable="false" src="../assets/logo/logo2.png" /> -->
            </div>


            <div class="title">
                <div class="img-bg"></div>
                <div class="title-header">
                    <div class="cn">
                        <span><i></i>欢</span>
                        <span><i></i>迎</span>
                        <span><i></i>来</span>
                        <span><i></i>到</span>
                    </div>
                    <!-- <div class="en">Welcome to</div> -->
                    <neon-text class="en" text="Welcome to" color="#47caff"></neon-text>
                </div>
                <div class="title-footer">

                    <div class="cn"><i></i>连 线 世 界</div>


                    <!-- <div class="en">The Wired World</div> -->
                    <neon-text class="en" text="The Wired World" color="#bd34fe"></neon-text>
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
                width: 753px;
                transition: 0.5s ease-in-out;

                &:hover {
                    transition: 0.5s ease-in-out;
                    filter: drop-shadow(0 0 2em gray);
                }

                @media (max-width: 992px) {
                    width: 100%;
                }
            }
        }

        .title {

            // font-size: 7em;
            .cn {
                position: relative;
                display: flex;
                gap: 5px;
                font-weight: 900;
                // color: aliceblue;
                font-size: 7em;
                filter: drop-shadow(3px 3px red) sepia(100%) drop-shadow(-3px -3px blue);
                cursor: default;

                @media (max-width: 992px) {
                    font-size: 5em;
                }

                span {
                    position: relative;
                    // filter: blur(5px);
                    padding: 0 5px;
                    transition: 0.5s;

                    &:hover {
                        filter: blur(0px);
                        transition: 0s;

                        i::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 2px;
                            height: 8px;
                            background: #fff;
                            box-shadow:
                                0 145px #fff,
                                116px 145px #fff,
                                116px 0 #fff;
                        }

                        i::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 8px;
                            height: 2px;
                            background: #fff;
                            box-shadow:
                                0 152px #fff,
                                110px 152px #fff,
                                110px 0 #fff;
                        }
                    }

                    i {
                        position: absolute;
                        inset: 0;
                        background: transparent;
                    }
                }

            }

            .en {
                // color: gray;
                font-size: 3em;
                filter: drop-shadow(3px 3px red) drop-shadow(-3px -3px blue);
                cursor: default;

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



                    i::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 2px;
                        height: 8px;
                        background: #fff;
                        box-shadow:
                            0 145px #fff,
                            116px 145px #fff,
                            116px 0 #fff;
                        animation: move-before 10s infinite;
                    }

                    i::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 8px;
                        height: 2px;
                        background: #fff;
                        box-shadow:
                            0 152px #fff,
                            110px 152px #fff,
                            110px 0 #fff;
                        animation: move-after 10s infinite;
                    }

                    @keyframes move-after {
                        0% {
                            top: 0;
                            left: 0;
                        }

                        25% {
                            left: 105%;
                        }

                        35% {
                            left: 105%;
                        }

                        45% {
                            left: 47%;
                            box-shadow:
                                0 152px #fff,
                                110px 152px #fff,
                                110px 0 #fff;
                        }

                        50% {
                            left: 47%;
                            box-shadow:
                                0 60px #fff,
                                30px 60px #fff,
                                30px 0 #fff;
                        }

                        55% {
                            left: 47%;
                            box-shadow:
                                0 152px #fff,
                                110px 152px #fff,
                                110px 0 #fff;
                        }

                        65% {
                            left: 28%;
                            box-shadow:
                                0 152px #fff,
                                110px 152px #fff,
                                110px 0 #fff;
                        }

                        70% {
                            left: 28%;
                            box-shadow:
                                0 60px #fff,
                                30px 60px #fff,
                                30px 0 #fff;
                        }

                        75% {
                            left: 28%;
                            box-shadow:
                                0 152px #fff,
                                110px 152px #fff,
                                110px 0 #fff;
                        }

                        80% {
                            left: 47%;
                        }

                        85% {
                            left: 47%;
                        }

                        100% {
                            top: 0;
                            left: 0;
                        }
                    }

                    @keyframes move-before {
                        0% {
                            top: 0;
                            left: 0;
                        }

                        25% {
                            left: 105%;
                        }

                        35% {
                            left: 105%;
                        }

                        45% {
                            left: 47%;
                            box-shadow:
                                0 145px #fff,
                                116px 145px #fff,
                                116px 0 #fff;
                        }

                        50% {
                            left: 47%;
                            box-shadow:
                                0 53px #fff,
                                36px 53px #fff,
                                36px 0 #fff;
                        }

                        55% {
                            left: 47%;
                            box-shadow:
                                0 145px #fff,
                                116px 145px #fff,
                                116px 0 #fff;
                        }

                        65% {
                            left: 28%;
                            box-shadow:
                                0 145px #fff,
                                116px 145px #fff,
                                116px 0 #fff;
                        }

                        70% {
                            left: 28%;
                            box-shadow:
                                0 53px #fff,
                                36px 53px #fff,
                                36px 0 #fff;
                        }

                        75% {
                            left: 28%;
                            box-shadow:
                                0 145px #fff,
                                116px 145px #fff,
                                116px 0 #fff;
                        }

                        80% {
                            left: 47%;
                        }

                        85% {
                            left: 47%;
                        }

                        100% {
                            top: 0;
                            left: 0;
                        }
                    }
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

        @media (max-width: 992px) {
            flex-direction: column;
            // overflow: hidden;
            height: auto;
        }
    }
}
</style>
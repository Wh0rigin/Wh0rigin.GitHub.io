<script lang="ts" setup>
import { onMounted, ref,Ref, onUnmounted } from 'vue';
import { useModeStore } from '../stores/mode';

import WhoIntro from '../components/home/WhoIntro.vue';
import CodeWin from '../components/home/CodeWin.vue';
import EducationJourney from '../components/home/EducationJourney.vue';
import FeaturedProjects from '../components/home/FeaturedProjects.vue';
import MusicSpotlight from '../components/home/MusicSpotlight.vue';
import AcgInterests from '../components/home/AcgInterests.vue';
import WiredImage from '../components/ui/WiredImage.vue';

// import logo1_url from '../assets/logo/logo1.png'
// import logo1_slink_url from '../assets/logo/logo1_slink.png'
// import logo2_url from '../assets/logo/logo2.png'
// import logo2_error_url from '../assets/logo/logo2_error.png'
// import logo2_none_url from '../assets/logo/logo2_none.png'
// import logo2_smile_url from '../assets/logo/logo2_smile.png'
// import logo3_url from '../assets/logo/logo3.png'

let logo1_url = 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo1.png'
let logo1_slink_url= 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo1_slink.png'
let logo2_url= 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo2.png'
let logo2_error_url = 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo2_error.png'
let logo2_none_url = 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo2_none.png'
let logo2_smile_url = 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo2_smile.png'
let logo3_url = 'https://wh0rigin.oss-cn-hangzhou.aliyuncs.com/assets/logo/logo3.png'


const modeStore = useModeStore()



// let preloadedImages: Array<string> = [

// ]


// const handleImageError = function () {
//     // 图片加载失败时触发此方法
//     // 切换到另一张图片
//     img_url.value = fallbackImageUrl;
// }


const logos:Array<string> = [
    logo1_url,
    logo2_url,
    logo3_url,
    logo1_slink_url,
    logo2_error_url,
    logo2_none_url,
    logo2_smile_url
]
// 本地资源

let img_url:Ref<string> = ref('')
const heroLoadedSrc = ref('');
const logoDimensions = [{ width: 897, height: 1021 }, { width: 759, height: 1021 }, { width: 1520, height: 1651 }];
let timerId: any;
onMounted(() => {
    img_url.value = logos[modeStore.mode]
    // switch(img_url.value){
    //     case logos[0]:
    //         preloadedImages = [logo1_slink_url,logo1_url];
    //         break;
    //     case logos[1]:
    //         preloadedImages = [logo2_error_url,logo2_none_url,logo2_smile_url,logo2_url];
    //         break;
    //     case logos[2]:
    //         preloadedImages = [logo3_url];
    //         break;
    // }

    // preloadedImages.forEach((imageUrl) => {
    //     const key = `preloadedImage_${imageUrl}`;
    //     if (!localStorage.getItem(key)) {
    //         localStorage.setItem(key, imageUrl);
    //     }
    // });

    
    switch (img_url.value) {
        case logos[0]:
            timerId = setInterval(() => {
                img_url.value = logos[3]
                setTimeout(() => {
                    img_url.value = logos[0]
                }, 100);
            }, 5000); // 每5秒执行一次眨眼
            break;
        case logos[1]:
            timerId = setInterval(() => {
                img_url.value = logos[(Math.floor(Math.random() * 3) + 4)]
                let time = Math.floor(Math.random() * 400) + 100
                setTimeout(() => {
                    img_url.value =logos[1]
                }, time);
            }, (Math.floor(Math.random() * 10000) + 1000));
            break;
        case logos[2]:
            break;
    }
});
onUnmounted(() => {
    clearInterval(timerId);
})

const mousedown = () => {
    switch (img_url.value) {
        case logos[0]:

            img_url.value = logos[3]

            break;
        case logos[1]:

            switch ((Math.floor(Math.random() * 3) + 1)) {
                case 1:
                    img_url.value = logos[4]
                    break;
                case 2:
                    img_url.value = logos[5]
                    break;
                case 3:
                    img_url.value = logos[6]
                    break;
            }
            break;
        case logos[2]:
            break;
    }
}

const mouseup = () => {
    switch (img_url.value) {
        case logos[3]:
            img_url.value = logos[0]
            break;
        case logos[4]:
        case logos[5]:
        case logos[6]:
            img_url.value = logos[1]
            break;
        case logos[2]:
            break;
    }
}

</script>

<template>
    <main class="home">
        <div class="theme-atmosphere" aria-hidden="true">
            <span class="motif-ring motif-ring-one"></span>
            <span class="motif-ring motif-ring-two"></span>
            <span class="motif-sweep motif-sweep-one"></span>
            <span class="motif-sweep motif-sweep-two"></span>
        </div>

        <section id="top" class="hero wired-container" aria-labelledby="hero-title">
            <div class="hero-golden" aria-hidden="true">
                <svg class="golden-rainbow" viewBox="0 0 1000 900" preserveAspectRatio="xMidYMid slice">
                    <g fill="none" stroke-width="15">
                        <path stroke="#161512" d="M-120 730C190 740 180 180 530 285S825 600 1130 235" />
                        <path stroke="#fffdf0" transform="translate(0 19)" d="M-120 730C190 740 180 180 530 285S825 600 1130 235" />
                        <path stroke="#ee7626" transform="translate(0 38)" d="M-120 730C190 740 180 180 530 285S825 600 1130 235" />
                        <path stroke="#e64669" transform="translate(0 57)" d="M-120 730C190 740 180 180 530 285S825 600 1130 235" />
                        <path stroke="#fffdf0" transform="translate(0 76)" d="M-120 730C190 740 180 180 530 285S825 600 1130 235" />
                        <path stroke="#42b762" transform="translate(0 95)" d="M-120 730C190 740 180 180 530 285S825 600 1130 235" />
                        <path stroke="#46cbd4" transform="translate(0 114)" d="M-120 730C190 740 180 180 530 285S825 600 1130 235" />
                        <path stroke="#fffdf0" transform="translate(0 133)" d="M-120 730C190 740 180 180 530 285S825 600 1130 235" />
                    </g>
                    <g fill="#fffdf0">
                        <path d="m756 123 10-33 10 33 33 10-33 10-10 33-10-33-33-10zM199 416l7-22 7 22 22 7-22 7-7 22-7-22-22-7zM861 650l8-26 8 26 26 8-26 8-8 26-8-26-26-8z" />
                    </g>
                </svg>
                <span class="golden-channel">YOU FOUND THE SIGNAL.<b>GOLDEN CHANNEL / 04</b></span>
            </div>
            <div class="hero-water" aria-hidden="true">
                <svg class="water-scene" viewBox="0 0 800 900" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <linearGradient id="water-depth" x2="0" y2="1">
                            <stop stop-color="#16e3ef" />
                            <stop offset=".27" stop-color="#087bdc" />
                            <stop offset=".7" stop-color="#063cc2" />
                            <stop offset="1" stop-color="#090b89" />
                        </linearGradient>
                        <linearGradient id="water-light" x2="0" y2="1">
                            <stop stop-color="#b6fff6" stop-opacity=".52" />
                            <stop offset="1" stop-color="#60f9ff" stop-opacity="0" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#water-depth)" d="M0 0h800v900H0z" />
                    <g class="water-rays" fill="url(#water-light)">
                        <path d="M220 0h42L105 790H0z" />
                        <path d="M425 0h28l165 900H352z" />
                        <path d="M680 0h34l86 640V900H625z" />
                    </g>
                    <g class="water-surface" fill="#59fff4">
                        <path d="M0 26l105 15 64-19 101 7-33 21-111 3-53 24L0 63zM332 11l90 20 74-9 68 15-27 19-107-11-71 13-52-19zM614 66l62-18 124 21v31l-99-17-72 13-61-11zM98 105l78-17 49 9 95-12 22 18-106 24-73-5-51 16-65-14zM371 135l98-20 57 9 50-11 64 22-39 14-78-8-53 19-99-10zM652 177l53-20 95 15v22l-74-5-49 12-59-9zM0 185l96-24 62 8 53-12 65 20-48 15-67-4-81 23L0 205z" />
                    </g>
                    <g class="water-ripples" fill="none" stroke="#adfff7">
                        <ellipse cx="438" cy="108" rx="116" ry="23" stroke-width="7" />
                        <ellipse cx="438" cy="108" rx="172" ry="38" stroke-width="3" />
                        <ellipse cx="438" cy="108" rx="237" ry="54" stroke-width="2" />
                    </g>
                    <g class="water-fragments" fill="#5ceffb">
                        <path d="M126 280l19-15 16 23-19 18zM641 338l24 8-8 28-19-9zM583 645l17-12 12 21-21 11zM231 746l12-21 22 12-14 18z" />
                        <path d="M305 189l21-11 17 7-8 13-21 3zM703 484l15-13 22 13-9 18-18-4z" />
                    </g>
                    <g class="water-bubbles" fill="none" stroke="#b9fffc" stroke-width="2">
                        <circle cx="657" cy="561" r="9" /><circle cx="681" cy="525" r="4" />
                        <circle cx="173" cy="447" r="6" /><circle cx="184" cy="419" r="3" />
                        <circle cx="536" cy="785" r="5" /><circle cx="550" cy="758" r="2" />
                    </g>
                    <path class="water-current" d="M728 70C615 229 813 373 678 558S627 796 708 922" fill="none" stroke="#5aeef9" stroke-width="2" />
                </svg>
            </div>
            <div class="hero-copy">
                <p class="eyebrow"><span class="eyebrow-dot"></span> Welcome to</p>
                <h1 id="hero-title">
                    <span>欢迎来到</span>
                    <span class="headline-accent">连线世界</span>
                </h1>
                <p class="hero-description">这里记录代码、灵感，以及每一次正在发生的探索。</p>
                <div class="hero-actions">
                    <a class="button button-primary" href="#page2">
                        <span class="button-label">认识我</span>
                        <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M10 5l5 5-5 5" /></svg>
                    </a>
                    <a class="text-link" href="https://github.com/Wh0rigin" target="_blank" rel="noreferrer">
                        查看 GitHub <span aria-hidden="true">↗</span>
                    </a>
                </div>
                <div class="hero-caption"><span></span> THE WIRED WORLD</div>
            </div>

            <div class="hero-visual">
                <svg class="silhouette-filters" aria-hidden="true" width="0" height="0">
                    <defs>
                        <filter id="hero-blue-silhouette" color-interpolation-filters="sRGB" x="-2%" y="-2%" width="104%" height="104%">
                            <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="expandedAlpha" />
                            <feFlood flood-color="#001b67" result="outlineColor" />
                            <feComposite in="outlineColor" in2="expandedAlpha" operator="in" result="outline" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.09  0 0 0 0 0.56  0 0 0 0 0.85  0 0 0 1 0" result="silhouette" />
                            <feMerge><feMergeNode in="outline" /><feMergeNode in="silhouette" /></feMerge>
                        </filter>
                        <filter id="hero-red-silhouette" color-interpolation-filters="sRGB" x="-2%" y="-2%" width="104%" height="104%">
                            <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="expandedAlpha" />
                            <feFlood flood-color="#08080a" result="outlineColor" />
                            <feComposite in="outlineColor" in2="expandedAlpha" operator="in" result="outline" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.90  0 0 0 0 0.13  0 0 0 0 0.18  0 0 0 1 0" result="silhouette" />
                            <feMerge><feMergeNode in="outline" /><feMergeNode in="silhouette" /></feMerge>
                        </filter>
                        <filter id="hero-golden-silhouette" color-interpolation-filters="sRGB" x="-2%" y="-2%" width="104%" height="104%">
                            <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="expandedAlpha" />
                            <feFlood flood-color="#161512" result="outlineColor" />
                            <feComposite in="outlineColor" in2="expandedAlpha" operator="in" result="outline" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 0.78  0 0 0 0 0.04  0 0 0 1 0" result="silhouette" />
                            <feMerge><feMergeNode in="outline" /><feMergeNode in="silhouette" /></feMerge>
                        </filter>
                    </defs>
                </svg>
                <span class="hero-visual-number" aria-hidden="true">{{ modeStore.theme === 'golden' ? '04' : '05' }}</span>
                <WiredImage class="logo logo-original" :src="img_url" alt="连线世界主题插画" :width="logoDimensions[modeStore.mode].width" :height="logoDimensions[modeStore.mode].height" loading="eager" keep-previous @ready="heroLoadedSrc = $event" @mousedown="mousedown" @mouseup="mouseup" />
                <img v-show="heroLoadedSrc" class="logo logo-silhouette" alt="" aria-hidden="true" draggable="false" :src="heroLoadedSrc" />
            </div>
        </section>

        <section id="page2" class="about-section wired-container" aria-label="关于 Wh0rigin">
            <WhoIntro />
            <CodeWin />
            <EducationJourney />
            <FeaturedProjects />
            <MusicSpotlight />
            <AcgInterests />
        </section>
    </main>
</template>

<style lang="less" scoped>
.home {
    position: relative;
    overflow: clip;
}

.theme-atmosphere {
    position: fixed;
    z-index: -1;
    inset: 64px 0 0;
    overflow: hidden;
    pointer-events: none;
}

.motif-ring,
.motif-sweep {
    position: absolute;
    display: block;
}

.motif-ring {
    border: clamp(18px, 3vw, 42px) solid color-mix(in srgb, var(--accent) 13%, transparent);
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 18%, transparent);
    animation: ring-breathe 9s ease-in-out infinite alternate;
}

.motif-ring-one {
    top: 7vh;
    right: -11vw;
    width: min(43vw, 620px);
    aspect-ratio: 1;
}

.motif-ring-two {
    bottom: 4vh;
    left: -8vw;
    width: min(27vw, 390px);
    aspect-ratio: 1;
    animation-delay: -4s;
}

.motif-sweep {
    height: 2px;
    background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--mint) 65%, transparent), transparent);
    opacity: 0.52;
    transform: rotate(-16deg);
    animation: current-flow 10s ease-in-out infinite;
}

.motif-sweep-one {
    top: 32%;
    left: -20%;
    width: 72%;
}

.motif-sweep-two {
    right: -24%;
    bottom: 22%;
    width: 65%;
    animation-delay: -5s;
}

:global(html[data-theme="dark"] .motif-ring) {
    border: 0;
    border-radius: 0;
    background: var(--accent);
    box-shadow: none;
    clip-path: polygon(8% 0, 100% 0, 79% 100%, 0 82%);
    opacity: 0.13;
    animation: dark-panel-drift 8s steps(8, end) infinite alternate;
}

:global(html[data-theme="dark"] .motif-ring-one) {
    top: 4%;
    right: -18%;
    width: min(55vw, 760px);
    aspect-ratio: 1.5;
    transform: rotate(-12deg);
}

:global(html[data-theme="dark"] .motif-ring-two) {
    bottom: 1%;
    left: -17%;
    width: min(42vw, 620px);
    aspect-ratio: 1.8;
    transform: rotate(16deg);
}

:global(html[data-theme="dark"] .motif-sweep) {
    height: clamp(9px, 1.3vw, 18px);
    background: linear-gradient(90deg, transparent, var(--accent) 22% 76%, transparent);
    opacity: 0.2;
    transform: rotate(-23deg) skewX(-24deg);
    animation: slash-run 7s cubic-bezier(0.74, 0, 0.26, 1) infinite;
}

.hero-golden { display: none; }

.hero {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    min-height: 100svh;
    padding: 116px 0 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: clamp(24px, 5vw, 76px);
}

.hero-copy {
    position: relative;
    z-index: 1;
    animation: hero-rise 720ms cubic-bezier(0.2, 0.72, 0.2, 1) both;
}

.eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 22px;
    color: var(--text-muted);
    font-size: 0.83rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
}

.eyebrow-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--mint);
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--mint) 15%, transparent);
}

h1 {
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: var(--text);
    font-size: clamp(3.2rem, 6.7vw, 6.3rem);
    font-weight: 800;
    letter-spacing: -0.065em;
    line-height: 1.12;
    word-break: keep-all;
}

.headline-accent {
    position: relative;
    width: fit-content;
    color: var(--accent-strong);
    background: linear-gradient(110deg, var(--accent-strong), var(--mint));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &::after {
        position: absolute;
        right: 2%;
        bottom: -0.08em;
        left: 2%;
        height: 0.08em;
        border-radius: 999px;
        background: linear-gradient(90deg, transparent, var(--mint), var(--accent), transparent);
        transform: scaleX(0);
        transform-origin: left;
        animation: line-draw 900ms 420ms ease-out forwards;
        content: "";
    }
}

.hero-description {
    max-width: 26em;
    margin-top: 24px;
    color: var(--text-muted);
    font-size: clamp(1rem, 1.5vw, 1.18rem);
    line-height: 1.9;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 22px;
    margin-top: 32px;
}

.button {
    display: inline-flex;
    min-height: 48px;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 20px;
    border-radius: 14px;
    font-size: 0.94rem;
    font-weight: 700;
    text-decoration: none;
    transition: transform 160ms ease, box-shadow 160ms ease;

    &:hover {
        transform: translateY(-2px);
    }

    svg {
        width: 18px;
        height: 18px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.7;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
}

.button-primary {
    color: var(--theme-contrast);
    background: var(--accent);
    box-shadow: 0 10px 24px color-mix(in srgb, var(--accent) 25%, transparent);
}

.button-label {
    font-style: italic;
    letter-spacing: 0.08em;
}

.text-link {
    color: var(--text);
    font-size: 0.94rem;
    font-weight: 650;
    text-decoration: none;

    span {
        margin-left: 4px;
        color: var(--accent-strong);
    }

    &:hover {
        color: var(--accent-strong);
    }
}

.hero-caption {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 62px;
    color: var(--text-muted);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.2em;

    span {
        width: 34px;
        height: 1px;
        background: var(--border);
    }
}

.hero-visual {
    position: relative;
    display: grid;
    min-width: 0;
    place-items: center;
    isolation: isolate;
    animation: visual-float 6s ease-in-out infinite;

    &::before {
        position: absolute;
        z-index: -1;
        width: min(100%, 500px);
        aspect-ratio: 1;
        border-radius: 50%;
        border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
        background:
            radial-gradient(circle, transparent 50%, color-mix(in srgb, var(--accent) 9%, transparent) 51% 63%, transparent 64%),
            conic-gradient(from 20deg, transparent, color-mix(in srgb, var(--mint) 20%, transparent), transparent 38%);
        animation: orbit-turn 18s linear infinite;
        content: "";
    }
}

.logo {
    display: block;
    grid-area: 1 / 1;
    width: min(100%, 570px);
    height: auto;
}

.logo-original,
.logo-silhouette {
    transition: opacity 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.logo-silhouette {
    opacity: 0;
    pointer-events: none;
    filter: url(#hero-blue-silhouette);
}

:global(html[data-theme="dark"] .logo-silhouette) {
    filter: url(#hero-red-silhouette);
}

.silhouette-filters {
    position: absolute;
    overflow: hidden;
    pointer-events: none;
}

@media (hover: hover) {
    .logo-original:is(.is-ready, .has-previous):hover {
        opacity: 0;
    }

    .logo-original:is(.is-ready, .has-previous):hover + .logo-silhouette {
        opacity: 1;
    }
}

.about-section {
    position: relative;
    z-index: 1;
    padding: 42px 0 112px;
    display: grid;
    grid-template-columns: 1fr 0.92fr;
    align-items: stretch;
    gap: clamp(28px, 5vw, 76px);
    scroll-margin-top: 88px;
}

/* The light theme borrows the reference's blue stage, white cutout and slanted UI. */
:global(html[data-theme="light"] .hero::before) {
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: -50vw;
    width: calc(50vw + 56%);
    background: #faffff;
    clip-path: polygon(0 0, 100% 0, 94% 66%, 100% 100%, 0 100%);
    content: "";
}

:global(html[data-theme="light"] .hero::after) {
    position: absolute;
    z-index: -1;
    top: 2%;
    left: -13vw;
    color: rgba(0, 33, 113, 0.1);
    font-size: clamp(13rem, 32vw, 33rem);
    font-style: italic;
    font-weight: 950;
    letter-spacing: -0.17em;
    line-height: 1;
    transform: rotate(-11deg);
    pointer-events: none;
    content: "03";
}

:global(html[data-theme="light"] .hero-copy) {
    max-width: 520px;
    animation: hero-rise 650ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

:global(html[data-theme="light"] .hero .eyebrow) {
    width: fit-content;
    padding: 8px 14px;
    color: #ffffff;
    background: #061b54;
    font-weight: 850;
    letter-spacing: 0.22em;
    transform: skewX(-10deg);
}

:global(html[data-theme="light"] .eyebrow-dot) {
    border-radius: 0;
    background: var(--mint);
    box-shadow: none;
    transform: rotate(45deg);
}

:global(html[data-theme="light"] .hero h1) {
    gap: 0;
    color: #061849;
    font-size: clamp(3.4rem, 7.1vw, 6.9rem);
    font-style: italic;
    font-weight: 950;
    letter-spacing: -0.085em;
    line-height: 1.04;
    text-shadow: 4px 4px 0 rgba(21, 205, 233, 0.24);
    transform: skewX(-7deg);
}

:global(html[data-theme="light"] .headline-accent) {
    margin-top: 0.11em;
    padding: 0.03em 0.22em 0.11em;
    color: #ffffff;
    background: linear-gradient(110deg, #002270, #0869c7 72%, #0ecfe5);
    clip-path: polygon(4% 0, 100% 0, 95% 100%, 0 92%);
    text-shadow: 4px 4px 0 rgba(0, 24, 89, 0.8);
    transform: translateX(0.1em) rotate(-2deg);
    -webkit-text-fill-color: #ffffff;
}

:global(html[data-theme="light"] .headline-accent::after) {
    right: 9%;
    bottom: 0.035em;
    left: 12%;
    height: 0.035em;
    border-radius: 0;
    background: #3af8f4;
    transform: scaleX(1);
    animation: none;
}

:global(html[data-theme="light"] .hero-description) {
    max-width: 25em;
    color: #284477;
    font-weight: 650;
}

:global(html[data-theme="light"] .hero .button-primary) {
    border: 2px solid #001b67;
    border-radius: 0;
    color: #ffffff;
    background: #003eaa;
    box-shadow: 7px 7px 0 #22e8ed;
    transform: skewX(-10deg);
}

:global(html[data-theme="light"] .hero .button-primary:hover) {
    box-shadow: 10px 10px 0 #22e8ed;
    transform: translate(-2px, -2px) skewX(-10deg);
}

:global(html[data-theme="light"] .hero-caption) {
    color: #0b4e9f;
    font-style: italic;
    font-weight: 900;
    letter-spacing: 0.24em;
}

:global(html[data-theme="light"] .hero-caption span) {
    height: 5px;
    background: #05bfdc;
    transform: skewX(-30deg);
}

:global(html[data-theme="light"] .hero-visual) {
    filter: drop-shadow(16px 22px 0 rgba(0, 24, 112, 0.35));
    animation: day-submerge 7.5s ease-in-out infinite alternate;
}

:global(html[data-theme="light"] .hero-visual-number) {
    display: none;
}

:global(html[data-theme="light"] .hero-visual::before) {
    display: none;
}

.hero-water {
    display: none;
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 46%;
    right: calc(50% - 50vw);
    overflow: hidden;
    pointer-events: none;
    clip-path: polygon(13% 0, 100% 0, 100% 100%, 0 100%, 9% 66%, 3% 39%);
}

:global(html[data-theme="light"] .hero-water) { display: block; }

.water-scene { width: 100%; height: 100%; }
.water-surface { opacity: .72; animation: surface-drift 9s ease-in-out infinite alternate; }
.water-rays { opacity: .6; animation: water-shimmer 7s ease-in-out infinite alternate; }
.water-ripples { transform-origin: 438px 108px; animation: water-impact 5s ease-out infinite; }
.water-fragments { opacity: .25; animation: underwater-rise 11s ease-in-out infinite alternate; }
.water-bubbles { opacity: .55; animation: underwater-rise 8s ease-in-out infinite alternate-reverse; }
.water-current { opacity: .18; }

@keyframes surface-drift {
    to { transform: translate(-22px, 7px) scaleX(1.04); }
}
@keyframes water-shimmer {
    to { opacity: .3; transform: translateX(18px) skewX(-3deg); }
}
@keyframes water-impact {
    0% { opacity: 0; transform: scale(.68); }
    18% { opacity: .6; }
    100% { opacity: 0; transform: scale(1.22); }
}
@keyframes underwater-rise {
    to { transform: translate(14px, -38px); }
}
@keyframes day-submerge {
    from { transform: translate(-4px, -8px) rotate(-1deg); }
    to { transform: translate(5px, 12px) rotate(1deg); }
}

@media (max-width: 820px) {
    .hero-water {
        top: 43%;
        left: -24px;
        right: -24px;
        clip-path: polygon(0 11%, 100% 0, 100% 100%, 0 100%);
    }
}

@media (max-width: 520px) {
    .hero-water { top: 52%; left: -18px; right: -18px; }
}

@media (prefers-reduced-motion: reduce) {
    .water-scene > g { animation: none; }
    .water-ripples { opacity: .35; }
    :global(html[data-theme="light"] .hero-visual) { animation: none; }
}

:global(html[data-theme="light"] .motif-ring) {
    border: 0;
    border-radius: 0;
    background: rgba(95, 250, 249, 0.18);
    box-shadow: none;
    clip-path: polygon(14% 0, 100% 20%, 83% 100%, 0 70%);
}

:global(html[data-theme="light"] .motif-sweep) {
    height: 14px;
    background: linear-gradient(90deg, transparent, rgba(145, 255, 248, 0.6), transparent);
    opacity: 0.7;
    transform: rotate(-23deg) skewX(-24deg);
}

:global(html[data-theme="light"] .about-section::before) {
    position: absolute;
    z-index: -1;
    inset: 0 -7vw 0 -7vw;
    background: linear-gradient(135deg, rgba(36, 227, 239, 0.23), transparent 50%, rgba(0, 18, 105, 0.38));
    clip-path: polygon(0 5%, 100% 0, 94% 100%, 4% 96%);
    content: "";
}

@keyframes day-shard-drift {
    to { transform: translate(14px, -10px) rotate(3deg); }
}

:global(html[data-theme="dark"] .hero::before) {
    position: absolute;
    z-index: -1;
    top: -2%;
    bottom: -3%;
    left: -50vw;
    width: calc(50vw + 64%);
    background:
        repeating-linear-gradient(135deg, transparent 0 34px, rgba(255, 255, 255, .075) 34px 36px, transparent 36px 68px),
        linear-gradient(145deg, #8f080d 0%, #e5222d 52%, #bd111b 100%);
    clip-path: polygon(0 0, 100% 0, 88% 100%, 0 94%);
    content: "";
}

:global(html[data-theme="dark"] .hero::after) {
    position: absolute;
    z-index: 0;
    top: 12%;
    right: -8vw;
    width: 47%;
    height: 83%;
    background: linear-gradient(145deg, #ff302e, #b90b16 68%, #73080e);
    clip-path: polygon(18% 0, 100% 9%, 76% 100%, 0 83%);
    transform: rotate(-5deg);
    pointer-events: none;
    content: "";
}

:global(html[data-theme="dark"] .hero-copy) {
    z-index: 3;
    max-width: 590px;
    animation-name: hero-snap;
}

:global(html[data-theme="dark"] .hero .eyebrow) {
    width: fit-content;
    margin-bottom: 20px;
    padding: 8px 13px;
    color: #08080a;
    background: #f6f2ec;
    font-weight: 900;
    letter-spacing: .21em;
    box-shadow: 5px 5px 0 #08080a;
    transform: skewX(-9deg) rotate(-1deg);
}

:global(html[data-theme="dark"] .hero h1) {
    position: relative;
    gap: 0;
    color: #fff;
    font-size: clamp(3.4rem, 7.1vw, 6.9rem);
    font-style: italic;
    font-weight: 950;
    letter-spacing: -.09em;
    line-height: .98;
    text-shadow: 4px 4px 0 #08080a, 7px 7px 0 rgba(255, 255, 255, .42);
    transform: skewX(-5deg);
}

:global(html[data-theme="dark"] .headline-accent) {
    margin-top: .08em;
    padding: 0.025em 0.19em 0.11em;
    color: #ffffff;
    background: #08080a;
    clip-path: polygon(3% 7%, 100% 0, 94% 91%, 0 100%);
    text-shadow: 4px 4px 0 #e5222d;
    box-shadow: 8px 8px 0 #f6f2ec;
    transform: translateX(.06em) rotate(-1.8deg) skewX(-3deg);
    -webkit-text-fill-color: #ffffff;
}

:global(html[data-theme="dark"] .headline-accent::after) {
    right: -5%;
    bottom: -.13em;
    left: 13%;
    height: .065em;
    border-radius: 0;
    background: #fff;
    box-shadow: 0 4px 0 #08080a;
    transform: rotate(-1.4deg);
    animation: none;
}

:global(html[data-theme="dark"] .eyebrow-dot) {
    border-radius: 1px;
    background: var(--accent);
    box-shadow: 4px 4px 0 rgba(255, 255, 255, 0.14);
    transform: rotate(45deg);
}

:global(html[data-theme="dark"] .hero .button) {
    min-height: 52px;
    padding-right: 23px;
    padding-left: 23px;
    border-radius: 2px;
}

:global(html[data-theme="dark"] .hero .button-primary) {
    position: relative;
    isolation: isolate;
    border-radius: 0;
    color: #08080a;
    background: transparent;
    box-shadow: none;
    transition: transform 180ms cubic-bezier(.2, .8, .2, 1);
}

:global(html[data-theme="dark"] .hero .button-primary::before),
:global(html[data-theme="dark"] .hero .button-primary::after) {
    position: absolute;
    z-index: -1;
    inset: 0;
    clip-path: polygon(7% 0, 100% 0, 93% 100%, 0 88%);
    content: "";
}

:global(html[data-theme="dark"] .hero .button-primary::before) {
    background: #f6f2ec;
}

:global(html[data-theme="dark"] .hero .button-primary::after) {
    z-index: -2;
    background: #08080a;
    transform: translate(7px, 7px);
}

:global(html[data-theme="dark"] .hero .button-primary:hover) {
    transform: translate(-2px, -2px);
}

:global(html[data-theme="dark"] .hero .button-label) {
    font-weight: 950;
    letter-spacing: 0.13em;
}

:global(html[data-theme="dark"] .hero .text-link) {
    padding: 7px 0;
    color: #fff;
    font-weight: 850;
    text-shadow: 2px 2px 0 #08080a;
}

:global(html[data-theme="dark"] .hero-caption span) {
    width: 42px;
    height: 5px;
    background: #f6f2ec;
    transform: skewX(-32deg);
}

:global(html[data-theme="dark"] .hero-visual) {
    z-index: 1;
    filter: drop-shadow(11px 12px 0 #08080a) drop-shadow(17px 19px 0 #e5222d);
    animation: dark-jolt 5.2s steps(1, end) infinite;
}

:global(html[data-theme="dark"] .hero-visual-number) {
    position: absolute;
    z-index: 0;
    top: -7%;
    right: -12%;
    color: #e5222d;
    font-size: clamp(17rem, 35vw, 39rem);
    font-style: italic;
    font-weight: 1000;
    letter-spacing: -.19em;
    line-height: .82;
    -webkit-text-stroke: 4px #08080a;
    text-shadow: 4px 4px 0 #f6f2ec;
    transform: rotate(8deg);
    pointer-events: none;
}

:global(html[data-theme="dark"] .hero .logo) {
    position: relative;
    z-index: 1;
}

:global(html[data-theme="dark"] .hero-visual::before) {
    width: 108%;
    max-width: 580px;
    border: 0;
    border-radius: 0;
    background:
        radial-gradient(circle, rgba(8, 8, 10, .9) 0 1.25px, transparent 1.8px) 0 0 / 11px 11px,
        linear-gradient(135deg, #f6f2ec, #fff 68%, #e9e4dd);
    clip-path: polygon(15% 0, 100% 5%, 87% 100%, 0 88%);
    opacity: 1;
    transform: rotate(4deg);
    animation: dark-panel-drift 7s ease-in-out infinite alternate;
}

:global(html[data-theme="dark"] .hero-visual::after) {
    position: absolute;
    z-index: 3;
    right: -3%;
    bottom: 7%;
    padding: 8px 13px;
    border: 2px solid #08080a;
    border-left: 6px solid #e5222d;
    color: #08080a;
    background: #f6f2ec;
    box-shadow: 5px 5px 0 #08080a;
    font-size: .67rem;
    font-weight: 950;
    letter-spacing: .19em;
    transform: rotate(-6deg);
    animation: access-stamp 520ms cubic-bezier(.16, 1, .3, 1) 500ms both;
    content: "PHANTOM LINK // 05";
}

@keyframes hero-rise {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes hero-snap {
    0% { opacity: 0; transform: translate(-36px, 12px) skewX(-7deg); }
    65% { opacity: 1; transform: translate(5px, -2px) skewX(1deg); }
    100% { transform: translate(0) skewX(0); }
}

@keyframes line-draw {
    to { transform: scaleX(1); }
}

@keyframes visual-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
}

@keyframes dark-jolt {
    0%, 91%, 94%, 100% { transform: translate(0); }
    92% { transform: translate(-4px, 2px) skewX(-0.6deg); }
    93% { transform: translate(3px, -1px) skewX(0.4deg); }
}

@keyframes orbit-turn {
    to { transform: rotate(360deg); }
}

@keyframes dark-shape-turn {
    to { transform: rotate(-360deg); }
}

@keyframes ring-breathe {
    to { transform: scale(1.12) translate(-2%, 3%); opacity: 0.7; }
}

@keyframes current-flow {
    0%, 100% { transform: translateX(-8%) rotate(-16deg); opacity: 0; }
    25%, 70% { opacity: 0.52; }
    50% { transform: translateX(28%) rotate(-16deg); }
}

@keyframes dark-panel-drift {
    to { translate: 7% -4%; }
}

@keyframes slash-run {
    0%, 100% { translate: -22% 16%; opacity: 0; }
    22%, 70% { opacity: 0.2; }
    52% { translate: 28% -14%; }
}

@media (max-width: 820px) {
    :global(html[data-theme="light"] .hero::before) {
        top: 0;
        right: -24px;
        bottom: auto;
        left: -24px;
        width: auto;
        height: 59%;
        clip-path: polygon(0 0, 100% 0, 100% 89%, 0 100%);
    }

    :global(html[data-theme="light"] .hero::after) {
        top: 1%;
        left: -12%;
        font-size: clamp(12rem, 38vw, 23rem);
    }

    :global(html[data-theme="dark"] .hero::after) {
        top: 52%;
        right: -13%;
        width: 76%;
        height: 43%;
        transform: rotate(-7deg);
    }

    :global(html[data-theme="dark"] .hero::before) {
        top: 0;
        right: -24px;
        bottom: auto;
        left: -24px;
        width: auto;
        height: 54%;
        border-right: 0;
        border-bottom: 0;
        clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
    }

    .hero {
        min-height: auto;
        grid-template-columns: 1fr;
        gap: 18px;
        padding: 112px 0 56px;
    }

    .hero-copy {
        max-width: 620px;
    }

    .hero-visual {
        width: min(100%, 500px);
        margin: 0 auto;
    }

    .logo {
        width: min(100%, 460px);
    }

    .hero-caption {
        margin-top: 38px;
    }

    .about-section {
        grid-template-columns: 1fr;
        gap: 28px;
        padding-top: 30px;
        padding-bottom: 80px;
    }
}

@media (max-width: 520px) {
    :global(html[data-theme="light"] .hero::after) {
        font-size: clamp(12rem, 38vw, 23rem);
    }

    :global(html[data-theme="dark"] .hero::after) {
        top: 54%;
        right: -27%;
        width: 105%;
        height: 35%;
        transform: rotate(-8deg);
    }

    :global(html[data-theme="dark"] .hero::before) {
        height: 53%;
    }

    :global(html[data-theme="light"] .hero::before) {
        right: -18px;
        left: -18px;
        height: 61%;
    }

    :global(html[data-theme="light"] .hero-visual) {
        filter: drop-shadow(8px 12px 0 rgba(0, 24, 112, 0.27));
    }

    :global(html[data-theme="light"] .hero-caption) {
        width: fit-content;
        padding: 7px 11px;
        color: #ffffff;
        background: #003c9d;
        transform: skewX(-8deg);
    }

    .motif-ring-two,
    .motif-sweep-two {
        display: none;
    }

    .motif-ring-one {
        right: -46vw;
        width: 92vw;
    }

    .hero,
    .about-section {
        --ui-container-gutter: 36px;
    }

    .hero {
        padding-top: 98px;
    }

    .hero-visual {
        width: min(100%, 250px);
        margin-top: 8px;

        &::before {
            display: none;
        }
    }

    :global(html[data-theme="dark"] .hero-visual::before) {
        display: block;
        width: 118%;
        max-width: 330px;
        opacity: 1;
    }

    :global(html[data-theme="dark"] .hero-visual-number) {
        top: -4%;
        right: -15%;
        font-size: clamp(12rem, 51vw, 19rem);
        -webkit-text-stroke-width: 3px;
        text-shadow: 3px 3px 0 #f6f2ec;
    }

    :global(html[data-theme="dark"] .hero-visual::after) {
        right: -10%;
        bottom: 5%;
        padding: 6px 9px;
        font-size: .5rem;
        letter-spacing: .1em;
    }

    .logo {
        width: 100%;
        max-height: 30svh;
        object-fit: contain;
    }

    h1 {
        font-size: clamp(2.8rem, 13vw, 4.3rem);
    }

    .hero-description {
        max-width: 100%;
        font-size: .9rem;
        line-height: 1.7;
        text-wrap: pretty;
    }

    .hero-actions {
        gap: 16px;
    }

    .hero-caption {
        margin-top: 30px;
    }
}
</style>

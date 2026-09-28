<script lang="ts" setup>
import { onMounted, ref,Ref, onUnmounted } from 'vue';
import { useModeStore } from '../stores/mode';

import WhoIntro from '../components/home/WhoIntro.vue';
import CodeWin from '../components/home/CodeWin.vue';
import MusicSpotlight from '../components/home/MusicSpotlight.vue';

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

        <section id="top" class="hero" aria-labelledby="hero-title">
            <div class="hero-copy">
                <p class="eyebrow"><span class="eyebrow-dot"></span> Welcome to</p>
                <h1 id="hero-title">
                    <span>欢迎来到</span>
                    <span class="headline-accent">连线世界</span>
                </h1>
                <p class="hero-description">这里记录代码、灵感，以及每一次正在发生的探索。</p>
                <div class="hero-actions">
                    <a class="button button-primary" href="#page2">
                        认识我
                        <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M10 5l5 5-5 5" /></svg>
                    </a>
                    <a class="text-link" href="https://github.com/Wh0rigin" target="_blank" rel="noreferrer">
                        查看 GitHub <span aria-hidden="true">↗</span>
                    </a>
                </div>
                <div class="hero-caption"><span></span> THE WIRED WORLD</div>
            </div>

            <div class="hero-visual">
                <img class="logo" draggable="false" @mousedown="mousedown" @mouseup="mouseup" :src="img_url"/>
            </div>
        </section>

        <section id="page2" class="about-section" aria-label="关于 Wh0rigin">
            <WhoIntro />
            <CodeWin />
            <MusicSpotlight />
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

.hero {
    position: relative;
    z-index: 1;
    width: calc(100% - 48px);
    max-width: 1120px;
    min-height: 100vh;
    min-height: 100svh;
    margin: 0 auto;
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
    font-size: clamp(3rem, 6.2vw, 5.5rem);
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
    width: min(100%, 570px);
    height: auto;
}

.about-section {
    position: relative;
    z-index: 1;
    width: calc(100% - 48px);
    max-width: 1120px;
    margin: 0 auto;
    padding: 42px 0 112px;
    display: grid;
    grid-template-columns: 1fr 0.92fr;
    align-items: stretch;
    gap: clamp(28px, 5vw, 76px);
    scroll-margin-top: 88px;
}

:global(html[data-theme="dark"] .hero-copy) {
    animation-name: hero-snap;
}

:global(html[data-theme="dark"] .hero h1) {
    text-shadow: 4px 4px 0 #000000;
}

:global(html[data-theme="dark"] .headline-accent) {
    padding: 0.02em 0.17em 0.08em;
    color: #ffffff;
    background: var(--accent);
    clip-path: polygon(3% 7%, 100% 0, 94% 91%, 0 100%);
    text-shadow: 4px 4px 0 #08080a;
    transform: rotate(-1.2deg) skewX(-4deg);
    -webkit-text-fill-color: #ffffff;
}

:global(html[data-theme="dark"] .headline-accent::after) {
    right: -4%;
    bottom: -0.1em;
    left: 18%;
    height: 0.06em;
    border-radius: 0;
    background: #ffffff;
    transform: rotate(-1deg);
    animation: none;
}

:global(html[data-theme="dark"] .eyebrow-dot) {
    border-radius: 1px;
    background: var(--accent);
    box-shadow: 4px 4px 0 rgba(255, 255, 255, 0.14);
    transform: rotate(45deg);
}

:global(html[data-theme="dark"] .hero .button) {
    border-radius: 2px;
    clip-path: polygon(7% 0, 100% 0, 93% 100%, 0 88%);
}

:global(html[data-theme="dark"] .button-primary) {
    color: #ffffff;
    box-shadow: 7px 7px 0 #000000;
}

:global(html[data-theme="dark"] .button-primary:hover) {
    transform: translate(-2px, -2px);
    box-shadow: 10px 10px 0 #000000;
}

:global(html[data-theme="dark"] .hero-caption span) {
    height: 4px;
    background: var(--accent);
    transform: skewX(-28deg);
}

:global(html[data-theme="dark"] .hero-visual) {
    animation: dark-jolt 6s steps(1, end) infinite;
}

:global(html[data-theme="dark"] .hero-visual::before) {
    border: 0;
    border-radius: 0;
    background: var(--accent);
    clip-path: polygon(7% 18%, 72% 0, 100% 34%, 79% 91%, 20% 100%, 0 69%);
    opacity: 0.16;
    animation: dark-shape-turn 16s linear infinite;
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
        width: calc(100% - 36px);
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

    .logo {
        width: 100%;
        max-height: 30svh;
        object-fit: contain;
    }

    h1 {
        font-size: clamp(2.8rem, 14vw, 4rem);
    }

    .hero-actions {
        gap: 16px;
    }

    .hero-caption {
        margin-top: 30px;
    }
}
</style>

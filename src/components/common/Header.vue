<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
let isOpen = ref(false);
let isAtTop = ref(true);
const toggleDropDownMenu = function () {
    isOpen.value = !isOpen.value;
}

const checkScrollPosition = () => {
    isAtTop.value = window.scrollY === 0;
};

onMounted(() => {
    window.addEventListener('scroll', checkScrollPosition);
});

onUnmounted(() => {
    window.removeEventListener('scroll', checkScrollPosition);
});
</script>

<template>
    <header :class="{ 'at-top': isAtTop }">
        <nav class="navbar">
            <div class="logo">Wh0rigin</div>
            <div class="nav-links">
                <router-link to="/" class="router-link">Home</router-link>
                <router-link to="/about" class="router-link">About</router-link>
                <router-link to="/contact" class="router-link">Contact</router-link>
            </div>
            <a class="action-btn" href="https://github.com/Wh0rigin">Go GitHub</a>
            <a class="toggle-btn" @click="toggleDropDownMenu"><svg t="1703953580517" class="icon" viewBox="0 0 1024 1024"
                    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4498" width="40" height="40">
                    <path d="M64 192h896v192H64z m0 256h896v192H64z m0 256h896v192H64z" p-id="4499"></path>
                </svg></a>
        </nav>
        <transition name="slide-fade">
            <div class="dropdown_menu" v-if="isOpen">
                <router-link to="/" class="router-link">Home</router-link>
                <router-link to="/about" class="router-link">About</router-link>
                <router-link to="/contact" class="router-link">Contact</router-link>
                <div class="router-link"><a class="action-btn" href="https://github.com/Wh0rigin">Go GitHub</a></div>
            </div>
        </transition>
    </header>
</template>

<style lang="less" scoped>
header {
    position: fixed;
    width: 100%;
    background-color: white;
    align-items: center;
    display: flex;
    justify-content: center;
    // border-bottom: solid 1px gainsboro;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}


.at-top {
    /* 根据需要设置在顶部时导航栏的样式 */
    background-color: rgba(255, 255, 255, 0.1);
    transition: background-color 0.3s ease-in-out;
}

.navbar {
    width: 80%;

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 10px;

    align-items: center;
    color: #000;

    @media (max-width: 992px) {
        width: 95%;
    }


    .logo {
        font-size: 1.5em;
    }

    .nav-links {
        display: flex;
        gap: 2rem;

        @media (max-width: 992px) {
            display: none;
        }

        .router-link {

            text-decoration: none;
            color: #000;
            font-weight: bold;
            transition: color 0.3s ease-in-out;

            &:hover {
                color: #ffcc00;
            }
        }
    }

    .toggle-btn {
        // margin-right: 50px;
        display: none;
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;

        @media (max-width: 992px) {
            display: block;
        }

        svg {
            align-items: center;
        }

    }


}

.action-btn {
    background-color: orange;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    outline: none;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    transition: scale .2 ease;
    text-decoration: none;
    // margin-right: 50px;

    @media (max-width: 992px) {
        display: none;
    }

    &:hover {
        scale: 1.05;
        color: #fff;
    }

    &:active {
        scale: 0.95;

    }
}


.dropdown_menu {

    display: none;
    position: absolute;
    right: 2rem;
    top: 80px;
    width: 300px;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15px);
    border-radius: 10px;
    overflow: hidden;
    // height: 0;



    @media (max-width: 992px) {
        display: block;
    }

    .router-link {
        padding: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        transition: color 0.3s ease-in-out;

        &:hover {
            color: #ffcc00;
        }
    }

    .action-btn {
        width: 100%;
        display: flex;
        justify-content: center;
    }
}


/*
进入和离开动画可以使用不同
持续时间和速度曲线。
*/
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>

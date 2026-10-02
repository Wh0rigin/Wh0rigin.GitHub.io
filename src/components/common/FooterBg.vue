<script setup lang="ts">
import WiredImage from '../ui/WiredImage.vue';
import ghostOne from '../../assets/gif/Ghost1_right.gif';
import ghostTwo from '../../assets/gif/Ghost2_right.gif';
import ghostThree from '../../assets/gif/Ghost3_right.gif';
import pacman from '../../assets/gif/Pacman_right.gif';
const sprites = [ghostOne, ghostTwo, ghostThree, pacman];
</script>

<template>
    <div class="footer-head">
        <div class="move-group">
            <WiredImage v-for="sprite in sprites" :key="sprite" class="footer-sprite" :src="sprite" alt="" aria-hidden="true" :width="32" :height="32" compact />
        </div>
    </div>
</template>

<style lang="less" scoped>
.footer-head{
    overflow: hidden;
}
.move-group{
    animation: move linear 30s infinite;
    display: inline-block;
    position: relative;
    .footer-sprite{
        display: inline-block;
        width: 32px;
        height: 32px;
        filter: drop-shadow(0 0 2px gray);
    }
    @keyframes move {
        0%{left:-5%;}
        100%{left: 110%;}
    }
}
</style>

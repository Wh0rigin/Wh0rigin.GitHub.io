<template>
    <div class="footer-head">
        <div class="move-group">
            <img src="../../assets/gif/Ghost1_right.gif" />
            <img src="../../assets/gif/Ghost2_right.gif" />
            <img src="../../assets/gif/Ghost3_right.gif" />
            <img src="../../assets/gif/Pacman_right.gif" />
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
    img{
        filter: drop-shadow(0 0 2px gray);
    }
    @keyframes move {
        0%{left:-5%;}
        100%{left: 110%;}
    }
}
</style>

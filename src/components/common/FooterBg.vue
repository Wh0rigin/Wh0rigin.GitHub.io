<template>
    <div class="footer-head">
        <div class="move-group">
            <img src="../../assets/gif/Ghost1_right.gif" />
            <img src="../../assets/gif/Ghost2_right.gif" />
            <img src="../../assets/gif/Ghost3_right.gif" />
            <img src="../../assets/gif/Pacman_right.gif" />
        </div>
    </div>
    <div class="container">
        <div class="box" v-for="index of 1400" :key="index"></div>
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
.container{
    display: flex;
    flex-wrap: wrap;
    height: 170px;
    overflow: hidden;
    .box{
        position:relative;
        width:24px;
        height: 24px;
        background-color: rgb(68, 68, 68);
        border: 1px solid rgba(0, 0, 0,.2);
        box-sizing: border-box;
        overflow: hidden;
        &::before{
            content: "";
            position: absolute;
            inset: 6px;
            background: #666;
            box-shadow: 0 1px 4px #000;
            transition: 2s ease-in-out;
        }

        &:hover::before{
            transition: 0s ease-in-out;
            background: #f00;
            box-shadow: 0 0 3px #f00,
                        0 0 10px #f00;
        }

        &:nth-child(9n+1):hover::before{
            background: #f00;
            box-shadow: 0 0 3px #f00,
                        0 0 10px #f00;
        }
        &:nth-child(9n+2):hover::before{
            background: #fcc;
            box-shadow: 0 0 3px #fcc,
                        0 0 10px #fcc;
        }
        &:nth-child(9n+3):hover::before{
            background: #0f0;
            box-shadow: 0 0 3px #0f0,
                        0 0 10px #0f0;
        }
        &:nth-child(9n+4):hover::before{
            background: #00f;
            box-shadow: 0 0 3px #00f,
                        0 0 10px #00f;
        }
        &:nth-child(9n+5):hover::before{
            background: #5ff;
            box-shadow: 0 0 3px #5ff,
                        0 0 10px #5ff;
        }
        &:nth-child(9n+6):hover::before{
            background: #ff6;
            box-shadow: 0 0 3px #ff6,
                        0 0 10px #ff6;
        }
        &:nth-child(9n+7):hover::before{
            background: #f6f;
            box-shadow: 0 0 3px #f6f,
                        0 0 10px #f6f;
        }
        &:nth-child(9n+8):hover::before{
            background: #fff;
            box-shadow: 0 0 3px #fff,
                        0 0 10px #fff;
        }
        &:nth-child(9n+9):hover::before{
            background: rgb(102, 135, 255);
            box-shadow: 0 0 3px rgb(102, 135, 255),
                        0 0 10px rgb(102, 135, 255);
        }
    }
}
</style>
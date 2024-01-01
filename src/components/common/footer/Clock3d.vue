<template>
    <div class="container">
        <div class="text" style="--j:0;">
            <span style="--i:0;">2</span>
            <span style="--i:1;">3</span>
            <span style="--i:2;">4</span>
            <span style="--i:3;">5</span>
        </div>
        <div class="text" style="--j:1;">
            <span style="--i:0;">0</span>
            <span style="--i:1;">1</span>
            <span style="--i:2;">2</span>
            <span style="--i:3;">3</span>
        </div>
        <div class="text" style="--j:2;">
            <span style="--i:0;">2</span>
            <span style="--i:1;">3</span>
            <span style="--i:2;">4</span>
            <span style="--i:3;">5</span>
        </div>
        <div class="text" style="--j:3;">
            <span style="--i:0;">4</span>
            <span style="--i:1;">4</span>
            <span style="--i:2;">5</span>
            <span style="--i:3;">6</span>
        </div>
    </div>
</template>


<style lang="less" scoped>
    .container{
        display: flex;
        gap: 10px;
        transform: rotateY(30deg) rotateX(10deg);
        transform-style: preserve-3d;
        &:hover{
            .text{
                transform: rotateX(-360deg);
                &:last-child{
                    transform: rotateX(630deg);
                }
            }
        }

        .text{
            position: relative;
            width: 100px;
            height: 100px;
            color: #fff;
            transition: 2.5s ease-in-out;
            transition-delay: calc(0.25s*var(--j));
            span{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(#434343,#535353);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 4em;
                font-weight: 700;
                font-family: 黑体;
                color: #fff;
                transform: rotateX(calc(90deg*var(--i)))
                translateZ(50px);
            }

            &::before{
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                background: #373737;
                transform-origin: left;
                transform: rotateY(90deg) translateX(-50px);
            }

            &:last-child span{
                background: linear-gradient(#29c040,#32ed4e);
                color: #333;
            }
            &:last-child:before{
                background: #29ab3c;
            }
        }
    }

</style>
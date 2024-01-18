<template>
    <div class="flip-text-carousel">
        <transition name="flip" mode="out-in">
            <p :key="currentIndex" class="text">{{ texts[currentIndex] }}</p>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
const robot_text:Array<string> = [
    "战斗装甲同步中，准备进入战场，请耐心等待。",
    "引擎核心启动中，能量充填中，即将投入机战序列。",
    "数据连接中，系统识别机体蓄力中，即将展开激战。",
    "加载中，机战AI进行最终优化，即将投入紧急战斗。",
    "机战模块初始化，武装检查中，战斗系统即将上线。",
    "战术计算中，机体启动，预备进入机战模式。",
    "加载中，机战战区传感器校准，敌我辨识即将完毕。",
    "机战引擎点火中，战斗装备连接完毕，即刻出发。",
    "加载装填中，机战驾驶员准备就绪，随时迎接对手。",
    "战术系统升级中，机体性能提升中，即将进行高强度战斗。"
]
const fantasy_text:Array<string> = [
    '少女祈祷中',
    "魔力充能中，请稍候~",
    "探险小队正在赶来...加载中",
    "幻想引擎启动中，等一下哦~",
    "程序咕噜咕噜运转中，请耐心等待",
    "数据召唤中，魔法少女正在努力加载",
    "加载中，精灵们正在抓紧时间准备法术",
    "等等，正在召唤程序妖精来处理加载任务",
    "加载中，程序妖怪正在修炼中，稍后即现",
    "加载中，系统喵正在思考怎样更快速地完成任务",
    "魔法阵绘制中，稍等片刻就能看到奇迹了",
]

const texts: Array<string> = [
    '第一次加载的话可能会有点慢呢',
    '如果加载了5分钟还没有成功加载建议刷新一下呢',
    ...fantasy_text,
    ...robot_text
]


let currentIndex = ref(0)
let timer: any = undefined

const nextText = function () {
    currentIndex.value = (currentIndex.value + 1) % texts.length;
}

onMounted(() => {
    timer = setInterval(nextText, 5000);
})

onUnmounted(() => {
    clearInterval(timer)
})
</script>

<style lang="less" scoped>
.flip-text-carousel {
    display: flex;
    align-items: center;

    /* 设置合适的高度 */
    // overflow: hidden;
}

.text {
    transform: translateY(100%);
    color: gray;
    font-size: 15px;
}


.flip-enter-active,
.flip-leave-active {
    transition: opacity 0.5s ease;
}

.flip-enter-from,
.flip-leave-to {
    opacity: 0;
}
</style>

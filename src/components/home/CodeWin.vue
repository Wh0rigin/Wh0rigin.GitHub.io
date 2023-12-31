<script setup lang="ts">
</script>

<template>
    <div class="code-container">
        <div class="code-header">
            <div class="red-btn"></div>
            <div class="yellow-btn"></div>
            <div class="green-btn"></div>
        </div>
        <div class="code-content">
            <div style="color: aliceblue;">print('hello world') <span class="cursor">_</span></div>
        </div>
    </div>
</template>


<style lang="less" scoped>
.code-container {
    display: flex;
    justify-content: start;
    flex-direction: column;
    background-color: rgb(38, 50, 56);
    width: 100%;
    height: 50%;
    border-radius: 10px;
    align-items: center;

    .code-header {
        display: flex;
        flex-direction: row;
        justify-content: start;
        height: 25px;
        width: 97%;

        // gap: 50px;
        .green-btn {
            background-color: rgb(39, 201, 63);
            border-radius: 50%;
            height: 15px;
            width: 15px;
            margin: 5px;
        }

        .red-btn {
            background-color: rgb(255, 95, 86);
            border-radius: 50%;
            height: 15px;
            width: 15px;
            margin: 5px;
        }

        .yellow-btn {
            background-color: rgb(255, 189, 46);
            border-radius: 50%;
            height: 15px;
            width: 15px;
            margin: 5px;
        }
    }

    .code-content {
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 95%;

        .cursor {
            // width: 2em;
            color: aliceblue;
            border-bottom: 2px solid aliceblue;
            animation: slink 1.5s infinite;
        }

        @keyframes slink {

            0%,
            100% {
                opacity: 0;
            }

            50% {
                opacity: 1;
            }
        }
    }
}</style>
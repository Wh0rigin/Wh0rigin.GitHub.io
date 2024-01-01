<script lang="ts" setup>
import FooterBg from './FooterBg.vue';
// import Clock3d from './footer/Clock3d.vue'
</script>


<template>
    <footer-bg></footer-bg>
    <footer class="footer">
        <div class="container">
            <div class="area1">
                <!-- <clock3d></clock3d> -->
                <h2>Footer1</h2>
                <ul>
                    <li>first item</li>
                    <li>second item</li>
                    <li>third item</li>
                </ul>
            </div>
            <div class="area2">
                <h2>Footer2</h2>
                <ul>
                    <li>first item</li>
                    <li>second item</li>
                    <li>third item</li>
                </ul>
            </div>
            <div class="area3">
                <h2>Footer3</h2>
                <ul>
                    <li>first item</li>
                    <li>second item</li>
                    <li>third item</li>
                </ul>
            </div>
        </div>
    </footer>
</template>



<style lang="less" scoped>
.footer {
    background-color: rgb(68, 68, 68);
    color: #fff;
    padding: 20px 0;
    // display: flex;
    // flex-direction: column;

    .container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        

        .area1 {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            ul{
                position: relative;
                left: 20px;
            }

            li {
                margin-top: 10px;
                color: gainsboro;
            }
        }

        .area2 {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            ul{
                position: relative;
                left: 20px;
            }

            li {
                margin-top: 10px;
                color: gainsboro;
            }
        }

        .area3 {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            ul{
                position: relative;
                left: 20px;
            }

            li {
                margin-top: 10px;
                color: gainsboro;
            }
        }
    }

    .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .social-links {
        a {
            color: #fff;
            margin-right: 10px;
            font-size: 20px;
            text-decoration: none;
        }

        i {
            transition: color 0.3s ease-in-out;
        }

        a:hover i {
            color: #55acee;
            /* Twitter blue color */
        }
    }
}
</style>

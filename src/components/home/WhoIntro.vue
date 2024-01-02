<template>
    <div class="main">
        <!-- <h1>Hello.</h1> -->
        <div class="jumping-text">
            <span style="--index: 1;">H</span>
            <span style="--index: 2;">e</span>
            <span style="--index: 3;">l</span>
            <span style="--index: 4;">l</span>
            <span style="--index: 5;">o</span>
            <span style="--index: 6;">.</span>
        </div>
        <p class="name">My name is Wh0rigin.</p>
        <p>
            I'm a student programmer. Most of my work is open source and publicly
            available on
            <a href="https://github.com/Wh0rigin" target="_blank">GitHub</a>.
        </p>
        <p>
            I'm interested in Software development.
            <br />
            Such as <i>IOT</i>, <i>Android</i>, <i>Architecture</i>, <i>Blockchain</i>, <i>And implementation of some
                Middleware</i>.
        </p>
        <p>
            <u>Explore everything I'm curious about. To collide all the different ideas. Wired all the different ideas</u>.
        </p>
    </div>
</template>

<style lang="less" scoped>
@font-family: "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
@font-size: calc(10px + 0.33vw);

.main {
    font-family: @font-family;
    font-size: @font-size;
    -webkit-font-smoothing: antialiased;
    padding: 5vh 10vw;
    color: #121314;

    .jumping-text {
        span {

            font-size: 4.5em;
            font-weight: 500;
            margin-bottom: 0;
            display: inline-block;
            animation: jump 10s infinite;
            animation-delay: calc(0.1s * var(--index));

            @keyframes jump {
                0% {
                    transform: translateY(0);
                    // opacity: 0;
                }

                10% {
                    transform: translateY(-20px);
                    // opacity: 1;
                }

                20% {
                    transform: translateY(0);
                    // opacity: 0;
                }

                30% {
                    transform: translateY(-20px);
                    // opacity: 1;
                }

                40% {
                    transform: translateY(0);
                    // opacity: 0;
                }

                50% {
                    transform: translateY(-20px);
                    // opacity: 1;
                }

                60% {
                    transform: translateY(0);
                    // opacity: 0;
                }

                70% {
                    transform: translateY(-20px);
                    // opacity: 1;
                }

                80% {
                    transform: translateY(0);
                    // opacity: 0;
                }

                90% {
                    transform: translateY(-20px);
                    // opacity: 1;
                }

                100% {
                    transform: translateY(0);
                    // opacity: 1;
                }
            }
        }
    }
}

h1 {

    font-size: 4.5em;
    font-weight: 500;
    margin-bottom: 0;
}

.name {

    font-weight: 500;
    font-size: 2.2em;
}

p {

    font-size: 1.6em;
    font-weight: 300;
    line-height: 1.4;
    max-width: 28em;
}

a {

    text-decoration: none;
    color: #121314;
    position: relative;
    z-index: 1;

    &:after {
        content: "";
        position: absolute;
        z-index: 0;
        top: 60%;
        left: -0.1em;
        right: -0.1em;
        bottom: 0;
        transition: top 200ms cubic-bezier(0, 0.8, 0.13, 1);
        background-color: rgba(103, 171, 214, 0.5);
    }

    &:hover:after {
        top: 0%;
    }
}</style>

<template>
    <header class="navbar">
        <div class="logo">
            <img src="@/assets/logo.png" alt="Logo" />
        </div>
        <nav class="nav-links">
            <router-link to="/">首页</router-link>
        </nav>
    </header>
</template>


<style scoped lang="less">
.navbar {
    background: linear-gradient(135deg, #232526, #414345);
    color: #fff;

    padding: 0px 200px;
    display: flex;
    align-items: center;
}

.logo img {
    margin-right: 20px;
    width: 120px;
}

.nav-links {
    display: flex;
    font-size: 18px;
    gap: 40px;
    height: fit-content;

    a {
        color: #fff;
        text-decoration: none;
    }

    & :hover {
        border-bottom: 2px solid #fff;
    }
}
</style>

<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <p>&copy; {{ currentYear }} Your Company. All rights reserved.</p>
                <div class="social-links">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-facebook"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
    const currentYear =  new Date().getFullYear();
</script>


<style lang="less" scoped>
.footer {
    background-color: #333;
    color: #fff;
    padding: 20px 0;

    .container {
        max-width: 1200px;
        margin: 0 auto;
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

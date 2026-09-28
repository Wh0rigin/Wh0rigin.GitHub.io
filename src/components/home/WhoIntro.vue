<template>
    <article class="intro-card">
        <p class="eyebrow">About me</p>
        <h2>Hello,<br /><span>I'm Wh0rigin.</span></h2>
        <p class="lead">I'm a student developer who enjoys turning curiosity into things that work.</p>
        <p class="details">
            I'm interested in software development, from IoT and Android to architecture, blockchain, and middleware.
        </p>
        <p class="details">I explore ideas, connect them, and build along the way.</p>
        <a class="profile-link" href="https://github.com/Wh0rigin" target="_blank" rel="noreferrer">
            Find me on GitHub <span aria-hidden="true">↗</span>
        </a>
    </article>
</template>

<style lang="less" scoped>
.intro-card {
    position: relative;
    overflow: hidden;
    padding: clamp(28px, 4vw, 48px);
    border: var(--panel-border-width) solid var(--border);
    border-radius: var(--panel-radius);
    color: var(--text);
    background: var(--surface);
    box-shadow: var(--shadow);
    backdrop-filter: blur(14px);
    transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;

    &::before {
        position: absolute;
        top: 0;
        right: 12%;
        left: 12%;
        height: 3px;
        background: linear-gradient(90deg, transparent, var(--mint), var(--accent), transparent);
        content: "";
    }

    &:hover {
        border-color: color-mix(in srgb, var(--accent) 42%, var(--border));
        transform: translateY(-4px);
    }
}

:global(html[data-theme="dark"] .intro-card) {
    border-color: rgba(255, 255, 255, 0.7);
    box-shadow: 10px 10px 0 var(--accent), 18px 18px 0 #000000;
}

:global(html[data-theme="dark"] .intro-card::before) {
    top: 18px;
    right: -38px;
    left: auto;
    width: 150px;
    height: 16px;
    background: var(--accent);
    transform: rotate(37deg);
}

:global(html[data-theme="dark"] .intro-card:hover) {
    border-color: #ffffff;
    box-shadow: 6px 6px 0 var(--accent), 12px 12px 0 #000000;
    transform: translate(4px, 4px);
}

.eyebrow {
    margin-bottom: 18px;
    color: var(--accent-strong);
    font-size: 0.76rem;
    font-weight: 750;
    letter-spacing: 0.18em;
    text-transform: uppercase;
}

h2 {
    margin: 0;
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 780;
    letter-spacing: -0.06em;
    line-height: 1.12;

    span {
        color: var(--accent-strong);
    }
}

.lead {
    margin-top: 22px;
    color: var(--text);
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.75;
}

.details {
    margin-top: 14px;
    color: var(--text-muted);
    font-size: 0.96rem;
    line-height: 1.8;
}

.profile-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    color: var(--accent-strong);
    font-size: 0.93rem;
    font-weight: 700;
    text-decoration: none;

    span {
        transition: transform 160ms ease;
    }

    &:hover span {
        transform: translate(2px, -2px);
    }
}
</style>

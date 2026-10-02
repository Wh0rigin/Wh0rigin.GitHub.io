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
    padding: clamp(1.75rem, 4vw, 3rem);
    border: var(--panel-border-width) solid var(--border);
    border-radius: var(--panel-radius);
    color: var(--text);
    background: var(--surface);
    box-shadow: var(--shadow);
    backdrop-filter: blur(0.875rem);
    transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;

    &::before {
        position: absolute;
        top: 0;
        right: 12%;
        left: 12%;
        height: 0.1875rem;
        background: linear-gradient(90deg, transparent, var(--mint), var(--accent), transparent);
        content: "";
    }

    &:hover {
        border-color: color-mix(in srgb, var(--accent) 42%, var(--border));
        transform: translateY(-0.25rem);
    }
}

:global(html[data-theme="light"] .intro-card) {
    border: 0.1875rem solid #003b9e;
    box-shadow: 0.6875rem 0.6875rem 0 #19d9e9, 1.0625rem 1.0625rem 0 #002578;
}

:global(html[data-theme="light"] .intro-card::before) {
    top: 0;
    right: 0;
    left: auto;
    width: 5.5rem;
    height: 5.5rem;
    background: #17ddec;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
}

:global(html[data-theme="light"] .intro-card:hover) {
    border-color: #00bfdc;
    box-shadow: 0.4375rem 0.4375rem 0 #19d9e9, 0.8125rem 0.8125rem 0 #002578;
    transform: translate(0.25rem, 0.25rem);
}

:global(html[data-theme="light"] .intro-card h2) {
    font-style: italic;
    font-weight: 900;
    transform: skewX(-4deg);
}

:global(html[data-theme="light"] .intro-card .eyebrow) {
    width: fit-content;
    padding: 0.375rem 0.625rem;
    color: #ffffff;
    background: #003c9d;
    transform: skewX(-8deg);
}

:global(html[data-theme="dark"] .intro-card) {
    border-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0.625rem 0.625rem 0 var(--accent), 1.125rem 1.125rem 0 #000000;
}

:global(html[data-theme="dark"] .intro-card::before) {
    top: 1.125rem;
    right: -2.375rem;
    left: auto;
    width: 9.375rem;
    height: 1rem;
    background: var(--accent);
    transform: rotate(37deg);
}

:global(html[data-theme="dark"] .intro-card:hover) {
    border-color: #ffffff;
    box-shadow: 0.375rem 0.375rem 0 var(--accent), 0.75rem 0.75rem 0 #000000;
    transform: translate(0.25rem, 0.25rem);
}

.eyebrow {
    margin-bottom: 1.125rem;
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
    margin-top: 1.375rem;
    color: var(--text);
    font-size: 1.05rem;
    font-weight: 600;
    line-height: 1.75;
}

.details {
    margin-top: 0.875rem;
    color: var(--text-muted);
    font-size: 0.96rem;
    line-height: 1.8;
}

.profile-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    color: var(--accent-strong);
    font-size: 0.93rem;
    font-weight: 700;
    text-decoration: none;

    span {
        transition: transform 160ms ease;
    }

    &:hover span {
        transform: translate(0.125rem, -0.125rem);
    }
}
</style>

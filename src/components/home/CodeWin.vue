<template>
    <section class="terminal" aria-label="代码终端示例">
        <div class="terminal-header">
            <div class="window-controls" aria-hidden="true">
                <span class="red-btn"></span>
                <span class="yellow-btn"></span>
                <span class="green-btn"></span>
            </div>
            <span class="window-title">python — interactive session</span>
        </div>
        <div class="terminal-content">
            <p>Type "help", "copyright", "credits" or "license" for more information.</p>
            <p><span class="prompt">&gt;&gt;&gt;</span> print('hello world') <span class="cursor">_</span></p>
        </div>
    </section>
</template>

<style lang="less" scoped>
.terminal {
    position: relative;
    width: 100%;
    min-height: 260px;
    overflow: hidden;
    border: var(--panel-border-width) solid var(--terminal-border);
    border-radius: var(--panel-radius);
    color: var(--terminal-text);
    background: var(--terminal-surface);
    box-shadow: var(--shadow);
    transition: border-color 220ms ease, background-color 220ms ease, box-shadow 220ms ease, transform 220ms ease;

    &::after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -42%;
        width: 32%;
        pointer-events: none;
        background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 9%, transparent), transparent);
        transform: skewX(-18deg);
        animation: terminal-scan 7s ease-in-out infinite;
        content: "";
    }

    &:hover {
        border-color: var(--accent);
        transform: translateY(-4px);
    }
}

.terminal-header {
    display: flex;
    min-height: 54px;
    align-items: center;
    gap: 16px;
    padding: 0 20px;
    border-bottom: 1px solid var(--terminal-divider);
}

.window-controls {
    display: flex;
    gap: 7px;

    span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }
}

.red-btn { background: #ff6258; }
.yellow-btn { background: #ffbd45; }
.green-btn { background: #31c96a; }

.window-title {
    color: var(--terminal-muted);
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: 0.76rem;
}

.terminal-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 26px 24px;
    color: var(--terminal-text);
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: clamp(0.74rem, 1vw, 0.88rem);
    line-height: 1.7;
}

.prompt { color: var(--terminal-prompt); }

.cursor {
    color: var(--terminal-cursor);
    animation: blink 1.2s steps(2, start) infinite;
}

:global(html[data-theme="dark"] .terminal) {
    box-shadow: 10px 10px 0 #000000, 14px 14px 0 color-mix(in srgb, var(--accent) 55%, transparent);
}

:global(html[data-theme="dark"] .terminal::after) {
    width: 18%;
    background: linear-gradient(90deg, transparent, rgba(255, 56, 66, 0.18), transparent);
    transform: skewX(-28deg);
    animation-duration: 4.8s;
}

:global(html[data-theme="dark"] .terminal:hover) {
    box-shadow: 6px 6px 0 #000000, 10px 10px 0 color-mix(in srgb, var(--accent) 70%, transparent);
    transform: translate(4px, 4px);
}

:global(html[data-theme="dark"] .terminal-header) {
    background: linear-gradient(105deg, color-mix(in srgb, var(--accent) 18%, transparent), transparent 54%);
}

:global(html[data-theme="dark"] .red-btn),
:global(html[data-theme="dark"] .yellow-btn),
:global(html[data-theme="dark"] .green-btn) {
    border-radius: 1px;
}

@keyframes terminal-scan {
    0%, 18% { left: -42%; opacity: 0; }
    30% { opacity: 1; }
    64%, 100% { left: 118%; opacity: 0; }
}

@keyframes blink {
    to { visibility: hidden; }
}

@media (max-width: 520px) {
    .terminal {
        min-height: 220px;
    }

    .terminal-content {
        padding: 22px 18px;
    }
}
</style>

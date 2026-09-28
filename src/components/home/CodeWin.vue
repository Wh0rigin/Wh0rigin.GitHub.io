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
    width: 100%;
    min-height: 260px;
    overflow: hidden;
    border: 1px solid var(--terminal-border);
    border-radius: 22px;
    color: var(--terminal-text);
    background: var(--terminal-surface);
    box-shadow: var(--shadow);
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

@keyframes blink {
    to { visibility: hidden; }
}

@media (max-width: 520px) {
    .terminal {
        min-height: 220px;
        border-radius: 18px;
    }

    .terminal-content {
        padding: 22px 18px;
    }
}
</style>

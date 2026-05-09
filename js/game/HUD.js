const POWERUP_DURATION = 5000; // ms — must match game.js timeouts

export function updateHUD(game) {
    const now = Date.now();

    /* ── Time display ─────────────────────────────────────────────── */
    const isUrgent = game.timeLeft <= 10;
    const timeDisplay = `<div class="hud-row">
        <span>⏳</span>
        <span class="hud-time ${isUrgent ? 'urgent' : ''}">${game.timeLeft}s</span>
    </div>`;

    /* ── Scores ────────────────────────────────────────────────────── */
    const p2Label = game.player2 ? '👥 P2' : '🤖 Bot';
    const p2Score  = game.player2 ? game.player2.score : game.bot?.score ?? 0;

    const scores = `
        <hr class="hud-divider">
        <div class="hud-row">
            <span>🧑 P1</span>
            <span class="hud-value">${game.player.score}</span>
        </div>
        <div class="hud-row">
            <span>${p2Label}</span>
            <span class="hud-value">${p2Score}</span>
        </div>
        <div class="hud-row">
            <span class="hud-label">🏆 Best</span>
            <span style="color:#ffd740;font-weight:700;">${game.highScore}</span>
        </div>`;

    /* ── Power-up bars ─────────────────────────────────────────────── */
    let bars = '';
    const entities = [
        { label: '⚡ P1', fast: game.player.fastUntil, freeze: game.player.freezeUntil },
    ];
    if (game.player2)  entities.push({ label: '⚡ P2',  fast: game.player2.fastUntil,  freeze: game.player2.freezeUntil });
    if (game.bot)      entities.push({ label: '⚡ Bot', fast: game.bot.fastUntil,       freeze: game.bot.freezeUntil });

    for (const e of entities) {
        const fastRemain   = e.fast   ? Math.max(0, e.fast   - now) : 0;
        const freezeRemain = e.freeze ? Math.max(0, e.freeze - now) : 0;

        if (fastRemain > 0) {
            const pct = (fastRemain / POWERUP_DURATION * 100).toFixed(1);
            bars += `
            <div class="powerup-bar-wrap">
                <div class="powerup-bar-label">
                    <span class="pb-name">🔥 ${e.label} Fast</span>
                    <span class="pb-time" style="color:#ffd740">${(fastRemain/1000).toFixed(1)}s</span>
                </div>
                <div class="powerup-bar-track">
                    <div class="powerup-bar-fill fast" style="width:${pct}%"></div>
                </div>
            </div>`;
        }

        if (freezeRemain > 0) {
            const pct = (freezeRemain / POWERUP_DURATION * 100).toFixed(1);
            bars += `
            <div class="powerup-bar-wrap">
                <div class="powerup-bar-label">
                    <span class="pb-name">❄️ ${e.label} Frozen</span>
                    <span class="pb-time" style="color:#00e5ff">${(freezeRemain/1000).toFixed(1)}s</span>
                </div>
                <div class="powerup-bar-track">
                    <div class="powerup-bar-fill freeze" style="width:${pct}%"></div>
                </div>
            </div>`;
        }
    }

    const powerupSection = bars
        ? `<hr class="hud-divider"><div class="powerup-status">${bars}</div>`
        : '';

    game.hud.innerHTML = timeDisplay + scores + powerupSection;
}
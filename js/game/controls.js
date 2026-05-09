export function initControls(game) {

    /* ── Keyboard ──────────────────────────────────────────────── */
    window.addEventListener("keydown", (e) => {
        if (game.gameOver) return;
        if (!game.keys.includes(e.key)) game.keys.push(e.key);
    });

    window.addEventListener("keyup", (e) => {
        game.keys = game.keys.filter(k => k !== e.key);
    });

    /* ── Mobile D-pad helper ───────────────────────────────────── */
    function bindDpad(padId, keyMap) {
        const pad = document.getElementById(padId);
        if (!pad) return;

        pad.querySelectorAll("[data-key]").forEach(btn => {
            const key = btn.dataset.key;

            const press = (e) => {
                e.preventDefault();
                if (!game.keys.includes(key)) game.keys.push(key);
                btn.classList.add("active");
            };

            const release = (e) => {
                e.preventDefault();
                game.keys = game.keys.filter(k => k !== key);
                btn.classList.remove("active");
            };

            btn.addEventListener("touchstart",  press,   { passive: false });
            btn.addEventListener("touchend",    release, { passive: false });
            btn.addEventListener("touchcancel", release, { passive: false });

            // Also allow mouse for desktop testing
            btn.addEventListener("mousedown", press);
            btn.addEventListener("mouseup",   release);
            btn.addEventListener("mouseleave", release);
        });
    }

    bindDpad("dpad-p1", {
        "dpad-up":    "ArrowUp",
        "dpad-down":  "ArrowDown",
        "dpad-left":  "ArrowLeft",
        "dpad-right": "ArrowRight",
    });

    bindDpad("dpad-p2", {
        "dpad-up":    "w",
        "dpad-down":  "s",
        "dpad-left":  "a",
        "dpad-right": "d",
    });

    /* ── Show/hide P2 pad based on mode ───────────────────────── */
    const p2pad = document.getElementById("dpad-p2");
    if (p2pad) {
        p2pad.style.display = game.mode === "multi" ? "grid" : "none";
    }
}
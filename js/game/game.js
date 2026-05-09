import { Player } from "../entities/player.js";
import { Bot } from "../entities/bot.js";
import { initControls } from "./controls.js";
import { createFood, createFastFood, createFreeze, moveFreeze, moveFood, moveFastFood } from "./Food.js";
import { updateHUD } from "./HUD.js";
import { SoundManager } from "../utils/SoundManager.js";

const POWERUP_DURATION = 5000; // ms

export class Game {

    constructor(level, mode) {

        this.level = level;
        this.mode = mode;

        this.gameArea = document.getElementById("gameArea");
        this.hud = document.getElementById("hud");
        this.winnerScreen = document.getElementById("winnerScreen");
        this.toast = document.getElementById("powerupToast");

        this.timeLeft = 60;
        this.keys = [];
        this.gameOver = false;

        this.highScore = localStorage.getItem("highScore") || 0;

        this.player = new Player(this.gameArea, "./resources/player.gif", 500, 300, 2);

        if (mode === "multi") {
            this.player2 = new Player(this.gameArea, "./resources/bot.gif", 200, 100, 2);
        } else {
            this.bot = new Bot(this.gameArea, "./resources/bot.gif", 200, 100, 1.5);
        }

        this.setDifficulty();

        const food = createFood(this.gameArea);
        this.food = food.food;
        this.foodX = food.foodX;
        this.foodY = food.foodY;
        moveFood(this);

        const fastFood = createFastFood(this.gameArea);
        this.fastFood = fastFood.fastFood;
        this.fastFoodX = fastFood.fastFoodX;
        this.fastFoodY = fastFood.fastFoodY;
        moveFastFood(this);

        const freeze = createFreeze(this.gameArea);
        this.freeze = freeze.freeze;
        this.freezeX = freeze.freezeX;
        this.freezeY = freeze.freezeY;
        moveFreeze(this);

        this.sound = new SoundManager();

        initControls(this);
    }

    /* ── Difficulty ─────────────────────────────────────────────────── */
    setDifficulty() {
        if (this.level === "easy")   this.timeLeft = 90;
        if (this.level === "medium") this.timeLeft = 60;
        if (this.level === "hard")   this.timeLeft = 45;
    }

    /* ── Start / sound ──────────────────────────────────────────────── */
    start() {
        this.startTimer();
        this.gameLoop();
        this.sound.bgSound.play();
    }

    toggleSound() {
        this.sound.toggle();
    }

    /* ── Timer ──────────────────────────────────────────────────────── */
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) this.endGame();
        }, 1000);
    }

    /* ── Toast notification ─────────────────────────────────────────── */
    showToast(message, type) {
        if (!this.toast) return;
        this.toast.className = '';            // reset
        this.toast.textContent = message;
        // Force reflow so animation restarts
        void this.toast.offsetWidth;
        this.toast.classList.add('show', `${type}-toast`);
    }

    /* ── Apply fast power-up to an entity ──────────────────────────── */
    applyFast(entity, label) {
        // Clear previous fast timer if still active
        if (entity._fastTimer) clearTimeout(entity._fastTimer);
        if (!entity.fastActive) {
            entity.speed *= 1.5;
            entity.fastActive = true;
        }
        entity.fastUntil = Date.now() + POWERUP_DURATION;
        entity.element.classList.add('speeding');

        this.sound.fastSound.play();
        this.showToast(`⚡ ${label} Speed Boost!\n5 seconds`, 'fast');

        entity._fastTimer = setTimeout(() => {
            entity.speed /= 1.5;
            entity.fastActive = false;
            entity.fastUntil = null;
            entity.element.classList.remove('speeding');
        }, POWERUP_DURATION);

        moveFastFood(this);
    }

    /* ── Apply freeze power-up to an entity ────────────────────────── */
    applyFreeze(entity, label) {
        if (entity._freezeTimer) clearTimeout(entity._freezeTimer);
        entity.freeze = true;
        entity.freezeUntil = Date.now() + POWERUP_DURATION;
        entity.element.classList.add('frozen');

        this.sound.freezeSound.play();
        this.showToast(`❄️ ${label} Frozen!\n5 seconds`, 'freeze');

        entity._freezeTimer = setTimeout(() => {
            entity.freeze = false;
            entity.freezeUntil = null;
            entity.element.classList.remove('frozen');
        }, POWERUP_DURATION);

        moveFreeze(this);
    }

    /* ── Collision ──────────────────────────────────────────────────── */
    checkCollision(obj, x, y, size) {
        const b = obj.getBounds();
        return (
            b.right  > x &&
            b.left   < x + size &&
            b.bottom > y &&
            b.top    < y + size
        );
    }

    /* ── End game ───────────────────────────────────────────────────── */
    endGame() {
        clearInterval(this.timer);
        this.gameOver = true;

        let winner;
        if (this.mode === 'multi') {
            if (this.player.score > this.player2.score)       { winner = "🏆 Player 1 Wins!"; this.sound.winSound.play(); }
            else if (this.player2.score > this.player.score)  { winner = "🏆 Player 2 Wins!"; this.sound.winSound.play(); }
            else                                               { winner = "🤝 It's a Draw!";   this.sound.drawSound.play(); }
        } else {
            if (this.player.score > this.bot.score)           { winner = "🏆 You Win!";        this.sound.winSound.play(); }
            else if (this.bot.score > this.player.score)      { winner = "🤖 Bot Wins!";       this.sound.gameOverSound.play(); }
            else                                               { winner = "🤝 It's a Draw!";   this.sound.drawSound.play(); }
        }

        document.getElementById("winnerText").innerText = winner;
        document.getElementById("gameOverScreen").style.display = "flex";
        this.winnerScreen.innerText = winner;

        if (this.player.score > this.highScore) {
            localStorage.setItem("highScore", this.player.score);
        }
    }

    /* ── Game Loop ──────────────────────────────────────────────────── */
    gameLoop() {

        /* Player movement */
        this.player.render();
        if (this.keys.includes("ArrowRight")) this.player.move(1, 0);
        if (this.keys.includes("ArrowLeft"))  this.player.move(-1, 0);
        if (this.keys.includes("ArrowUp"))    this.player.move(0, -1);
        if (this.keys.includes("ArrowDown"))  this.player.move(0, 1);

        /* Player 2 (multiplayer) */
        if (this.player2) {
            if (this.keys.includes("d")) this.player2.move(1, 0);
            if (this.keys.includes("a")) this.player2.move(-1, 0);
            if (this.keys.includes("w")) this.player2.move(0, -1);
            if (this.keys.includes("s")) this.player2.move(0, 1);
            this.player2.render();
        }

        /* Bot */
        if (this.bot) {
            this.bot.moveTowardFood(this.foodX, this.foodY);
            this.bot.render();
        }

        /* ── Normal food collisions ─────────────────────────────────── */
        if (this.checkCollision(this.player, this.foodX, this.foodY, 60)) {
            this.player.grow();
            this.sound.eatSound.play();
            moveFood(this);
        }

        if (this.player2 && this.checkCollision(this.player2, this.foodX, this.foodY, 60)) {
            this.player2.grow();
            this.sound.eatSound.play();
            moveFood(this);
        }

        if (this.bot && this.checkCollision(this.bot, this.foodX, this.foodY, 60)) {
            this.bot.grow();
            this.sound.eatSound.play();
            moveFood(this);
        }

        /* ── Fast-food collisions ───────────────────────────────────── */
        if (this.fastFood) {
            if (this.checkCollision(this.player, this.fastFoodX, this.fastFoodY, 40)) {
                this.applyFast(this.player, "Player");
            } else if (this.player2 && this.checkCollision(this.player2, this.fastFoodX, this.fastFoodY, 40)) {
                this.applyFast(this.player2, "Player 2");
            } else if (this.bot && this.checkCollision(this.bot, this.fastFoodX, this.fastFoodY, 40)) {
                this.applyFast(this.bot, "Bot");
            }
        }

        /* ── Freeze collisions ──────────────────────────────────────── */
        if (this.checkCollision(this.player, this.freezeX, this.freezeY, 40)) {
            this.applyFreeze(this.player, "Player");
        }

        if (this.player2 && this.checkCollision(this.player2, this.freezeX, this.freezeY, 40)) {
            this.applyFreeze(this.player2, "Player 2");
        }

        if (this.bot && this.checkCollision(this.bot, this.freezeX, this.freezeY, 40)) {
            this.applyFreeze(this.bot, "Bot");
        }

        /* HUD update */
        updateHUD(this);

        if (!this.gameOver) requestAnimationFrame(() => this.gameLoop());
    }
}

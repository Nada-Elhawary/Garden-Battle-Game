export class SoundManager {

    constructor() {

        this.eatSound = document.getElementById("eatSound");
        this.bgSound = document.getElementById("bgSound");
        this.winSound = document.getElementById("winSound");
        this.drawSound = document.getElementById("drawSound");
        this.gameOverSound = document.getElementById("gameOverSound");
        this.fastSound = document.getElementById("fastSound");
        this.freezeSound = document.getElementById("freezeSound");

        this.isMuted = false;
    }

    toggle() {

        this.isMuted = !this.isMuted;

        this.eatSound.muted = this.isMuted;
        this.winSound.muted = this.isMuted;
        this.gameOverSound.muted = this.isMuted;
        this.bgSound.muted = this.isMuted;
        this.drawSound.muted = this.isMuted;
        this.fastSound.muted = this.isMuted;
        this.freezeSound.muted = this.isMuted;

        const btn = document.getElementById("muteBtn");
        btn.innerText = this.isMuted ? "🔇" : "🔊";
    }
}
import { Game } from "./game/game.js";

let game;

document.getElementById("startBtn").onclick = () => {

    const level = document.getElementById("levelSelect").value;
    const mode  = document.getElementById("modeSelect").value;

    game = new Game(level, mode);

    document.getElementById("startScreen").style.display = "none";

    game.start();
};

document.getElementById("restartBtn").onclick = () => {
    location.reload();
};

document.getElementById("muteBtn").onclick = () => {
    game.toggleSound();
};

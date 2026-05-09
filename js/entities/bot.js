// import { Player } from "./player.js";

// export class Bot extends Player {
//     constructor(gameArea, image, x, y, speed) {
//         super(gameArea, image, x, y, speed);
//     }

//     moveTowardFood(foodX, foodY) {
//         const botPos = this.getPosition();

//         const dx = foodX > botPos.x ? 1 : -1;
//         const dy = foodY > botPos.y ? 1 : -1;

//         this.move(dx, dy);
//     }
// }

import { Player } from "./player.js";

export class Bot extends Player {

    constructor(gameArea, image, x, y, speed) {

        super(gameArea, image, x, y, speed);

        this.freeze = false;
    }

    moveTowardFood(foodX, foodY) {

        if (this.freeze) return;

        const pos = this.getPosition();

        const dx = foodX > pos.x ? 1 : -1;
        const dy = foodY > pos.y ? 1 : -1;

        this.move(dx, dy);

    }

}
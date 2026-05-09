// export class Player {
//     #x; #y; #size; speed;

//     constructor(gameArea, image, x, y, speed = 5) {
//         this.gameArea = gameArea;
//         this.#x = x;
//         this.#y = y;
//         this.#size = 80;
//         this.speed = speed;
//         this.score = 0;

//         this.element = document.createElement("div");
//         this.element.classList.add("character");
//         this.element.style.backgroundImage = `url(${image})`;
//         this.updateSize();

//         this.gameArea.appendChild(this.element);
//         this.render();
//     }

//     move(dx, dy) {
//         this.#x += dx * this.speed;
//         this.#y += dy * this.speed;

//         this.#x = Math.max(0, Math.min(window.innerWidth - this.#size, this.#x));
//         this.#y = Math.max(0, Math.min(window.innerHeight - this.#size, this.#y));
//     }

//     grow() {
//         this.#size += 10;
//         this.score++;

//         this.speed *= 0.95;

//         this.updateSize();
//     }



//     updateSize() {
//         this.element.style.width = this.#size + "px";
//         this.element.style.height = this.#size + "px";
//     }

//     render() {
//         this.element.style.left = this.#x + "px";
//         this.element.style.top = this.#y + "px";
//     }

//     getBounds() {
//         return {
//             left: this.#x,
//             right: this.#x + this.#size,
//             top: this.#y,
//             bottom: this.#y + this.#size
//         };
//     }

//     getPosition() {
//         return { x: this.#x, y: this.#y };
//     }
// }


export class Player {

    #x
    #y
    #size
   
    constructor(gameArea, image, x, y, speed) {

        this.gameArea = gameArea;
        this.freeze = false;

        this.#x = x
        this.#y = y
        this.#size = 80
        this.speed = speed

        this.score = 0

        this.element = document.createElement("div")

        this.element.classList.add("character")

        this.element.style.backgroundImage = `url(${image})`

        this.updateSize()

        this.gameArea.appendChild(this.element)

        this.render()

    }

    move(dx, dy) {


        if (this.freeze) return;

        this.#x += dx * this.speed
        this.#y += dy * this.speed

        this.#x = Math.max(0, Math.min(window.innerWidth - this.#size, this.#x))
        this.#y = Math.max(0, Math.min(window.innerHeight - this.#size, this.#y))

    }

    grow() {

        this.#size += 10
        this.score++

        this.speed *= 1.01

        this.updateSize()

    }

    updateSize() {

        this.element.style.width = this.#size + "px"
        this.element.style.height = this.#size + "px"

    }

    render() {

        this.element.style.left = this.#x + "px"
        this.element.style.top = this.#y + "px"

    }

    getBounds() {

        return {

            left: this.#x,
            right: this.#x + this.#size,
            top: this.#y,
            bottom: this.#y + this.#size

        }

    }

    getPosition() {

        return {

            x: this.#x,
            y: this.#y

        }

    }

}
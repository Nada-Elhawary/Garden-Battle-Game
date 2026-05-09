export function createFood(gameArea) {

    const food = document.createElement("div");
    food.classList.add("food");

    gameArea.appendChild(food);

    return {
        food,
        foodX: 0,
        foodY: 0
    };
}
export function createFastFood(gameArea) {

    const fastFood = document.createElement("div");
    fastFood.classList.add("power");

    gameArea.appendChild(fastFood);

    return {
        fastFood,
        fastFoodX: 0,
        fastFoodY: 0
    };
}

export function createFreeze(gameArea) {
    const freeze = document.createElement("div");
    freeze.className = "freeze";
    gameArea.appendChild(freeze);
    let freezeX = Math.random() * (gameArea.clientWidth - 60);
    let freezeY = Math.random() * (gameArea.clientHeight - 60);
    freeze.style.left = freezeX + "px";
    freeze.style.top = freezeY + "px";
    return { freeze, freezeX, freezeY };
}

export function moveFood(game) {

    game.foodX = Math.random() * (window.innerWidth - 60);
    game.foodY = Math.random() * (window.innerHeight - 60);

    game.food.style.left = game.foodX + "px";
    game.food.style.top = game.foodY + "px";
}


export function moveFastFood(game) {
    game.fastFoodX = Math.random() * (window.innerWidth - 40);
    game.fastFoodY = Math.random() * (window.innerHeight - 40);

    game.fastFood.style.left = game.fastFoodX + "px";
    game.fastFood.style.top = game.fastFoodY + "px";
}


export function moveFreeze(game) {
    game.freezeX = Math.random() * (game.gameArea.clientWidth - 60);
    game.freezeY = Math.random() * (game.gameArea.clientHeight - 60);
    game.freeze.style.left = game.freezeX + "px";
    game.freeze.style.top = game.freezeY + "px";
}

// export function createFood(game){

// game.food=document.createElement("div");

// game.food.classList.add("food");

// game.gameArea.appendChild(game.food);

// moveFood(game);

// }

// export function moveFood(game){

// game.foodX=Math.random()*(window.innerWidth-60);
// game.foodY=Math.random()*(window.innerHeight-60);

// game.food.style.left=game.foodX+"px";
// game.food.style.top=game.foodY+"px";

// }
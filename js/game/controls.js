// export function initControls(game) {

//     window.addEventListener("keydown", (e) => {

//         if (game.gameOver) return;

//         game.keys.push(e.key);
//         game.player.render();
//     });

//     window.addEventListener("keyup", (e) => {

//         if (game.gameOver) return;

//         game.keys = game.keys.filter(k => k != e.key);
//     });
// }

export function initControls(game){

window.addEventListener("keydown",(e)=>{

if(game.gameOver) return;

if(!game.keys.includes(e.key)) game.keys.push(e.key);

})

window.addEventListener("keyup",(e)=>{

game.keys=game.keys.filter(k=>k!==e.key);

})

}
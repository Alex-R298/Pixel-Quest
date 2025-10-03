// let canvas;
// let world;
// let keyboard = new Keyboard();


// function init() {
//     canvas = document.getElementById("canvas");
//     world = new World(canvas, keyboard);
// }




// window.addEventListener('keydown', (e) => {
//     if (e.keyCode === 39) keyboard.RIGHT = true;
//     if (e.keyCode === 37) keyboard.LEFT = true;
//     if (e.keyCode === 38) keyboard.UP = true;
//     if (e.keyCode === 40) keyboard.DOWN = true;
//     if (e.keyCode === 32) keyboard.SPACE = true;
//     if (e.keyCode === 87) keyboard.W = true; // W key for climbing
// });

// window.addEventListener('keyup', (e) => {
//     if (e.keyCode === 39) keyboard.RIGHT = false;
//     if (e.keyCode === 37) keyboard.LEFT = false;
//     if (e.keyCode === 38) keyboard.UP = false;
//     if (e.keyCode === 40) keyboard.DOWN = false;
//     if (e.keyCode === 32) keyboard.SPACE = false;
//     if (e.keyCode === 87) keyboard.W = false; // W key for climbing
// });

// window.debugMode = true;

let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode === 65) keyboard.A = true;      // A
    if (e.keyCode === 68) keyboard.D = true;      // D
    if (e.keyCode === 32) keyboard.SPACE = true;  // Space
    if (e.keyCode === 87) keyboard.W = true;      // W
    if (e.keyCode === 83) keyboard.S = true;      // S
    if (e.keyCode === 13) keyboard.ENTER = true;  // Enter
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode === 65) keyboard.A = false;
    if (e.keyCode === 68) keyboard.D = false;
    if (e.keyCode === 32) keyboard.SPACE = false;
    if (e.keyCode === 87) keyboard.W = false;
    if (e.keyCode === 83) keyboard.S = false;
    if (e.keyCode === 13) keyboard.ENTER = false;
});

window.debugMode = true;
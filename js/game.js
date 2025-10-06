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
let isGameStarting = true;
let keyboard = new Keyboard();
let screenMusic = new Audio('./audio/start-screen.mp3');
let gameMusic = new Audio('./audio/background.mp3');

window.addEventListener('keydown', (e) => {
    if (isGameStarting) return;
    if (e.keyCode === 65) keyboard.A = true;      // A
    if (e.keyCode === 68) keyboard.D = true;      // D
    if (e.keyCode === 32) keyboard.SPACE = true;  // Space
    if (e.keyCode === 87) keyboard.W = true;      // W
    if (e.keyCode === 83) keyboard.S = true;      // S
    if (e.keyCode === 13) keyboard.ENTER = true;  // Enter
});

window.addEventListener('keyup', (e) => {
    if (isGameStarting) return;
    if (e.keyCode === 65) keyboard.A = false;
    if (e.keyCode === 68) keyboard.D = false;
    if (e.keyCode === 32) keyboard.SPACE = false;
    if (e.keyCode === 87) keyboard.W = false;
    if (e.keyCode === 83) keyboard.S = false;
    if (e.keyCode === 13) keyboard.ENTER = false;
});

window.addEventListener('load', function() {
    playStartMusic();
    // Nur Musik, KEINE World
});

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard );
}

function playStartMusic() {
    screenMusic.currentTime = 0;
    screenMusic.play();
    screenMusic.loop = true;
    screenMusic.volume = 0.08;
}

function playGameMusic() {
    setTimeout(() => {
    gameMusic.currentTime = 0;
    gameMusic.play();
    gameMusic.loop = true;
    gameMusic.volume = 0.08;
    }, 1000);
}





function startGame() {
    const overlay = document.getElementById('overlay-start-screen');
    const canvas = document.getElementById('canvas');
    setTimeout(() => {
        overlay.style.display = 'none';
        isGameStarting = false;
        canvas.style.filter = 'none';
    }, 1000);
    screenMusic.pause();
    clickButtonSound();
    playGameMusic();
}

function showDeadScreen() {
    const overlay = document.getElementById('overlay-dead-screen');
    const canvas = document.getElementById('canvas');
    canvas.style.filter = 'blur(7px)';
    overlay.style.display = 'flex';
    playGameOverSound();
    stopGameMusic();
}

function showWinScreen() {
    const overlay = document.getElementById('overlay-win-screen');
    const canvas = document.getElementById('canvas');
    canvas.style.filter = 'blur(7px)';
    overlay.style.display = 'flex';
    stopGameMusic();
}

function restartGame(){
    const overlay = document.getElementById('overlay-dead-screen');
    const winOverlay = document.getElementById('overlay-win-screen');
    const canvas = document.getElementById('canvas');
    setTimeout(() => {
        overlay.style.display = 'none';
        winOverlay.style.display = 'none';
        canvas.style.filter = 'none';
    }, 1000);
    if (world) world.cleanup();
    world = new World(canvas, keyboard);
    clickButtonSound();
    playGameMusic();
}

function clickButtonSound() {
    let clickSound = new Audio('./audio/click.mp3');
    clickSound.volume = 0.1;
    clickSound.play();
}

function playGameOverSound() {
    let gameOverSound = new Audio('./audio/game-over.mp3');
    gameOverSound.volume = 0.1;
    gameOverSound.play();
}

function stopGameMusic() {
    gameMusic.pause();
    gameMusic.currentTime = 0;
}

window.debugMode = true;


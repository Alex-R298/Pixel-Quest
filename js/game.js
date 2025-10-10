let canvas;
let world;
let isGameStarting = true;
let keyboard = new Keyboard();
let screenMusic = new Audio('audio/start-screen.mp3');
let gameMusic = new Audio('audio/background.mp3');
let musicVolume = 0;
let sfxVolume = 0.08;


window.addEventListener('keydown', (e) => {
    if (isGameStarting) return;
    if (e.keyCode === 65) keyboard.A = true;
    if (e.keyCode === 68) keyboard.D = true;
    if (e.keyCode === 32) keyboard.SPACE = true;
    if (e.keyCode === 87) keyboard.W = true;
    if (e.keyCode === 83) keyboard.S = true;
    if (e.keyCode === 13) keyboard.ENTER = true;
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


/**
 * Initializes the game application
 */
function init() {
    showIntro();
}


/**
 * Starts the game from main menu
 * @param {Event} event - Click event
 */
function startGame(event) {
    if (!disableButtonTemporarily(event.target, 1000)) return;
    clickButtonSound();
    const mainMenu = document.getElementById('main-menu');
    const canvasElement = document.getElementById('canvas');
    document.querySelector('.back-menu').classList.add('d_none');
    mainMenu.classList.add('fade-out');
    setTimeout(() => fadeToWhite(mainMenu, canvasElement), 500);
    screenMusic.pause();
    playGameMusic();
}


/**
 * Fades screen to white transition
 * @param {HTMLElement} mainMenu - Main menu element
 * @param {HTMLElement} canvasElement - Canvas element
 */
function fadeToWhite(mainMenu, canvasElement) {
    mainMenu.classList.add('d_none');
    canvasElement.style.transition = 'background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    canvasElement.style.backgroundColor = '#ffffff';
    canvasElement.style.filter = 'brightness(1.5)';
    setTimeout(() => initializeGame(canvasElement), 600);
}


/**
 * Initializes game world and controls
 * @param {HTMLElement} canvasElement - Canvas element
 */
function initializeGame(canvasElement) {
    isGameStarting = false;
    canvas = canvasElement;
    world = new World(canvas, keyboard);
    keyboard.initTouchControls();
    canvasElement.style.transition = 'background-color 1s cubic-bezier(0.4, 0, 0.2, 1), filter 1s cubic-bezier(0.4, 0, 0.2, 1)';
    canvasElement.style.backgroundColor = 'rgb(0, 0, 0)';
    canvasElement.style.filter = 'brightness(1)';
    document.querySelector('.legal-notice-icon').classList.add('d_none');
    document.querySelector('.back-menu').classList.remove('d_none');
    document.getElementById('mobile-controls').classList.remove('d_none');
}


/**
 * Shows game over screen
 */
function showDeadScreen() {
    isGameStarting = true;
    resetKeyboardStates();
    const overlay = document.getElementById('overlay-dead-screen');
    document.getElementById('mobile-controls').classList.add('d_none');
    overlay.classList.remove('d_none');
    playGameOverSound();
    stopGameMusic();
}


/**
 * Shows win screen
 */
function showWinScreen() {
    isGameStarting = true;
    resetKeyboardStates();
    const overlay = document.getElementById('overlay-win-screen');
    document.getElementById('mobile-controls').classList.add('d_none');
    overlay.classList.remove('d_none');
    playWinSound();
    stopGameMusic();
}


/**
 * Restarts the game
 * @param {Event} event - Click event
 */
function restartGame(event) {
    if (!disableButtonTemporarily(event.target, 1000)) return;
    clickButtonSound();
    const overlay = document.getElementById('overlay-dead-screen');
    const winOverlay = document.getElementById('overlay-win-screen');
    const canvasElement = document.getElementById('canvas');
    cleanupWorld(canvasElement);
    fadeOutOverlays(overlay, winOverlay, canvasElement);
    playGameMusic();
}


/**
 * Resets all keyboard states to false
 */
function resetKeyboardStates() {
    keyboard.A = false;
    keyboard.D = false;
    keyboard.SPACE = false;
    keyboard.W = false;
    keyboard.S = false;
    keyboard.ENTER = false;
}


/**
 * Cleans up world instance
 * @param {HTMLElement} canvasElement - Canvas element
 */
function cleanupWorld(canvasElement) {
    if (world) {
        const ctx = canvasElement.getContext('2d');
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        world.cleanup();
        world = null;
    }
}


/**
 * Fades out overlay screens
 * @param {HTMLElement} overlay - Dead screen overlay
 * @param {HTMLElement} winOverlay - Win screen overlay
 * @param {HTMLElement} canvasElement - Canvas element
 */
function fadeOutOverlays(overlay, winOverlay, canvasElement) {
    overlay.classList.add('fade-out');
    winOverlay.classList.add('fade-out');
    setTimeout(() => hideOverlaysAndRestart(overlay, winOverlay, canvasElement), 500);
}


/**
 * Hides overlays and initiates restart
 * @param {HTMLElement} overlay - Dead screen overlay
 * @param {HTMLElement} winOverlay - Win screen overlay
 * @param {HTMLElement} canvasElement - Canvas element
 */
function hideOverlaysAndRestart(overlay, winOverlay, canvasElement) {
    overlay.classList.add('d_none');
    winOverlay.classList.add('d_none');
    overlay.classList.remove('fade-out');
    winOverlay.classList.remove('fade-out');
    setTimeout(() => restartFadeToWhite(canvasElement), 50);
}


/**
 * Fades to white for restart transition
 * @param {HTMLElement} canvasElement - Canvas element
 */
function restartFadeToWhite(canvasElement) {
    canvasElement.style.transition = 'background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    canvasElement.style.backgroundColor = '#ffffff';
    canvasElement.style.filter = 'brightness(1.5)';
    setTimeout(() => reinitializeGame(canvasElement), 600);
}


/**
 * Reinitializes game after restart
 * @param {HTMLElement} canvasElement - Canvas element
 */
function reinitializeGame(canvasElement) {
    isGameStarting = false;
    world = new World(canvasElement, keyboard);
    canvasElement.style.transition = 'background-color 1s cubic-bezier(0.4, 0, 0.2, 1), filter 1s cubic-bezier(0.4, 0, 0.2, 1)';
    canvasElement.style.backgroundColor = 'rgb(0, 0, 0)';
    canvasElement.style.filter = 'brightness(1)';
    document.getElementById('mobile-controls').classList.remove('d_none');
}


/**
 * Plays start screen music
 */
function playStartMusic() {
    screenMusic.currentTime = 0;
    screenMusic.play();
    screenMusic.loop = true;
    screenMusic.volume = musicVolume;
}


/**
 * Plays game background music
 */
function playGameMusic() {
    setTimeout(() => {
        gameMusic.currentTime = 0;
        gameMusic.play();
        gameMusic.loop = true;
        gameMusic.volume = musicVolume;
    }, 1000);
}


/**
 * Stops game background music
 */
function stopGameMusic() {
    gameMusic.pause();
    gameMusic.currentTime = 0;
}


/**
 * Plays button click sound
 */
function clickButtonSound() {
    let clickSound = new Audio('audio/click.mp3');
    clickSound.volume = sfxVolume;
    clickSound.play();
}


/**
 * Plays game over sound
 */
function playGameOverSound() {
    let gameOverSound = new Audio('audio/game-over.mp3');
    gameOverSound.volume = sfxVolume;
    gameOverSound.play();
}


/**
 * Plays win sound
 */
function playWinSound() {
    let winSound = new Audio('audio/win-sound.mp3');
    winSound.volume = sfxVolume;
    winSound.play();
}


window.addEventListener('resize', checkScreenWidth);
window.addEventListener('load', checkScreenWidth);


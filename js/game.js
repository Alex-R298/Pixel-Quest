let canvas;
let world;
let isGameStarting = true;
let keyboard = new Keyboard();
let screenMusic = new Audio('./audio/start-screen.mp3');
let gameMusic = new Audio('./audio/background.mp3');
let musicVolume = 0.08;
let sfxVolume = 0.1;

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
    showIntro();
});

function showIntro() {
    const intro = document.getElementById('intro-screen');
    const mainMenu = document.getElementById('main-menu');
    
    // Nach 2.5 Sekunden zum Hauptmenü wechseln
    setTimeout(() => {
        intro.classList.add('fade-out');
        setTimeout(() => {
            intro.style.display = 'none';
            mainMenu.style.display = 'flex';
        }, 500);
    }, 2500);
}

function showSettings() {
    clickButtonSound();
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('settings-overlay').style.display = 'flex';
}

function closeSettings() {
    clickButtonSound();
    document.getElementById('settings-overlay').style.display = 'none';
    document.getElementById('main-menu').style.display = 'flex';
}

function showControls() {
    clickButtonSound();
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('controls-overlay').style.display = 'flex';
}

function closeControls() {
    clickButtonSound();
    document.getElementById('controls-overlay').style.display = 'none';
    document.getElementById('main-menu').style.display = 'flex';
}

function changeMusicVolume(value) {
    musicVolume = value / 1000;
    screenMusic.volume = musicVolume;
    gameMusic.volume = musicVolume;
    document.getElementById('music-volume').textContent = value + '%';
}

function changeSfxVolume(value) {
    sfxVolume = value / 1000;
    document.getElementById('sfx-volume').textContent = value + '%';
}

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

function playStartMusic() {
    screenMusic.currentTime = 0;
    screenMusic.play();
    screenMusic.loop = true;
    screenMusic.volume = musicVolume;
}

function playGameMusic() {
    setTimeout(() => {
        gameMusic.currentTime = 0;
        gameMusic.play();
        gameMusic.loop = true;
        gameMusic.volume = musicVolume;
    }, 1000);
}

function startGame() {
    clickButtonSound();
    const mainMenu = document.getElementById('main-menu');
    const canvas = document.getElementById('canvas');
    
    // Menü ausblenden
    mainMenu.classList.add('fade-out');
    
    setTimeout(() => {
        mainMenu.style.display = 'none';
        
        // Canvas Flash-Effekt
        canvas.classList.add('canvas-flash');
        
        setTimeout(() => {
            canvas.classList.remove('canvas-flash');
            isGameStarting = false;
            canvas.style.filter = 'none';
            
            // Spiel initialisieren
            init();
        }, 800);
    }, 500);
    
    screenMusic.pause();
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

function restartGame() {
    clickButtonSound();
    const overlay = document.getElementById('overlay-dead-screen');
    const winOverlay = document.getElementById('overlay-win-screen');
    const canvas = document.getElementById('canvas');
    
    // Fade out overlays
    overlay.classList.add('fade-out');
    winOverlay.classList.add('fade-out');
    
    setTimeout(() => {
        overlay.style.display = 'none';
        winOverlay.style.display = 'none';
        overlay.classList.remove('fade-out');
        winOverlay.classList.remove('fade-out');
        
        // Canvas Flash
        canvas.classList.add('canvas-flash');
        
        setTimeout(() => {
            canvas.classList.remove('canvas-flash');
            canvas.style.filter = 'none';
            
            // Cleanup und neu starten
            if (world) world.cleanup();
            world = new World(canvas, keyboard);
        }, 800);
    }, 500);
    
    playGameMusic();
}

function clickButtonSound() {
    let clickSound = new Audio('./audio/click.mp3');
    clickSound.volume = sfxVolume;
    clickSound.play();
}

function playGameOverSound() {
    let gameOverSound = new Audio('./audio/game-over.mp3');
    gameOverSound.volume = sfxVolume;
    gameOverSound.play();
}

function stopGameMusic() {
    gameMusic.pause();
    gameMusic.currentTime = 0;
}

window.debugMode = true;


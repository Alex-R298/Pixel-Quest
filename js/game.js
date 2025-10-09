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

function init() {
    playStartMusic();
    showIntro();
}

function showIntro() {
    const intro = document.getElementById('intro-screen');
    const mainMenu = document.getElementById('main-menu');
    const menuTitle = mainMenu.querySelector('.menu-title');
    const overlayContent = mainMenu.querySelector('.overlay-content');
    const fullscreenIcon = document.querySelector('.fullscreen-icon');
    const legalNoticeIcon = document.querySelector('.legal-notice-icon');
    const menuButtons = mainMenu.querySelector('.menu-buttons');
    
    setTimeout(() => {
        intro.classList.add('fade-out');
        
        setTimeout(() => {
            intro.style.display = 'none';
            mainMenu.style.display = 'flex';
            fullscreenIcon.style.display = 'block'; 
            legalNoticeIcon.style.display = 'block';
            
            menuTitle.style.opacity = '1';
            
            setTimeout(() => {
                menuTitle.classList.add('slide-up');
                
                setTimeout(() => {
                    overlayContent.classList.add('show');
                    menuButtons.classList.add('show');
                }, 800);
            }, 500);
        }, 500);
    }, 2000);
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
    const canvasElement = document.getElementById('canvas');
    document.querySelector('.legal-notice-icon').style.display = 'none';
    
    mainMenu.classList.add('fade-out');
    
    setTimeout(() => {
        mainMenu.style.display = 'none';
        
        // ✅ HIER: Smooth Fade zu Weiß
        canvasElement.style.transition = 'background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        canvasElement.style.backgroundColor = '#ffffff';
        canvasElement.style.filter = 'brightness(1.5)';
        
        setTimeout(() => {
            isGameStarting = false;
            
            canvas = canvasElement;
            world = new World(canvas, keyboard);
            
            // ✅ HIER: Smooth Fade von Weiß zu Schwarz
            canvasElement.style.transition = 'background-color 1s cubic-bezier(0.4, 0, 0.2, 1), filter 1s cubic-bezier(0.4, 0, 0.2, 1)';
            canvasElement.style.backgroundColor = 'rgb(0, 0, 0)';
            canvasElement.style.filter = 'brightness(1)';
            
        }, 600); // ✅ Angepasst auf 600ms (gleich wie transition)
        
    }, 500);
    
    screenMusic.pause();
    playGameMusic();
}

function showDeadScreen() {
    const overlay = document.getElementById('overlay-dead-screen');
    const canvasElement = document.getElementById('canvas');
    canvasElement.style.filter = 'blur(7px)';
    overlay.style.display = 'flex';
    playGameOverSound();
    stopGameMusic();
}

function showWinScreen() {
    const overlay = document.getElementById('overlay-win-screen');
    const canvasElement = document.getElementById('canvas');
    canvasElement.style.filter = 'blur(7px)';
    overlay.style.display = 'flex';
    stopGameMusic();
}

function restartGame() {
    clickButtonSound();
    const overlay = document.getElementById('overlay-dead-screen');
    const winOverlay = document.getElementById('overlay-win-screen');
    const canvasElement = document.getElementById('canvas');
    
    // ✅ Lösche Canvas nur wenn World existiert
    if (world) {
        const ctx = canvasElement.getContext('2d');
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        world.cleanup();
        world = null;
    }
    
    overlay.classList.add('fade-out');
    winOverlay.classList.add('fade-out');
    
    setTimeout(() => {
        overlay.style.display = 'none';
        winOverlay.style.display = 'none';
        overlay.classList.remove('fade-out');
        winOverlay.classList.remove('fade-out');
        
        
        // ✅ STEP 2: Warte kurz, dann starte Weiß-Fade
        setTimeout(() => {
            canvasElement.style.transition = 'background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            canvasElement.style.backgroundColor = '#ffffff';
            canvasElement.style.filter = 'brightness(1.5)';
            
            // ✅ STEP 3: Warte bis Weiß fertig ist, dann lade World
            setTimeout(() => {
                world = new World(canvasElement, keyboard);
                
                // ✅ STEP 4: Fade von Weiß zu Schwarz
                canvasElement.style.transition = 'background-color 1s cubic-bezier(0.4, 0, 0.2, 1), filter 1s cubic-bezier(0.4, 0, 0.2, 1)';
                canvasElement.style.backgroundColor = 'rgb(0, 0, 0)';
                canvasElement.style.filter = 'brightness(1)';
                
            }, 600);
        }, 50);
        
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

function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  enterFullscreen(fullscreen);
  exitFullscreen();
  clickButtonSound();
  
}

function enterFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {  // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function showLegalNotice() {
    clickButtonSound();
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('legal-notice').style.display = 'flex';
    document.querySelector('.legal-notice-icon').style.display = 'none';
}

function closeLegalNotice() {
    clickButtonSound();
    document.getElementById('legal-notice').style.display = 'none';
    document.getElementById('main-menu').style.display = 'flex';
    document.querySelector('.legal-notice-icon').style.display = 'block';
}

window.debugMode = true;


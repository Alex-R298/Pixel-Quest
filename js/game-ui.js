/**
 * Disables a button temporarily
 * @param {HTMLElement} button - Button to disable
 * @param {number} duration - Duration in milliseconds
 * @returns {boolean} True if button was disabled
 */
function disableButtonTemporarily(button, duration = 1000) {
    if (button.disabled) return false;
    button.disabled = true;
    button.style.opacity = '0.5';
    button.style.cursor = 'not-allowed';
    setTimeout(() => {
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
    }, duration);
    return true;
}


/**
 * Shows intro screen and initiates fade out
 */
function showIntro() {
    const elements = getIntroElements();
    setTimeout(() => handleIntroFadeOut(elements), 2000);
}


/**
 * Gets all intro screen elements
 * @returns {Object} Object containing intro elements
 */
function getIntroElements() {
    return {
        intro: document.getElementById('intro-screen'),
        mainMenu: document.getElementById('main-menu'),
        menuTitle: document.querySelector('.menu-title'),
        overlayContent: document.querySelector('.overlay-content'),
        fullscreenIcon: document.querySelector('.fullscreen-icon'),
        legalNoticeIcon: document.querySelector('.legal-notice-icon'),
        menuButtons: document.querySelector('.menu-buttons')
    };
}


/**
 * Handles intro fade out animation
 * @param {Object} elements - Intro screen elements
 */
function handleIntroFadeOut(elements) {
    elements.intro.classList.add('fade-out');
    setTimeout(() => showMainMenu(elements), 500);
}


/**
 * Shows main menu after intro
 * @param {Object} elements - Menu elements
 */
function showMainMenu(elements) {
    elements.intro.classList.add('d_none');
    elements.mainMenu.classList.remove('d_none');
    elements.fullscreenIcon.classList.remove('d_none');
    elements.legalNoticeIcon.classList.remove('d_none');
    elements.menuTitle.style.opacity = '1';
    setTimeout(() => animateMenuTitle(elements), 500);
}


/**
 * Animates menu title and buttons
 * @param {Object} elements - Menu elements
 */
function animateMenuTitle(elements) {
    elements.menuTitle.classList.add('slide-up');
    setTimeout(() => {
        elements.overlayContent.classList.add('show');
        elements.menuButtons.classList.add('show');
    }, 800);
}


/**
 * Returns to main menu from game
 */
function backMenu() {
    clickButtonSound();
    resetGameState();
    resetMenuUI();
    stopGameMusic();
    document.getElementById('mobile-controls').classList.add('d_none');
    playStartMusic();
}


/**
 * Resets game state and cleans up world
 */
function resetGameState() {
    const canvasElement = document.getElementById('canvas');
    document.getElementById('overlay-dead-screen').classList.add('d_none');
    document.getElementById('overlay-win-screen').classList.add('d_none');
    if (world) {
        const ctx = canvasElement.getContext('2d');
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        world.cleanup();
        world = null;
    }
    isGameStarting = true;
    canvasElement.style.backgroundColor = 'rgb(0, 0, 0)';
}


/**
 * Resets menu UI to default state
 */
function resetMenuUI() {
    const mainMenu = document.getElementById('main-menu');
    const menuTitle = mainMenu.querySelector('.menu-title');
    const overlayContent = mainMenu.querySelector('.overlay-content');
    const menuButtons = mainMenu.querySelector('.menu-buttons');
    mainMenu.classList.remove('d_none', 'fade-out');
    menuTitle.style.opacity = '1';
    menuTitle.classList.add('slide-up');
    overlayContent.classList.add('show');
    menuButtons.classList.add('show');
    document.querySelector('.fullscreen-icon').classList.remove('d_none');
    document.querySelector('.legal-notice-icon').classList.remove('d_none');
    document.querySelector('.back-menu').classList.add('d_none');
}


/**
 * Shows settings overlay
 */
function showSettings() {
    clickButtonSound();
    document.getElementById('main-menu').classList.add('d_none');
    document.getElementById('settings-overlay').classList.remove('d_none');
}


/**
 * Closes settings overlay
 */
function closeSettings() {
    clickButtonSound();
    document.getElementById('settings-overlay').classList.add('d_none');
    document.getElementById('main-menu').classList.remove('d_none');
}


/**
 * Shows controls overlay
 */
function showControls() {
    clickButtonSound();
    document.getElementById('main-menu').classList.add('d_none');
    document.getElementById('controls-overlay').classList.remove('d_none');
}


/**
 * Closes controls overlay
 */
function closeControls() {
    clickButtonSound();
    document.getElementById('controls-overlay').classList.add('d_none');
    document.getElementById('main-menu').classList.remove('d_none');
}


/**
 * Changes music volume
 * @param {number} value - Volume value (0-1000)
 */
function changeMusicVolume(value) {
    musicVolume = value / 1000;
    screenMusic.volume = musicVolume;
    gameMusic.volume = musicVolume;
    document.getElementById('music-volume').textContent = value + '%';
}


/**
 * Changes sound effects volume
 * @param {number} value - Volume value (0-1000)
 */
function changeSfxVolume(value) {
    sfxVolume = value / 1000;
    document.getElementById('sfx-volume').textContent = value + '%';
}


/**
 * Toggles fullscreen mode
 */
function fullscreen() {
    clickButtonSound();
    let fullscreenElement = document.getElementById("fullscreen");
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen(fullscreenElement);
    }
}


/**
 * Enters fullscreen mode
 * @param {HTMLElement} element - Element to make fullscreen
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}


/**
 * Exits fullscreen mode
 */
function exitFullscreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


/**
 * Shows legal notice overlay
 */
function showLegalNotice() {
    clickButtonSound();
    document.getElementById('main-menu').classList.add('d_none');
    document.getElementById('legal-notice').classList.remove('d_none');
    document.querySelector('.legal-notice-icon').classList.add('d_none');
}


/**
 * Closes legal notice overlay
 */
function closeLegalNotice() {
    clickButtonSound();
    document.getElementById('legal-notice').classList.add('d_none');
    document.getElementById('main-menu').classList.remove('d_none');
    document.querySelector('.legal-notice-icon').classList.remove('d_none');
}


/**
 * Checks screen width and shows orientation warning if needed
 */
function checkScreenWidth() {
    const warning = document.getElementById('orientation_warning');
    const mainContent = document.querySelector('.canvas-frame');
    if (!warning || !mainContent) return;
    const isSmallScreen = window.innerWidth < 800;
    const isPortrait = window.innerHeight > window.innerWidth;
    if (isSmallScreen && isPortrait) {
        warning.classList.remove('d_none');
        mainContent.classList.add('d_none');
    } else {
        warning.classList.add('d_none');
        mainContent.classList.remove('d_none');
    }
}
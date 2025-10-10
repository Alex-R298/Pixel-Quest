class Keyboard {
    A = false;
    D = false;
    SPACE = false;
    W = false;
    S = false;
    ENTER = false;


    constructor() {}


    /**
     * Initializes touch control event listeners
     */
    initTouchControls() {
        this.bindBtsPressEvents();
    }


    /**
     * Binds touch start and end events to control buttons
     */
    bindBtsPressEvents() {
        this.touchStartEvent();
        this.touchEndEvent();
    }


    /**
     * Handles touch start events for all control buttons
     */
    touchStartEvent() {
        const buttons = this.getTouchButtons();
        if (!buttons.btnLeft) return;
        buttons.btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); this.A = true; }, { passive: false });
        buttons.btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); this.D = true; }, { passive: false });
        buttons.btnJump.addEventListener('touchstart', (e) => { e.preventDefault(); this.SPACE = true; }, { passive: false });
        buttons.btnAttack.addEventListener('touchstart', (e) => { e.preventDefault(); this.ENTER = true; }, { passive: false });
        buttons.btnClimbUp.addEventListener('touchstart', (e) => { e.preventDefault(); this.W = true; }, { passive: false });
        buttons.btnClimbDown.addEventListener('touchstart', (e) => { e.preventDefault(); this.S = true; }, { passive: false });
    }


    /**
     * Handles touch end events for all control buttons
     */
    touchEndEvent() {
        const buttons = this.getTouchButtons();
        if (!buttons.btnLeft) return;
        buttons.btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); this.A = false; }, { passive: false });
        buttons.btnRight.addEventListener('touchend', (e) => { e.preventDefault(); this.D = false; }, { passive: false });
        buttons.btnJump.addEventListener('touchend', (e) => { e.preventDefault(); this.SPACE = false; }, { passive: false });
        buttons.btnAttack.addEventListener('touchend', (e) => { e.preventDefault(); this.ENTER = false; }, { passive: false });
        buttons.btnClimbUp.addEventListener('touchend', (e) => { e.preventDefault(); this.W = false; }, { passive: false });
        buttons.btnClimbDown.addEventListener('touchend', (e) => { e.preventDefault(); this.S = false; }, { passive: false });
    }


    /**
     * Gets all touch control button elements
     * @returns {Object} Object containing all button elements
     */
    getTouchButtons() {
        return {
            btnLeft: document.getElementById('btn_left'),
            btnRight: document.getElementById('btn_right'),
            btnJump: document.getElementById('btn_jump'),
            btnAttack: document.getElementById('btn_attack'),
            btnClimbUp: document.getElementById('btn_climb_up'),
            btnClimbDown: document.getElementById('btn_climb_down')
        };
    }
}
class Keyboard {
    A = false;      // Left
    D = false;      // Right
    SPACE = false;  // Jump
    W = false;      // Climb up
    S = false;      // Climb down
    ENTER = false;  // Attack

    // constructor(character) {
    //     this.character = character;
    //     this.bindKeyPressEvents();
    //     this.bindBtsPressEvents();
    // }

    // /**
    //  * Binds touch start and end events for on-screen buttons.
    //  */
    // bindBtsPressEvents() {
    //     this.touchStartEvent();
    //     this.touchEndEvent();
    // }

    // /**
    //  * Binds touchstart events for on-screen control buttons to update input states.
    //  */
    // touchStartEvent() {
    //     document.getElementById('btn_left').addEventListener('touchstart', (e) => {
    //         e.preventDefault();
    //         this.A = true;
    //     });
    //     document.getElementById('btn_right').addEventListener('touchstart', (e) => {
    //         e.preventDefault();
    //         this.D = true;
    //     });
    //     document.getElementById('btn_jump').addEventListener('touchstart', (e) => {
    //         e.preventDefault();
    //         this.SPACE = true;
    //         this.character.isJumping = true;
    //         this.character.currentImage = 0;
    //     });
    //     document.getElementById('btn_attack').addEventListener('touchstart', (e) => {
    //         e.preventDefault();
    //         this.ENTER = true;
    //         this.character.isAttacking = true;
    //         this.character.currentImage = 0;
    //     });
    //     document.getElementById('btn_climb_up').addEventListener('touchstart', (e) => {
    //         e.preventDefault();
    //         this.W = true;
    //     });
    //     document.getElementById('btn_climb_down').addEventListener('touchstart', (e) => {
    //         e.preventDefault();
    //         this.S = true;
    //     });
    // }

    // /**
    //  * Binds touchend events for on-screen control buttons to reset input states.
    //  */
    // touchEndEvent() {
    //     document.getElementById('btn_left').addEventListener('touchend', (e) => {
    //         e.preventDefault();
    //         this.A = false;
    //     });
    //     document.getElementById('btn_right').addEventListener('touchend', (e) => {
    //         e.preventDefault();
    //         this.D = false;
    //     });
    //     document.getElementById('btn_jump').addEventListener('touchend', (e) => {
    //         e.preventDefault();
    //         this.SPACE = false;
    //     });
    //     document.getElementById('btn_attack').addEventListener('touchend', (e) => {
    //         e.preventDefault();
    //         this.ENTER = false;
    //     });
    //     document.getElementById('btn_climb_up').addEventListener('touchend', (e) => {
    //         e.preventDefault();
    //         this.W = false;
    //     });
    //     document.getElementById('btn_climb_down').addEventListener('touchend', (e) => {
    //         e.preventDefault();
    //         this.S = false;
    //     });
    // }

    // /**
    //  * Binds keyboard keydown and keyup event listeners.
    //  */
    // bindKeyPressEvents() {
    //     this.keyDownEvent();
    //     this.keyUpEvent();
    // }

    // /**
    //  * Sets input state booleans on keydown events for A, D, Space, W, S, Enter.
    //  */
    // keyDownEvent() {
    //     window.addEventListener('keydown', (e) => {
    //         if (e.code == "KeyD") {
    //             this.D = true;
    //         }
    //         if (e.code == "KeyA") {
    //             this.A = true;
    //         }
    //         if (e.code == "Space") {
    //             this.SPACE = true;
    //             this.character.isJumping = true;
    //             this.character.currentImage = 0;
    //         }
    //         if (e.code == "Enter") {
    //             this.ENTER = true;
    //             this.character.isAttacking = true;
    //             this.character.currentImage = 0;
    //         }
    //         if (e.code == "KeyW") {
    //             this.W = true;
    //         }
    //         if (e.code == "KeyS") {
    //             this.S = true;
    //         }
    //     })
    // }

    // /**
    //  * Resets input state booleans on keyup events for A, D, Space, W, S, Enter.
    //  */
    // keyUpEvent() {
    //     window.addEventListener('keyup', (e) => {
    //         if (e.code == "KeyD") {
    //             this.D = false;
    //         }
    //         if (e.code == "KeyA") {
    //             this.A = false;
    //         }
    //         if (e.code == "Space") {
    //             this.SPACE = false;
    //         }
    //         if (e.code == "Enter") {
    //             this.ENTER = false;
    //         }
    //         if (e.code == "KeyW") {
    //             this.W = false;
    //         }
    //         if (e.code == "KeyS") {
    //             this.S = false;
    //         }
    //     })
    // }
}
class Character extends MovableObject {

    // IMAGE_WALKING = [
    //     '../img/Owlet_Monster/Owlet_Monster_Run_6.png',
    // ];

    world;
    walkingSprite = null;
    idleSprite = null;
    isWalking = false;
    jumpSprite = null;
    isJumping = false;
    upKeyPressed = false;

    constructor() {
        super();
        this.upKeyPressed = false;
        // ✅ Idle Sprite laden mit korrekter onload Behandlung
        this.idleSprite = new Image();
        this.idleSprite.src = '../img/Owlet_Monster/Owlet_Monster_Idle_4.png';
        this.idleSprite.onload = () => {
            // Setze Idle als Standard
            if (!this.img || this.img === this.idleSprite) {
                this.img = this.idleSprite;
                this.frameWidth = this.idleSprite.width / 4; // 4 Idle Frames
                this.frameHeight = this.idleSprite.height;
                this.totalFrames = 4;
            }
        };

        // ✅ Walking Sprite laden
        this.walkingSprite = new Image();
        this.walkingSprite.src = '../img/Owlet_Monster/Owlet_Monster_Run_6.png';
        this.walkingSprite.onload = () => {
            console.log('Walking sprite loaded');
            // frameWidth wird bei Sprite-Wechsel gesetzt
        };

        // Setze Idle als Standard (wird überschrieben wenn geladen)
        this.img = this.idleSprite;
        
        this.width = 60;
        this.height = 60;
        this.speed = 3;
        this.totalFrames = 4;

        this.jumpSprite = new Image();
        this.jumpSprite.src = '../img/Owlet_Monster/Owlet_Monster_Jump_8.png';
        this.jumpSprite.onload = () => {
            console.log('Jump sprite loaded');
            // this.applyGravity();
        };
    }


animate() {
    // ✅ Jump Sprite beenden wenn gelandet - ganz oben hinzufügen
    if (!this.isJumping && this.img === this.jumpSprite) {
        if (this.world && this.world.keyboard && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
            // Zurück zu Walking
            this.img = this.walkingSprite;
            this.frameWidth = this.walkingSprite.width / 6;
            this.frameHeight = this.walkingSprite.height;
            this.totalFrames = 6;
        } else {
            // Zurück zu Idle
            this.img = this.idleSprite;
            this.frameWidth = this.idleSprite.width / 4;
            this.frameHeight = this.idleSprite.height;
            this.totalFrames = 4;
        }
        this.currentFrame = 0;
    }

    if (this.world && this.world.keyboard) {
        let wasWalking = this.isWalking;
        this.isWalking = false;

        if (this.world.keyboard.UP && !this.upKeyPressed && !this.isAboveGround() && !this.isJumping) {
            this.jump();
            this.upKeyPressed = true;
        }

        if (!this.world.keyboard.UP) {
            this.upKeyPressed = false;
        }

        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.isWalking = true;

            // Walking Sprite wechseln
            if (!wasWalking && this.walkingSprite.complete && !this.isJumping) {
                this.img = this.walkingSprite;
                this.frameWidth = this.walkingSprite.width / 6;
                this.frameHeight = this.walkingSprite.height;
                this.totalFrames = 6;
                this.currentFrame = 0;
            }

            // Bewegung
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                this.moveRight();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true;
                this.moveLeft();
            }

        } else if (wasWalking && this.idleSprite.complete && !this.isJumping) {
            // Zurück zu Idle (nur wenn nicht springt)
            this.img = this.idleSprite;
            this.frameWidth = this.idleSprite.width / 4;
            this.frameHeight = this.idleSprite.height;
            this.totalFrames = 4;
            this.currentFrame = 0;
        }

        // Kamera
        if (this.x > 360 && this.x < 2880 - 360) {
            this.world.camera_x = -this.x + 360;
        }
    }

    this.applyGravity();

    // Standard Frame-Animation
    if (!this.isJumping) {  // ✅ Animation nur wenn nicht springt
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime >= this.animationSpeed) {
            this.currentFrame++;
            if (this.currentFrame >= this.totalFrames) {
                this.currentFrame = 0;
            }
            this.lastFrameTime = currentTime;
        }
    }
}

}

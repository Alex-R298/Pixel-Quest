class Character extends MovableObject {

    // IMAGE_WALKING = [
    //     '../img/Owlet_Monster/Owlet_Monster_Run_6.png',
    // ];

    world;
    walkingSprite = null;
    idleSprite = null;
    isWalking = false;

    constructor() {
        super();
        
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
    }

     animate() {
        // Prüfe Input und wechsle Sprite
        if (this.world && this.world.keyboard) {
            let wasWalking = this.isWalking;
            this.isWalking = false;

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.isWalking = true;
                
                // Wechsle zu Walking Sprite
                if (!wasWalking && this.walkingSprite.complete) {
                    this.img = this.walkingSprite;
                    this.frameWidth = this.walkingSprite.width / 6; // 6 Run Frames
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

            } else if (wasWalking && this.idleSprite.complete) {
                // Wechsle zurück zu Idle
                this.img = this.idleSprite;
                this.frameWidth = this.idleSprite.width / 4; // 4 Idle Frames
                this.frameHeight = this.idleSprite.height;
                this.totalFrames = 4;
                this.currentFrame = 0;
            }
          if (this.x > 360 && this.x < 2880 - 360) {
    this.world.camera_x = -this.x + 360;
}
        }

        // Standard Frame-Animation
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime >= this.animationSpeed) {
            this.currentFrame++;
            if (this.currentFrame >= this.totalFrames) {
                this.currentFrame = 0;
            }
            this.lastFrameTime = currentTime;
        }
    }

    jump() {
    
    }
}

class Character extends MovableObject {
    world;
    walkingSprite = null;
    idleSprite = null;
    isWalking = false;
    jumpSprite = null;
    deadSprite = null;
    hurtSprite = null;
    attackSprite = null;
    isAttacking = false;
    spaceKeyPressed = false;
    isJumping = false;
    upKeyPressed = false;
    isDead = false;
    isHurt = false;
    deathAnimationComplete = false;

    constructor() {
        super();
        this.upKeyPressed = false;
        
        // Idle Sprite laden
        this.idleSprite = new Image();
        this.idleSprite.src = '../img/Owlet_Monster/Idle.png';
        this.idleSprite.onload = () => {
            if (!this.img || this.img === this.idleSprite) {
                this.img = this.idleSprite;
                this.frameWidth = this.idleSprite.width / 4;
                this.frameHeight = this.idleSprite.height;
                this.totalFrames = 4;
            }
        };

        // Walking Sprite laden
        this.walkingSprite = new Image();
        this.walkingSprite.src = '../img/Owlet_Monster/Run.png';
        this.walkingSprite.onload = () => {
            console.log('Walking sprite loaded');
        };

        // Jump Sprite laden
        this.jumpSprite = new Image();
        this.jumpSprite.src = '../img/Owlet_Monster/Jump.png';
        this.jumpSprite.onload = () => {
            console.log('Jump sprite loaded');
        };

        // Dead Sprite laden
        this.deadSprite = new Image();
        this.deadSprite.src = '../img/Owlet_Monster/Death.png';
        this.deadSprite.onload = () => {
            console.log('Dead sprite loaded');
        };

        // Hurt Sprite laden
        this.hurtSprite = new Image();
        this.hurtSprite.src = '../img/Owlet_Monster/Hurt.png';
        this.hurtSprite.onload = () => {
            console.log('Hurt sprite loaded');
        };

        this.attackSprite = new Image();
        this.attackSprite.src = '../img/Owlet_Monster/Attack1.png';
        this.attackSprite.onload = () => {
            console.log('Attack sprite loaded');
        };

        // Setze Idle als Standard
        if (!this.isDead) {
            this.img = this.idleSprite;
        }
        
        this.width = 80;
        this.height = 80;
        this.speed = 3;
        this.totalFrames = 4;
    }

    animate() {
        // 1. Death Check
        if (this.energy <= 0 && !this.isDead) {
            if (!this.deadSprite || !this.deadSprite.complete) {
                console.log("Dead sprite not loaded!");
                return;
            }
            this.isDead = true;
            this.img = this.deadSprite;
            this.frameWidth = this.deadSprite.width / 8;
            this.frameHeight = this.deadSprite.height;
            this.totalFrames = 8;
            this.currentFrame = 0;
            this.deathAnimationComplete = false;
            console.log("Character is dead");
        }

        // Nur andere Logic ausführen wenn nicht tot
        if (!this.isDead) {
            if (this.isAttacking && this.attackSprite.complete) {
        this.img = this.attackSprite;
        this.frameWidth = this.attackSprite.width / 6;
        this.frameHeight = this.attackSprite.height;
        this.totalFrames = 6;
    }
            // 2. Hurt Check
           else if (this.isHurt && this.hurtSprite.complete) {
                this.img = this.hurtSprite;
                this.frameWidth = this.hurtSprite.width / 4;
                this.frameHeight = this.hurtSprite.height;
                this.totalFrames = 4;
                console.log("Showing hurt animation");
            } else {
                // 3. Jump Landing Logic
                if (!this.isJumping && this.img === this.jumpSprite) {
                    if (this.world && this.world.keyboard && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                        this.img = this.walkingSprite;
                        this.frameWidth = this.walkingSprite.width / 6;
                        this.frameHeight = this.walkingSprite.height;
                        this.totalFrames = 6;
                    }
                    this.currentFrame = 0;
                }

                // 4. Keyboard Input
                if (this.world && this.world.keyboard) {
                    let wasWalking = this.isWalking;
                    this.isWalking = false;

                    // Jump 
                    if (this.world.keyboard.UP && !this.upKeyPressed && !this.isAboveGround() && !this.isJumping) {
                        this.jump();
                        this.upKeyPressed = true;
                        
                    }

                    if (!this.world.keyboard.UP) {
                        this.upKeyPressed = false;
                    }

                    // Movement
                    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                        this.isWalking = true;
                        this.isAttacking = false;

                        // Walking Sprite wechseln (nur wenn nicht hurt)
                        if (!this.isHurt && !wasWalking && this.walkingSprite.complete && !this.isJumping) {
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
                    }

                    if (this.world.keyboard.SPACE && !this.spaceKeyPressed && !this.isAttacking && !this.isJumping) {
                 // ✅ Prüfe Energie VOR dem Attack
                if (this.energyGreen >= 10) {
                        this.attack();
                        this.spaceKeyPressed = true;
                         this.isWalking = false;
                    } else {
                        // Nicht genug Energie - verhindere Attack
                        console.log("Not enough energy to attack");
                        this.spaceKeyPressed = true; // Verhindere Spam
    }
}

                    if (!this.world.keyboard.SPACE) {
                        this.spaceKeyPressed = false; 
                    }

                    // Kamera
                    if (this.x > 360 && this.x < 2880 - 360) {
                        this.world.camera_x = -this.x + 360;
                    }
                }

                // 5. Gravity
                this.applyGravity();

                // 6. Fallback zu Idle
                if (!this.isHurt && !this.isJumping && !this.isWalking && !this.isAttacking) {
                    if (this.img !== this.idleSprite) {
                        this.img = this.idleSprite;
                        this.frameWidth = this.idleSprite.width / 4;
                        this.frameHeight = this.idleSprite.height;
                        this.totalFrames = 4;
                        this.currentFrame = 0;
                    }
                }
            }
        }

        // 7. Frame-Animation läuft IMMER - auch für tote Characters
        const currentTime = Date.now();
if (currentTime - this.lastFrameTime >= this.animationSpeed) {
    if (this.isDead) {
        if (this.currentFrame < this.totalFrames - 1) {
            this.currentFrame++;
        }
        // Stoppt bei letztem Frame
    } else {
        // Normale Animation
        this.currentFrame++;
        if (this.currentFrame >= this.totalFrames) {
            this.currentFrame = 0;
        }
    }
    this.lastFrameTime = currentTime;
}
    } 
}   

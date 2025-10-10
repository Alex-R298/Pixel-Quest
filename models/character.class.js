class Character extends MovableObject {
    world;
    walkingSprite = null;
    idleSprite = null;
    isWalking = false;
    jumpSprite = null;
    deadSprite = null;
    hurtSprite = null;
    attackSprite = null;
    clambingSprite = null;
    isAttacking = false;
    enterKeyPressed = false;
    isJumping = false;
    spaceKeyPressed = false;
    isDead = false;
    isHurt = false;
    isClimbing = false;
    deathAnimationComplete = false;
    hitboxOffset = { x: -5, y: 20, width: -5, height: -20 };
    AUDIO_JUMP = new Audio('./audio/jump.mp3');
    AUDIO_ATTACK = new Audio('./audio/attack.mp3');
    AUDIO_HURT = new Audio('./audio/character-hurt.mp3');
    AUDIO_WALK = new Audio('./audio/walk.mp3');
    walkAudioCooldown = 0;


    /**
     * Creates a new Character instance
     */
    constructor() {
        super();
        this.spaceKeyPressed = false;
        this.energyGreen = 100;
        this.energy = 100;
        this.y = 340;
        this.setAudioVolume();
        this.loadSprites();
        this.width = 80;
        this.height = 80;
        this.renderWidth = 80;
        this.renderHeight = 80;
        this.speed = 3;
        this.totalFrames = 4;
    }


    /**
     * Sets volume for all audio effects
     */
    setAudioVolume() {
        this.AUDIO_JUMP.volume = 0.1;
        this.AUDIO_ATTACK.volume = 0.1;
        this.AUDIO_WALK.volume = 0.1;
        this.AUDIO_HURT.volume = 0.1;
        this.walkAudioCooldown = 0;
    }


    /**
     * Loads all sprite images for the character
     */
    loadSprites() {
        this.idleSprite = new Image();
        this.idleSprite.src = '../img/Owlet_Monster/Idle.png';
        this.idleSprite.onload = () => this.setIdleSprite();
        this.walkingSprite = new Image();
        this.walkingSprite.src = '../img/Owlet_Monster/Run.png';
        this.jumpSprite = new Image();
        this.jumpSprite.src = '../img/Owlet_Monster/Jump.png';
        this.deadSprite = new Image();
        this.deadSprite.src = '../img/Owlet_Monster/Death.png';
        this.hurtSprite = new Image();
        this.hurtSprite.src = '../img/Owlet_Monster/Hurt.png';
        this.attackSprite = new Image();
        this.attackSprite.src = '../img/Owlet_Monster/Attack2.png';
        this.climbingSprite = new Image();
        this.climbingSprite.src = '../img/Owlet_Monster/Owlet_Monster_Climb_4.png';
        if (!this.isDead) this.img = this.idleSprite;
    }


    /**
     * Sets idle sprite as default
     */
    setIdleSprite() {
        if (!this.img || this.img === this.idleSprite) {
            this.img = this.idleSprite;
            this.frameWidth = this.idleSprite.width / 4;
            this.frameHeight = this.idleSprite.height;
            this.totalFrames = 4;
        }
    }


    /**
     * Main animation loop for the character
     */
    animate() {
        if (this.energy <= 0 && !this.isDead) {
            this.handleDeath();
            return;
        }
        if (!this.isDead) this.applyGravity();
        if (!this.isDead) this.handleAnimations();
        this.advanceAnimation();
    }


    /**
     * Handles death animation and state
     */
    handleDeath() {
        if (!this.deadSprite || !this.deadSprite.complete) return;
        this.isDead = true;
        this.img = this.deadSprite;
        this.frameWidth = this.deadSprite.width / 8;
        this.frameHeight = this.deadSprite.height;
        this.totalFrames = 8;
        this.currentFrame = 0;
        this.deathAnimationComplete = false;
        setTimeout(() => { showDeadScreen(); }, 1200);
    }


    /**
     * Handles all character animations based on state
     */
    handleAnimations() {
        if (this.isAttacking && this.attackSprite.complete) {
            this.setSprite(this.attackSprite, 6);
        } else if (this.isHurt && this.hurtSprite.complete) {
            this.setSprite(this.hurtSprite, 4);
        } else {
            this.handleMovementAnimations();
        }
    }


    /**
     * Handles movement-related animations
     */
    handleMovementAnimations() {
        if (!this.isJumping && this.img === this.jumpSprite) {
            if (this.world && this.world.keyboard && (this.world.keyboard.D || this.world.keyboard.A)) {
                this.setSprite(this.walkingSprite, 6);
            }
            this.currentFrame = 0;
        }
        if (this.world && this.world.keyboard) {
            this.handleInput();
        }
        if (!this.isHurt && !this.isJumping && !this.isWalking && !this.isAttacking && !this.isClimbing) {
            if (this.img !== this.idleSprite) this.setSprite(this.idleSprite, 4);
        }
    }


    /**
     * Handles all keyboard input
     */
    handleInput() {
        let wasWalking = this.isWalking;
        this.isWalking = false;
        this.handleJump();
        this.handleWalking(wasWalking);
        this.handleAttack();
        this.climbLadder();
        this.updateCamera();
    }


    /**
     * Handles jump input and execution
     */
    handleJump() {
        if (this.world.keyboard.SPACE && !this.spaceKeyPressed && !this.isAboveGround() && !this.isJumping) {
            this.AUDIO_JUMP.currentTime = 0;
            this.AUDIO_JUMP.volume = sfxVolume;
            this.AUDIO_JUMP.play();
            this.jump();
            this.spaceKeyPressed = true;
        }
        if (!this.world.keyboard.SPACE) this.spaceKeyPressed = false;
    }


    /**
     * Handles walking input and animation
     * @param {boolean} wasWalking - Previous walking state
     */
    handleWalking(wasWalking) {
        if ((this.world.keyboard.D || this.world.keyboard.A) && !this.isClimbing) {
            this.isWalking = true;
            this.isAttacking = false;
            this.playWalkSound();
            if (!this.isHurt && !wasWalking && this.walkingSprite.complete && !this.isJumping) {
                this.setSprite(this.walkingSprite, 6);
            }
            this.handleMovement();
        } else {
            this.stopWalkSound();
        }
    }


    /**
     * Handles left and right movement
     */
    handleMovement() {
        if (this.world.keyboard.D && this.x < this.world.level.level_end_x) {
            this.otherDirection = false;
            this.moveRight();
            this.isClimbing = false;
        }
        if (this.world.keyboard.A && this.x > 0) {
            this.otherDirection = true;
            this.moveLeft();
            this.isClimbing = false;
        }
    }


    /**
     * Plays walking sound with cooldown
     */
    playWalkSound() {
        const now = Date.now();
        if (now - this.walkAudioCooldown > 300) {
            this.AUDIO_WALK.currentTime = 0;
            this.AUDIO_WALK.volume = sfxVolume;
            this.AUDIO_WALK.play();
            this.walkAudioCooldown = now;
        }
    }


    /**
     * Stops walking sound
     */
    stopWalkSound() {
        this.AUDIO_WALK.pause();
        this.AUDIO_WALK.currentTime = 0;
        this.walkAudioCooldown = 0;
    }


    /**
     * Handles attack input and execution
     */
    handleAttack() {
        if (this.world.keyboard.ENTER && !this.enterKeyPressed && !this.isAttacking && !this.isJumping && !this.isClimbing) {
            if (this.energyGreen >= 20) {
                this.attack();
                this.AUDIO_ATTACK.currentTime = 0;
                this.AUDIO_ATTACK.volume = sfxVolume;
                this.AUDIO_ATTACK.play();
                this.enterKeyPressed = true;
                this.isWalking = false;
            } else {
                this.enterKeyPressed = true;
            }
        }
        if (!this.world.keyboard.ENTER) this.enterKeyPressed = false;
    }


    /**
     * Updates camera position based on character position
     */
    updateCamera() {
        if (this.x > 360 && this.x < 2880 - 360) {
            this.world.camera_x = -this.x + 360;
        }
    }


    /**
     * Sets the current sprite and frame parameters
     * @param {Image} sprite - The sprite to set
     * @param {number} frames - Number of frames in sprite
     */
    setSprite(sprite, frames) {
        if (this.img !== sprite) {
            this.img = sprite;
            this.frameWidth = sprite.width / frames;
            this.frameHeight = sprite.height;
            this.totalFrames = frames;
            this.currentFrame = 0;
        }
    }


    /**
     * Advances animation frame
     */
    advanceAnimation() {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime >= this.animationSpeed) {
            if (this.isDead) {
                if (this.currentFrame < this.totalFrames - 1) this.currentFrame++;
            } else {
                this.currentFrame++;
                if (this.currentFrame >= this.totalFrames) this.currentFrame = 0;
            }
            this.lastFrameTime = currentTime;
        }
    }


    /**
     * Executes jump action
     */
    jump() {
        if (!this.isJumping && !this.isAboveGround()) {
            this.isJumping = true;
            this.speedY = -5;
            if (this.jumpSprite.complete) this.setSprite(this.jumpSprite, 8);
        }
    }


    /**
     * Executes attack action
     */
    attack() {
        if (!this.isAttacking && this.energyGreen > 0) {
            this.isAttacking = true;
            if (this.attackSprite.complete) {
                this.setSprite(this.attackSprite, 6);
                this.energyGreen -= 10;
                if (this.energyGreen < 0) this.energyGreen = 0;
            }
            setTimeout(() => { this.isAttacking = false; }, 500);
        }
    }


    /**
     * Gets the attack hitbox based on direction
     * @returns {Object} Hitbox with x, y, width, height properties
     */
    getAttackHitbox() {
        const attackWidth = 50;
        const attackHeight = 60;
        if (this.otherDirection) {
            return {
                x: this.x - attackWidth,
                y: this.y + 10,
                width: attackWidth,
                height: attackHeight
            };
        } else {
            return {
                x: this.x + this.width,
                y: this.y + 10,
                width: attackWidth,
                height: attackHeight
            };
        }
    }


    /**
     * Checks if attack is hitting a target
     * @param {Object} target - Target object with position and size
     * @returns {boolean} True if attack hits target
     */
    isAttackHitting(target) {
        if (!this.isAttacking) return false;
        const attackBox = this.getAttackHitbox();
        return target.x + target.width > attackBox.x &&
               target.x < attackBox.x + attackBox.width &&
               target.y + target.height > attackBox.y &&
               target.y < attackBox.y + attackBox.height;
    }


    /**
     * Handles ladder climbing mechanics
     */
    climbLadder() {
        if (!this.world || !this.world.level.ladders) {
            this.resetRenderSize();
            return;
        }
        for (let ladder of this.world.level.ladders) {
            if (this.isOnLadder(ladder)) {
                this.handleClimbing(ladder);
                return;
            }
        }
        this.isClimbing = false;
        this.resetRenderSize();
    }


    /**
     * Checks if character is on a ladder
     * @param {Object} ladder - Ladder object to check
     * @returns {boolean} True if on ladder
     */
    isOnLadder(ladder) {
        return this.x + this.width/2 > ladder.x && 
               this.x + this.width/2 < ladder.x + ladder.width &&
               this.y + this.height >= ladder.yTop &&
               this.y + this.height <= ladder.yBottom + 60;
    }


    /**
     * Handles climbing input and animation
     * @param {Object} ladder - Ladder being climbed
     */
    handleClimbing(ladder) {
        if (this.world.keyboard.W || this.world.keyboard.S) {
            if (!this.isClimbing) {
                this.isClimbing = true;
                this.speedY = 0;
                this.isWalking = false;
                if (this.climbingSprite.complete) {
                    this.setSprite(this.climbingSprite, 4);
                    this.renderWidth = 60;
                    this.renderHeight = 60;
                }
            }
            if (this.world.keyboard.W) this.climbUp(ladder);
            if (this.world.keyboard.S) this.climbDown(ladder);
        }
    }


    /**
     * Moves character up the ladder
     * @param {Object} ladder - Ladder being climbed
     */
    climbUp(ladder) {
        this.y -= 2;
        if (this.y + this.height <= ladder.yTop) {
            this.isClimbing = false;
            this.resetRenderSize();
            this.y = ladder.yTop - this.height;
        }
    }


    /**
     * Moves character down the ladder
     * @param {Object} ladder - Ladder being climbed
     */
    climbDown(ladder) {
        this.y += 2;
        if (this.y + this.height >= ladder.yBottom) {
            this.isClimbing = false;
            this.resetRenderSize();
        }
    }


    /**
     * Resets render size to default
     */
    resetRenderSize() {
        this.renderWidth = 80;
        this.renderHeight = 80;
    }
}
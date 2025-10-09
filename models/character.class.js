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

    constructor() {
        super();
        console.log('🦉 NEW CHARACTER - Energy:', this.energy);
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

    setAudioVolume() {
        this.AUDIO_JUMP.volume = 0.1;
        this.AUDIO_ATTACK.volume = 0.1;
        this.AUDIO_WALK.volume = 0.1;
        this.AUDIO_HURT.volume = 0.1;
        this.walkAudioCooldown = 0;
    }

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

    setIdleSprite() {
        if (!this.img || this.img === this.idleSprite) {
            this.img = this.idleSprite;
            this.frameWidth = this.idleSprite.width / 4;
            this.frameHeight = this.idleSprite.height;
            this.totalFrames = 4;
        }
    }

    animate() {
        if (this.energy <= 0 && !this.isDead) {
            this.handleDeath();
            return;
        }
        if (!this.isDead) this.applyGravity();
        if (!this.isDead) this.handleAnimations();
        this.advanceAnimation();
    }

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

    handleAnimations() {
        if (this.isAttacking && this.attackSprite.complete) {
            this.setSprite(this.attackSprite, 6);
        } else if (this.isHurt && this.hurtSprite.complete) {
            this.setSprite(this.hurtSprite, 4);
        } else {
            this.handleMovementAnimations();
        }
    }

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

    handleInput() {
        let wasWalking = this.isWalking;
        this.isWalking = false;
        this.handleJump();
        this.handleWalking(wasWalking);
        this.handleAttack();
        this.climbLadder();
        this.updateCamera();
    }

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

    playWalkSound() {
        const now = Date.now();
        if (now - this.walkAudioCooldown > 300) {
            this.AUDIO_WALK.currentTime = 0;
            this.AUDIO_WALK.volume = sfxVolume;
            this.AUDIO_WALK.play();
            this.walkAudioCooldown = now;
        }
    }

    stopWalkSound() {
        this.AUDIO_WALK.pause();
        this.AUDIO_WALK.currentTime = 0;
        this.walkAudioCooldown = 0;
    }

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

    updateCamera() {
        if (this.x > 360 && this.x < 2880 - 360) {
            this.world.camera_x = -this.x + 360;
        }
    }

    setSprite(sprite, frames) {
        if (this.img !== sprite) {
            this.img = sprite;
            this.frameWidth = sprite.width / frames;
            this.frameHeight = sprite.height;
            this.totalFrames = frames;
            this.currentFrame = 0;
        }
    }

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

    jump() {
        if (!this.isJumping && !this.isAboveGround()) {
            this.isJumping = true;
            this.speedY = -5;
            if (this.jumpSprite.complete) this.setSprite(this.jumpSprite, 8);
        }
    }

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

    isAttackHitting(target) {
        if (!this.isAttacking) return false;
        const attackBox = this.getAttackHitbox();
        return target.x + target.width > attackBox.x &&
               target.x < attackBox.x + attackBox.width &&
               target.y + target.height > attackBox.y &&
               target.y < attackBox.y + attackBox.height;
    }

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

    isOnLadder(ladder) {
        return this.x + this.width/2 > ladder.x && 
               this.x + this.width/2 < ladder.x + ladder.width &&
               this.y + this.height >= ladder.yTop &&
               this.y + this.height <= ladder.yBottom + 60;
    }

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

    climbUp(ladder) {
        this.y -= 2;
        if (this.y + this.height <= ladder.yTop) {
            this.isClimbing = false;
            this.resetRenderSize();
            this.y = ladder.yTop - this.height;
        }
    }

    climbDown(ladder) {
        this.y += 2;
        if (this.y + this.height >= ladder.yBottom) {
            this.isClimbing = false;
            this.resetRenderSize();
        }
    }

    resetRenderSize() {
        this.renderWidth = 80;
        this.renderHeight = 80;
    }
}
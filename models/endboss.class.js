class Endboss extends MovableObject {
    y;
    x;
    width = 160;
    height = 160;
    isMoving = false;
    isWalking = false;
    isAttacking = false;
    isHurt = false;
    isDead = false;
    walkingSprite = null;
    attackSprite = null;
    hurtSprite = null;
    deadSprite = null;
    leftBoundary = 0;
    rightBoundary = 0;
    direction = -1;
    energy = 250;
    hitboxOffset = { x: 15, y: 30, width: 15, height: -30 };
    AUDIO_HURT = new Audio('./audio/boss-hurt.mp3');
    attackStartTime = 0; 
    attackCooldown = false;
    hitCooldown = false;
    aggroRange = 200;
    isAggro = false;

    constructor(x, y) {
        super();
        this.hasDealtDamage = false;
        this.initializePosition(x, y);
        this.loadSprites();
        setInterval(() => {
            this.applyGravity();
        }, 1000 / 60);
    }

    initializePosition(x, y) {
        this.x = x;
        this.y = y;
        this.currentFrame = 0;
        this.totalFrames = 6;
        this.speed = 0.15 + Math.random() * 0.25;
        this.leftBoundary = x - 150;
        this.rightBoundary = x + 150;
        this.direction = -1;
    }

    loadSprites() {
        this.walkingSprite = this.createSprite('../img/Huge mushroom/HugeMushroom_walk.png', 6);
        this.attackSprite = this.createSprite('../img/Huge mushroom/HugeMushroom_attack2.png', 4);
        this.hurtSprite = this.createSprite('../img/Huge mushroom/HugeMushroom_hurt.png', 4);
        this.deadSprite = this.createSprite('../img/Huge mushroom/HugeMushroom_death.png', 4);
        this.img = this.walkingSprite;
    }

    createSprite(src, frames) {
        const sprite = new Image();
        sprite.onload = () => {
            if (!this.frameWidth) {
                this.frameWidth = sprite.width / frames;
                this.frameHeight = sprite.height;
            }
        };
        sprite.src = src;
        return sprite;
    }

    animateEnemy() {
        if (this.handleDeath()) return;
        if (!this.isDead) this.updateSprite();
        this.advanceFrame();
    }

    handleDeath() {
        if (this.energy <= 0 && !this.isDead) {
            if (!this.deadSprite?.complete) {
                this.stopWalking();
                return true;
            }
            this.setDeadState();
            setTimeout(() => showWinScreen(), 1500);
        }
        return false;
    }

    setDeadState() {
        this.isDead = true;
        this.isMoving = false;
        this.isWalking = false;
        this.setSprite(this.deadSprite, 4);
        this.currentFrame = 0;
    }

    updateSprite() {
        if (this.isHurt && this.hurtSprite.complete) {
            this.setSprite(this.hurtSprite, 4);
        } else if (this.isAttacking && this.attackSprite.complete) {
            this.setSprite(this.attackSprite, 4);
        } else if (this.img !== this.walkingSprite) {
            this.setSprite(this.walkingSprite, 6);
            this.currentFrame = 0;
        }
    }

    setSprite(sprite, frames) {
        if (this.img !== sprite) {
            this.img = sprite;
            this.frameWidth = sprite.width / frames;
            this.frameHeight = sprite.height;
            this.totalFrames = frames;
        }
    }

    advanceFrame() {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime < this.animationSpeed) return;
        if (this.isDead) {
            this.advanceDeadFrame();
        } else if (this.isHurt || this.isAttacking) {
            this.advanceActionFrame();
        } else {
            this.advanceLoopFrame();
        }
        this.lastFrameTime = currentTime;
    }

    advanceDeadFrame() {
        if (this.currentFrame < this.totalFrames - 1) {
            this.currentFrame++;
        }
    }

    advanceActionFrame() {
        if (this.currentFrame < this.totalFrames - 1) {
            this.currentFrame++;
        } else {
            this.finishAction();
        }
    }

    finishAction() {
        if (this.isHurt) {
            this.isHurt = false;
            this.startWalking();
        }
        if (this.isAttacking) this.isAttacking = false;
        this.currentFrame = 0;
    }

    advanceLoopFrame() {
        this.currentFrame++;
        if (this.currentFrame >= this.totalFrames) {
            this.currentFrame = 0;
        }
    }

    move() {
        if (this.isDead || this.isHurt || this.isAttacking) return;
        if (!this.isMoving && !this.isWalking) {
            this.startWalking();
        }
        if (this.world && this.world.character && !this.world.character.isDead) {
            const distanceToPlayer = Math.abs(this.x - this.world.character.x);
            const aggroThreshold = this.isAggro ? this.aggroRange + 30 : this.aggroRange;
            if (distanceToPlayer <= aggroThreshold) {
                this.chasePlayer();
                this.isAggro = true;
                return;
            }
        }
        this.patrol();
        this.isAggro = false;
    }

    chasePlayer() {
        const playerX = this.world.character.x;
        if (playerX < this.x) {
            this.direction = -1;
            this.otherDirection = false;
            this.x -= this.speed * 1.8;
        } else {
            this.direction = 1;
            this.otherDirection = true;
            this.x += this.speed * 1.8;
        }
    }

    patrol() {
        if (this.knockbackActive) return;
        this.x += this.speed * this.direction;
        if (this.x <= this.leftBoundary || this.x >= this.rightBoundary) {
            this.direction *= -1;
            this.otherDirection = (this.direction === 1);
        }
    }

    takeDamageEnemy(damage) {
        if (this.isDead) return;
        this.energy -= damage;
        this.isHurt = true;
        this.currentFrame = 0;
        this.playHurtSound();
        this.stopWalking();
    }

    playHurtSound() {
        if (this.AUDIO_HURT) {
            this.AUDIO_HURT.currentTime = 0;
            this.AUDIO_HURT.volume = 0.05;
            this.AUDIO_HURT.volume = sfxVolume;
            this.AUDIO_HURT.play();
        }
    }

    attackEnemy() {
        if (!this.isAttacking && !this.isDead) {
            this.isAttacking = true;
            this.currentFrame = 0;
        }
    }

    getAttackHitbox() {
        const attackWidth = 50;
        const attackHeight = 80;
        if (this.otherDirection) {
            return {
                x: this.x + this.width,
                y: this.y + 40,
                width: attackWidth,
                height: attackHeight
            };
        } else {
            return {
                x: this.x - attackWidth,
                y: this.y + 40,
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

    startWalking() {
        if (!this.isDead) {
            this.isWalking = true;
            this.isMoving = true;
            this.currentFrame = 0;
        }
    }

    stopWalking() {
        this.isWalking = false;
        this.isMoving = false;
    }
}

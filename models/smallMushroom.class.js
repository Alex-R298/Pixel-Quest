class SmallMushroom extends MovableObject {
    y;
    x;
    width = 80;
    height = 80;
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
    energy = 100;
    hitboxOffset = { x: 30, y: 10, width: -30, height: -10 };
    AUDIO_HURT = new Audio('./audio/enemy-hurt.mp3');
    attackStartTime = 0;
    attackCooldown = false;
    hitCooldown = false;
    aggroRange = 80;
    isAggro = false;


    /**
     * Creates a new SmallMushroom instance
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    constructor(x, y) {
        super();
        this.hasDealtDamage = false;
        this.initializePosition(x, y);
        this.loadSprites();
        setInterval(() => {
            this.applyGravity();
        }, 1000 / 60);
    }


    /**
     * Initializes the enemy position and movement parameters
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    initializePosition(x, y) {
        this.x = x;
        this.y = y;
        this.currentFrame = 0;
        this.totalFrames = 4;
        this.speed = 0.15 + Math.random() * 0.25;
        this.leftBoundary = x - 60;
        this.rightBoundary = x + 60;
        this.direction = -1;
    }


    /**
     * Loads all sprite images for the enemy
     */
    loadSprites() {
        this.walkingSprite = this.createSprite('../img/Small_Mushroom/Small_Mushroom_walk.png');
        this.attackSprite = this.createSprite('../img/Small_Mushroom/Small_Mushroom_attack.png');
        this.hurtSprite = this.createSprite('../img/Small_Mushroom/Small_Mushroom_hurt.png');
        this.deadSprite = this.createSprite('../img/Small_Mushroom/Small_Mushroom_death.png');
        this.img = this.walkingSprite;
    }


    /**
     * Creates a sprite with 4 frames
     * @param {string} src - Image source path
     * @returns {Image} The created sprite image
     */
    createSprite(src) {
        const sprite = new Image();
        sprite.onload = () => {
            if (!this.frameWidth) {
                this.frameWidth = sprite.width / 4;
                this.frameHeight = sprite.height;
            }
        };
        sprite.src = src;
        return sprite;
    }


    /**
     * Main animation loop for the enemy
     */
    animateEnemy() {
        if (this.handleDeath()) return;
        if (!this.isDead) this.updateSprite();
        this.advanceFrame();
    }


    /**
     * Handles death state and transitions
     * @returns {boolean} True if enemy is dead or dying
     */
    handleDeath() {
        if (this.energy <= 0 && !this.isDead) {
            if (!this.deadSprite?.complete) {
                this.stopWalking();
                return true;
            }
            this.setDeadState();
        }
        return false;
    }


    /**
     * Sets the enemy to dead state
     */
    setDeadState() {
        this.isDead = true;
        this.isMoving = false;
        this.isWalking = false;
        this.setSprite(this.deadSprite, 4);
        this.currentFrame = 0;
    }


    /**
     * Updates the current sprite based on state
     */
    updateSprite() {
        if (this.isHurt && this.hurtSprite.complete) {
            this.setSprite(this.hurtSprite, 4);
        } else if (this.isAttacking && this.attackSprite.complete) {
            this.setSprite(this.attackSprite, 4);
        } else if (this.img !== this.walkingSprite) {
            this.setSprite(this.walkingSprite, 4);
            this.currentFrame = 0;
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
        }
    }


    /**
     * Advances to the next animation frame
     */
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


    /**
     * Advances frame for death animation
     */
    advanceDeadFrame() {
        if (this.currentFrame < this.totalFrames - 1) {
            this.currentFrame++;
        }
    }


    /**
     * Advances frame for action animations
     */
    advanceActionFrame() {
        if (this.currentFrame < this.totalFrames - 1) {
            this.currentFrame++;
        } else {
            this.finishAction();
        }
    }


    /**
     * Finishes current action and resets state
     */
    finishAction() {
        if (this.isHurt) {
            this.isHurt = false;
            this.startWalking();
        }
        if (this.isAttacking) this.isAttacking = false;
        this.currentFrame = 0;
    }


    /**
     * Advances frame for looping animations
     */
    advanceLoopFrame() {
        this.currentFrame++;
        if (this.currentFrame >= this.totalFrames) {
            this.currentFrame = 0;
        }
    }


    /**
     * Handles enemy movement behavior
     */
    move() {
        if (this.isDead || this.isHurt || this.isAttacking) return;
        if (!this.isMoving && !this.isWalking) this.startWalking();
        if (this.shouldChasePlayer()) {
            this.chasePlayer();
            this.isAggro = true;
            return;
        }
        this.patrol();
        this.isAggro = false;
    }


    /**
     * Checks if enemy should chase player
     * @returns {boolean} True if player is in aggro range
     */
    shouldChasePlayer() {
        if (!this.world || !this.world.character || this.world.character.isDead) return false;
        const distanceToPlayer = Math.abs(this.x - this.world.character.x);
        const aggroThreshold = this.isAggro ? this.aggroRange + 20 : this.aggroRange;
        return distanceToPlayer <= aggroThreshold;
    }


    /**
     * Makes enemy chase the player
     */
    chasePlayer() {
        const playerX = this.world.character.x;
        if (playerX < this.x) {
            this.direction = -1;
            this.otherDirection = false;
            this.x -= this.speed * 1.5;
        } else {
            this.direction = 1;
            this.otherDirection = true;
            this.x += this.speed * 1.5;
        }
    }


    /**
     * Handles patrol movement within boundaries
     */
    patrol() {
        if (this.knockbackActive) return;
        this.x += this.speed * this.direction;
        if (this.x <= this.leftBoundary || this.x >= this.rightBoundary) {
            this.direction *= -1;
            this.otherDirection = (this.direction === 1);
        }
    }


    /**
     * Applies damage to the enemy
     * @param {number} damage - Amount of damage to apply
     */
    takeDamageEnemy(damage) {
        if (this.isDead) return;
        this.energy -= damage;
        this.isHurt = true;
        this.currentFrame = 0;
        this.playHurtSound();
        this.stopWalking();
    }


    /**
     * Plays hurt sound effect
     */
    playHurtSound() {
        if (this.AUDIO_HURT) {
            this.AUDIO_HURT.currentTime = 0;
            this.AUDIO_HURT.volume = 0.05;
            this.AUDIO_HURT.volume = sfxVolume;
            this.AUDIO_HURT.play();
        }
    }


    /**
     * Initiates attack animation
     */
    attackEnemy() {
        if (!this.isAttacking && !this.isDead) {
            this.isAttacking = true;
            this.currentFrame = 0;
        }
    }


    /**
     * Gets the attack hitbox based on direction
     * @returns {Object} Hitbox with x, y, width, height properties
     */
    getAttackHitbox() {
        const attackWidth = 40;
        const attackHeight = 60;
        if (this.otherDirection) {
            return {
                x: this.x + this.width,
                y: this.y + 10, width: attackWidth, height: attackHeight
            };
        } else {
            return {
                x: this.x - attackWidth,
                y: this.y + 10, width: attackWidth, height: attackHeight
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
     * Starts walking animation and movement
     */
    startWalking() {
        if (!this.isDead) {
            this.isWalking = true;
            this.isMoving = true;
            this.currentFrame = 0;
        }
    }


    /**
     * Stops walking animation and movement
     */
    stopWalking() {
        this.isWalking = false;
        this.isMoving = false;
    }
}


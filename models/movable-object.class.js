class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.2;
    energy = 100;
    energyGreen = 100;


    /**
     * Applies gravity to the object
     */
    applyGravity() {
    if (this.isClimbing) return;
    if (this.checkDeath()) return;
    const onPlatform = this.checkPlatformCollision();
    if (onPlatform && !this.isDead) {
        this.landOnPlatform();
    } else {
        this.fall();
    }
}


    /**
     * Checks if object has fallen to death
     * @returns {boolean} True if object is dead
     */
    checkDeath() {
        const deathY = 600;
        if (this.y > deathY) {
            this.energy = 0;
            this.isDead = true;
            if (this instanceof Character) {
                showDeadScreen();
            }
            return true;
        }
        return false;
    }


    /**
     * Handles landing on a platform
     */
    landOnPlatform() {
        this.speedY = 0;
        this.isJumping = false;
    }


    /**
     * Handles falling motion with acceleration
     */
    fall() {
        this.y += this.speedY;
        this.speedY += this.acceleration;
    }


    /**
     * Checks if object is above ground level
     * @returns {boolean} True if above ground
     */
    isAboveGround() {
        if (this.world && this.world.level.platforms) {
            for (let platform of this.world.level.platforms) {
                if (this.isOnPlatform(platform)) {
                    return false;
                }
            }
        }
        return this.y < (this.world?.level?.groundY || 340);
    }


    /**
     * Checks if object is standing on a platform
     * @param {Object} platform - Platform object to check
     * @returns {boolean} True if on platform
     */
    isOnPlatform(platform) {
        return this.x + this.width > platform.x && 
               this.x < platform.x + platform.width &&
               Math.abs((this.y + this.height) - platform.y) < 5;
    }


    /**
     * Checks collision with all platforms
     * @returns {boolean} True if colliding with any platform
     */
    checkPlatformCollision() {
    if (!this.world || !this.world.level.platforms) return false;
    if (this.isDead) return false;
    for (let platform of this.world.level.platforms) {
        if (this.isCollidingWithPlatform(platform)) {
            this.snapToPlatform(platform);
            return true;
        }
    }
    return false;
    }


    /**
     * Checks if object is colliding with a specific platform
     * @param {Object} platform - Platform object to check
     * @returns {boolean} True if colliding
     */
    isCollidingWithPlatform(platform) {
        return this.speedY >= 0 &&
               this.x + this.width > platform.x + 10 &&
               this.x < platform.x + platform.width - 10 &&
               this.y + this.height >= platform.y - 5 &&
               this.y + this.height <= platform.y + 20;
    }


    /**
     * Snaps object to platform surface
     * @param {Object} platform - Platform to snap to
     */
    snapToPlatform(platform) {
        this.y = platform.y - this.height;
        this.speedY = 0;
        this.isJumping = false;
    }


    /**
     * Checks collision with another movable object
     * @param {MovableObject} mo - Object to check collision with
     * @returns {boolean} True if colliding
     */
    isColliding(mo) {
        const thisOffset = this.hitboxOffset || { x: 0, y: 0, width: 0, height: 0 };
        const moOffset = mo.hitboxOffset || { x: 0, y: 0, width: 0, height: 0 };
        return this.checkHitboxOverlap(thisOffset, moOffset, mo);
    }


    /**
     * Checks if hitboxes overlap
     * @param {Object} thisOffset - This object's hitbox offset
     * @param {Object} moOffset - Other object's hitbox offset
     * @param {MovableObject} mo - Other movable object
     * @returns {boolean} True if hitboxes overlap
     */
    checkHitboxOverlap(thisOffset, moOffset, mo) {
        return (
            this.x + thisOffset.x + this.width + thisOffset.width > mo.x + moOffset.x &&
            this.y + thisOffset.y + this.height + thisOffset.height > mo.y + moOffset.y &&
            this.x + thisOffset.x < mo.x + moOffset.x + mo.width + moOffset.width &&
            this.y + thisOffset.y < mo.y + moOffset.y + mo.height + moOffset.height
        );
    }


    /**
     * Applies damage to the object
     * @param {number} damage - Amount of damage to apply
     */
    takeDamage(damage) {
        if (this.isDead) return;
        this.energy -= damage;
        this.isHurt = true;
        if (this.AUDIO_HURT) {
            this.AUDIO_HURT.currentTime = 0;
            this.AUDIO_HURT.volume = 0.1;
            this.AUDIO_HURT.volume = sfxVolume;
            this.AUDIO_HURT.play();
        }
        setTimeout(() => {
            this.isHurt = false;
        }, 600);
    }


    /**
     * Loads multiple images into cache
     * @param {string[]} arr - Array of image paths
     */
    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Animates enemy sprite frames
     */
    animateEnemy() {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime >= this.animationSpeed) {
            this.advanceFrame();
            this.lastFrameTime = currentTime;
        }
    }


    /**
     * Advances to next animation frame
     */
    advanceFrame() {
        this.currentFrame++;
        if (this.currentFrame >= this.totalFrames) {
            this.currentFrame = 0;
        }
    }


    /**
     * Moves object to the right
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves object to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }
}
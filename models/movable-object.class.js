class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.2;
    energy = 100;
    energyGreen = 100;

    applyGravity() {
        if (this.isClimbing) return;
        if (this.checkDeath()) return;
        const onPlatform = this.checkPlatformCollision();
        if (onPlatform) {
            this.landOnPlatform();
        } else {
            this.fall();
        }
    }

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

    landOnPlatform() {
        this.speedY = 0;
        this.isJumping = false;
    }

    fall() {
        this.y += this.speedY;
        this.speedY += this.acceleration;
    }

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

    isOnPlatform(platform) {
        return this.x + this.width > platform.x && 
               this.x < platform.x + platform.width &&
               Math.abs((this.y + this.height) - platform.y) < 5;
    }

    checkPlatformCollision() {
        if (!this.world || !this.world.level.platforms) return false;
        
        for (let platform of this.world.level.platforms) {
            if (this.isCollidingWithPlatform(platform)) {
                this.snapToPlatform(platform);
                return true;
            }
        }
        return false;
    }

    isCollidingWithPlatform(platform) {
        return this.speedY >= 0 &&
               this.x + this.width > platform.x + 10 &&
               this.x < platform.x + platform.width - 10 &&
               this.y + this.height >= platform.y - 5 &&
               this.y + this.height <= platform.y + 20;
    }

    snapToPlatform(platform) {
        this.y = platform.y - this.height;
        this.speedY = 0;
        this.isJumping = false;
    }

    isColliding(mo) {
        const thisOffset = this.hitboxOffset || { x: 0, y: 0, width: 0, height: 0 };
        const moOffset = mo.hitboxOffset || { x: 0, y: 0, width: 0, height: 0 };
        
        return this.checkHitboxOverlap(thisOffset, moOffset, mo);
    }

    checkHitboxOverlap(thisOffset, moOffset, mo) {
        return (
            this.x + thisOffset.x + this.width + thisOffset.width > mo.x + moOffset.x &&
            this.y + thisOffset.y + this.height + thisOffset.height > mo.y + moOffset.y &&
            this.x + thisOffset.x < mo.x + moOffset.x + mo.width + moOffset.width &&
            this.y + thisOffset.y < mo.y + moOffset.y + mo.height + moOffset.height
        );
    }

    takeDamage(damage) {
        if (this.isDead) return;
        
        this.energy -= damage;
        this.isHurt = true;
        
        if (this.AUDIO_HURT) {
            this.AUDIO_HURT.currentTime = 0;
            this.AUDIO_HURT.volume = 0.1;
            this.AUDIO_HURT.play();
        }
        
        setTimeout(() => {
            this.isHurt = false;
        }, 600);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    animateEnemy() {
        const currentTime = Date.now();

        if (currentTime - this.lastFrameTime >= this.animationSpeed) {
            this.advanceFrame();
            this.lastFrameTime = currentTime;
        }
    }

    advanceFrame() {
        this.currentFrame++;
        if (this.currentFrame >= this.totalFrames) {
            this.currentFrame = 0;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
}
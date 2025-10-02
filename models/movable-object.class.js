class MovableObject extends DrawableObject {
        speed = 0.15;
        otherDirection = false;
        speedY = 0;
        acceleration = 0.2; // Schwerkraft
        energy = 100;
        energyGreen = 100;

    applyGravity() {
    if (this.isAboveGround() || this.speedY < 0) {
        this.y += this.speedY;
        this.speedY += this.acceleration;
        this.checkPlatformCollision();
    } else {
        if (this.isJumping) {
            this.isJumping = false;
            this.speedY = 0;
            this.y = this.world?.level?.groundY || 340; // Verwende Level.groundY oder Fallback
            // ✅ Lass animate() den richtigen Sprite wählen
            this.animate();
        }
    }
}


        isAboveGround() {
        // Prüfe ob Character über Boden ODER Platform ist
        if (this.world && this.world.level.platforms) {
            for (let platform of this.world.level.platforms) {
                if (this.x + this.width > platform.x && 
                    this.x < platform.x + platform.width &&
                    Math.abs((this.y + this.height) - platform.y) < 5) {
                    return false; // Steht auf Platform
                }
            }
        }
        return this.y < (this.world?.level?.groundY || 340);
    }


     checkPlatformCollision() {
        // Prüfe Kollision mit allen Plattformen
        if (this.world && this.world.level.platforms) {
            for (let platform of this.world.level.platforms) {
                // Character fällt auf Plattform?
                if (this.speedY >= 0 && // Fällt nach unten oder steht
                    this.x + this.width > platform.x &&
                    this.x < platform.x + platform.width &&
                    this.y + this.height <= platform.y + 10 &&
                    this.y + this.height >= platform.y - 10) {
                    
                    // Auf Platform landen
                    this.y = platform.y - this.height;
                    this.speedY = 0;
                    this.isJumping = false;
                    break;
                }
            }
        }
    }




    // isColliding(mo) {
    //     return this.x + this.width > mo.x &&
    //            this.y + this.height > mo.y &&
    //            this.x < mo.x + mo.width &&
    //            this.y < mo.y + mo.height;
    // }

    isColliding(mo) {
    // Hitbox-Offsets berücksichtigen
    const thisOffset = this.hitboxOffset || { x: 0, y: 0, width: 0, height: 0 };
    const moOffset = mo.hitboxOffset || { x: 0, y: 0, width: 0, height: 0 };
    
    return (
        this.x + thisOffset.x + this.width + thisOffset.width > mo.x + moOffset.x &&
        this.y + thisOffset.y + this.height + thisOffset.height > mo.y + moOffset.y &&
        this.x + thisOffset.x < mo.x + moOffset.x + mo.width + moOffset.width &&
        this.y + thisOffset.y < mo.y + moOffset.y + mo.height + moOffset.height
    );
}



    takeDamage(damage) {
    if (this.isDead) return; // Kein Schaden wenn schon tot
    
    this.energy -= damage;
    this.isHurt = true;
    // Timer für Hurt-Animation
    setTimeout(() => {
        this.isHurt = false;
    }, 600); // Hurt-Sprite 500ms anzeigen
    
    console.log("Character took damage:", damage, "Energy:", this.energy);
}

// isDead() {
//     return this.energy <= 0;
// }

        loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            img.onload = () => {
                console.log(`Cached image loaded: ${path}`);
            };
            this.imageCache[path] = img;
        });
    }

        animateEnemy() {
            const currentTime = Date.now();

            if (currentTime - this.lastFrameTime >= this.animationSpeed) {
                this.currentFrame++;
                if (this.currentFrame >= this.totalFrames) {
                    this.currentFrame = 0; // Zurück zum ersten Frame
                }
                this.lastFrameTime = currentTime;
            }
        }

         moveRight() {
        this.x += this.speed; // ✅ Einfache Bewegung ohne Timer
    }

    moveLeft() {
        this.x -= this.speed;

    }

}
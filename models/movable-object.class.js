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
    } else {
        if (this.isJumping) {
            this.isJumping = false;
            this.speedY = 0;
            this.y = 340;
            // ✅ Lass animate() den richtigen Sprite wählen
            this.animate();
        }
    }
}


        isAboveGround() {
            return this.y < 340;
        }




    isColliding(mo) {
        return this.x + this.width > mo.x &&
               this.y + this.height > mo.y &&
               this.x < mo.x + mo.width &&
               this.y < mo.y + mo.height;
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

    jump() {
    if (!this.isJumping && !this.isAboveGround()) {
        this.isJumping = true;
        this.speedY = -5; // Anfangsgeschwindigkeit des Sprungs
        console.log("Jump initiated at y:", this.y);
        // Jump Sprite wechseln
        if (this.jumpSprite.complete) {
            this.img = this.jumpSprite;
            this.frameWidth = this.jumpSprite.width / 8;
            this.frameHeight = this.jumpSprite.height;
            this.totalFrames = 8;
            this.currentFrame = 0;
        }
    }

}

        attack() {
     if (!this.isAttacking && this.energyGreen > 0) {
        this.isAttacking = true;
            console.log("Energy after attack:", this.energyGreen);
            console.log("Before attack:", this.energyGreen);
        
        if (this.attackSprite.complete) {
            this.img = this.attackSprite;
            this.frameWidth = this.attackSprite.width / 6;
            this.frameHeight = this.attackSprite.height;
            this.totalFrames = 6;
            this.currentFrame = 0;

            this.energyGreen -= 10; // Dann Energie reduzieren
        if (this.energyGreen < 0) this.energyGreen = 0;
        }
        
        // Timer um Attack zu beenden
        setTimeout(() => {
            this.isAttacking = false;
        }, 500); // 6 Frames * 100ms
        console.log("Attack initiated");
    }
}
}
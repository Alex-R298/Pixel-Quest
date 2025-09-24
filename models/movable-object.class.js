class MovableObject {
        x = 0;
        y = 360;
        img;
        height = 70;
        width = 70;
        currentFrame = 0;
        totalFrames = 4; // Anzahl der Frames im Sprite Sheet
        frameWidth = 0;  // Wird berechnet wenn Bild lädt
        frameHeight = 0; // Wird berechnet wenn Bild lädt
        animationSpeed = 100; // Millisekunden zwischen Frames
        lastFrameTime = 0;
        speed = 0.15;
        imageCache = {};
        otherDirection = false;
        speedY = 0;
        acceleration = 0.1; // Schwerkraft

    applyGravity() {
    if (this.isAboveGround() || this.speedY < 0) {
        this.y += this.speedY;
        this.speedY += this.acceleration;
    } else {
        if (this.isJumping) {
            this.isJumping = false;
            this.speedY = 0;
            this.y = 360;
            // ✅ Lass animate() den richtigen Sprite wählen
            this.animate();
        }
    }
}


        isAboveGround() {
            return this.y < 360;
        }

         loadImage(path) {
        // ✅ Speichere Image-Referenz in lokaler Variable
        const img = new Image();
        img.src = path;
        img.onload = () => {
            // ✅ Nutze die lokale img Variable, nicht this.img
            this.frameWidth = img.width / this.totalFrames;
            this.frameHeight = img.height;
            console.log(`Image loaded: ${path}, frameWidth: ${this.frameWidth}`);
        };
        this.img = img; // Setze this.img erst nach der onload Definition
    }

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
        this.speedY = -4.5; // Anfangsgeschwindigkeit des Sprungs
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
}

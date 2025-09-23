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

    //     loadImages(arr) {
    //     arr.forEach((path) => {
    //         const img = new Image();
    //         img.src = path;
    //         img.onload = () => {
    //             console.log(`Cached image loaded: ${path}`);
    //         };
    //         this.imageCache[path] = img;
    //     });
    // }

        animate() {
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

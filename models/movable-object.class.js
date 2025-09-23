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


        loadImage(path) {
            this.img = new Image();
            this.img.src = path;
            this.img.onload = () => {
            this.frameWidth = this.img.width / this.totalFrames;
            this.frameHeight = this.img.height;
        };
        }

        loadImages(arr) {
            arr.forEach((path) => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            });
        }

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

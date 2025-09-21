class MovableObject {
        x = 400;
        y = 150;
        img;
        height = 50;
        width = 50;
        currentFrame = 0;
        totalFrames = 4; // Anzahl der Frames im Sprite Sheet
        frameWidth = 0;  // Wird berechnet wenn Bild lädt
        frameHeight = 0; // Wird berechnet wenn Bild lädt
        animationSpeed = 100; // Millisekunden zwischen Frames
        lastFrameTime = 0;


        loadImage(path) {
            this.img = new Image();
            this.img.src = path;
            this.img.onload = () => {
            this.frameWidth = this.img.width / this.totalFrames;
            this.frameHeight = this.img.height;
        };
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
            console.log("move right");
        }

        moveLeft() {
        
    }

    
}

class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 0;
    y = 340;
    height = 70;
    width = 70;
    currentFrame = 0;
    totalFrames = 4; // Anzahl der Frames im Sprite Sheet
    frameWidth = 0;  // Wird berechnet wenn Bild lädt
    frameHeight = 0; // Wird berechnet wenn Bild lädt
    animationSpeed = 100; // Millisekunden zwischen Frames
    lastFrameTime = 0;


    loadImage(path) {
        // ✅ Speichere Image-Referenz in lokaler Variable
        const img = new Image();
        img.src = path;
        img.onload = () => {
            // ✅ Nutze die lokale img Variable, nicht this.img
            this.frameWidth = img.width / this.totalFrames;
            this.frameHeight = img.height;
        };
        this.img = img; // Setze this.img erst nach der onload Definition
    }


    draw(ctx) {
        if (this.img && this.img.complete && this.frameWidth > 0) {
            // Animierte Objekte mit Sprite Sheet
            const sourceX = this.currentFrame * this.frameWidth;
            const sourceY = 0;
            ctx.drawImage(this.img, sourceX, sourceY, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
        } else if (this.img && this.img.complete) {
            // Statische Objekte
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    drawStatusBar(ctx) {
        if (this.img && this.img.complete) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    drawEnergyBar(ctx) {
        if (this.img && this.img.complete) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            img.onload = () => {
            };
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
    if (this instanceof Character || this instanceof Endboss || this instanceof SmallMushroom) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x+30, this.y, this.width -30, this.height);
        ctx.stroke();
    }
} 

}
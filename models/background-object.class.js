class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;
    constructor(imagePath, x = 0, width = 720, height = 480 , y = null) {
        super().loadImage(imagePath);
        this.x = x;
        this.width = width;
        this.height = height;
        if (y !== null) {
            this.y = y;
        } else {
            this.y = 480 - this.height; // Standard: am Boden
        }
        this.totalFrames = 1;
        
    }
}

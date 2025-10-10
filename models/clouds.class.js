class Cloud extends MovableObject {
    width = 250;
    height = 50;
    y = 30;

    /**
     * Creates a new Cloud instance
     * @param {string} imagePath - Path to the cloud image
     * @param {number} x - X coordinate position
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.totalFrames = 1;
        this.animateClouds();
    }

    /**
     * Animates cloud movement from right to left
     */
    animateClouds() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}


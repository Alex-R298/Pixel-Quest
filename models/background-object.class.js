class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a new BackgroundObject instance
     * @param {string} imagePath - Path to the background image
     * @param {number} [x=0] - X coordinate position
     * @param {number} [width=720] - Width of the background object
     * @param {number} [height=480] - Height of the background object
     * @param {number|null} [y=null] - Y coordinate position, defaults to bottom alignment if null
     */
    constructor(imagePath, x = 0, width = 720, height = 480, y = null) {
        super().loadImage(imagePath);
        this.x = x;
        this.width = width;
        this.height = height;
        if (y !== null) {
            this.y = y;
        } else {
            this.y = 480 - this.height;
        }
        this.totalFrames = 1;
    }
}

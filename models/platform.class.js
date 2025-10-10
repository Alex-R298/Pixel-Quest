class Platform extends DrawableObject {


    /**
     * Creates a new Platform instance
     * @param {string} imagePath - Path to platform image (null for invisible platforms)
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} width - Platform width
     * @param {number} height - Platform height
     */
    constructor(imagePath, x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.solid = true;
        this.invisible = !imagePath;
        if (imagePath) {
            this.loadImage(imagePath);
        }
    }


    /**
     * Draws the platform on the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        this.drawPlatform(ctx);
    }
}

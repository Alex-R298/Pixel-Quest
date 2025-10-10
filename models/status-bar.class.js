class StatusBar extends DrawableObject {


    IMAGES = [
        "img/Bars/Healthbar_full.png",
        "img/Bars/Healthbar_full2.png",
        "img/Bars/Healthbar_full3.png",
        "img/Bars/Healthbar_empty.png"
    ];


    percentage = 100;


    /**
     * Creates a new StatusBar instance
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 20;
        this.y = 20;
        this.width = 140;
        this.height = 20;
    }


    /**
     * Draws the status bar on the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        this.drawStatusBar(ctx);
    }


    /**
     * Sets the health percentage and updates the bar image
     * @param {number} percentage - Health percentage value
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.loadImage(path);
    }


    /**
     * Resolves the image index based on current health percentage
     * @returns {number} Image index for current health level
     */
    resolveImageIndex() {
        if (this.percentage > 75) return 0;
        else if (this.percentage > 50) return 1;
        else if (this.percentage > 25) return 2;
        else return 3;
    }
}  

class EnergyBar extends DrawableObject {

    IMAGES = [
        "img/Bars/Energybar_full.png",
        "img/Bars/Energybar_full1.png",
        "img/Bars/Energybar_full2.png",
        "img/Bars/Energybar_full3.png",
        "img/Bars/Energybar_full4.png",
        "img/Bars/Energybar_full5.png",
        "img/Bars/Energybar_full6.png",
        "img/Bars/Energybar_full7.png",
        "img/Bars/Energybar_full8.png",
        "img/Bars/Energybar_empty.png"
    ];

    percentage = 100;


    /**
     * Creates a new EnergyBar instance
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentageEnergy(100);
        this.x = 20;
        this.y = 50;
        this.width = 140;
        this.height = 20;
    }


    /**
     * Draws the energy bar on the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        this.drawEnergyBar(ctx);
    }


    /**
     * Sets the energy percentage and updates the bar image
     * @param {number} percentage - Energy percentage value
     */
    setPercentageEnergy(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndexEnergy()];
        this.loadImage(path);
    }


    /**
     * Resolves the image index based on current energy percentage
     * @returns {number} Image index for current energy level
     */
    resolveImageIndexEnergy() {
        if (this.percentage >= 100) return 0;
        else if (this.percentage >= 90) return 1;
        else if (this.percentage >= 80) return 2;
        else if (this.percentage >= 70) return 3;
        else if (this.percentage >= 60) return 4;
        else if (this.percentage >= 50) return 5;
        else if (this.percentage >= 40) return 6;
        else if (this.percentage >= 30) return 7;
        else if (this.percentage > 10) return 8;
        else return 9;
    }
}

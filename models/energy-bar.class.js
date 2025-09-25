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

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentageEnergy(100);
        this.x = 20;
        this.y = 50;
        this.width = 140; // 3 Abschnitte * 60px
        this.height = 20;
    }

    draw(ctx) {
        this.drawEnergyBar(ctx);
    }

    setPercentageEnergy(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndexEnergy()];
        this.loadImage(path);
    }

    resolveImageIndexEnergy() {
    if (this.percentage == 100) return 0;       // 100%
    else if (this.percentage >= 90) return 1;   // 90% - 99%
    else if (this.percentage >= 80) return 2;   // 80% - 89%
    else if (this.percentage >= 70) return 3;   // 70% - 79%
    else if (this.percentage >= 60) return 4;   // 60% - 69%
    else if (this.percentage >= 50) return 5;   // 50% - 59%
    else if (this.percentage >= 40) return 6;   // 40% - 49%
    else if (this.percentage >= 30) return 7;   // 30% - 39%
    else if (this.percentage >= 20) return 8;   // 20% - 29%
    else if (this.percentage >= 10) return 9;   // 10% - 19%
    else return 9;                              // 0% - 9% (empty)
}
}

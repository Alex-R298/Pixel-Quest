class StatusBar extends DrawableObject {


    IMAGES = [
        "img/Bars/Healthbar_full.png",
        "img/Bars/Healthbar_full2.png",
        "img/Bars/Healthbar_full3.png",
        "img/Bars/Healthbar_empty.png"
    ];


    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 20;
        this.y = 20;
        this.width = 140; // 3 Abschnitte * 60px
        this.height = 20;
    }


    draw(ctx) {
        this.drawStatusBar(ctx);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.loadImage(path);
    }
        
    resolveImageIndex() {
    if (this.percentage > 75) return 0;      // 3 Kästen
    else if (this.percentage > 50) return 1; // 2 Kästen
    else if (this.percentage > 25) return 2; // 1 Kasten
    else return 3;                           // 0 Kästen
        }
}   

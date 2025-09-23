
class Cloud extends MovableObject {
    width = 250;
    height = 50;
    y = 30;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.totalFrames = 1;
        this.animateClouds();
    }

    animateClouds() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60); // 60 FPS
    }

}


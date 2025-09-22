
class Cloud extends MovableObject {
    width = 250;
    height = 50;
    y = 20;
    
    constructor() {
        super().loadImage('../img/Shape2/cloud_shape2_2.png');
        this.x =  Math.random() * 500;
        this.totalFrames = 1;
    }
}
class SmallMushroom extends MovableObject {

    constructor() {
        super().loadImage('../img/Small_Mushroom/Small_Mushroom_Idle.png');

        this.x = 200 + Math.random() * 500;
        this.width = 80;
        this.height = 80;
    }
}

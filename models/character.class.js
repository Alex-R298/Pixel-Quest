class Character extends MovableObject {

    IMAGE_WALKING = [
        '../img/Owlet_Monster/Owlet_Monster_Run_6.png',
    ];

    constructor() {
        super().loadImage('../img/Owlet_Monster/Owlet_Monster_Idle_4.png');
        this.loadImages(this.IMAGE_WALKING);
        this.width = 60;
        this.height = 60;
    }

    animateWalking() {
        setInterval(() => {
            this.animate(); // Nutze die animate() Methode
        }, this.animationSpeed);
    }

    jump() {
    
    }
}

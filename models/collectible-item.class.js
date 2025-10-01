class CollectibleItem extends DrawableObject {
    coinSprite = null;
    currentFrame = 0;

    constructor(x, y) {  // ✅ Parameter nicht vergessen!
        super();
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.collectible = true;

        this.coinSprite = new Image();
        this.coinSprite.src = '../img/Objects_Animated/Coin.png';
        this.coinSprite.onload = () => {
            this.img = this.coinSprite;
            this.frameWidth = this.coinSprite.width / 8;
            this.frameHeight = this.coinSprite.height;
            this.totalFrames = 8;
        };

        this.animate();  // ✅ Animation starten
    }

    animate() {
        setInterval(() => {
            this.currentFrame++;
            if (this.currentFrame >= this.totalFrames) {
                this.currentFrame = 0; // Zurück zum ersten Frame
            }
        }, 100);
    }
}
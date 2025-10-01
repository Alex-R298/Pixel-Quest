class Coin extends DrawableObject {
    collectedCoins = 0;
    constructor() {
        super();
        this.x = 10;
        this.y = 70;
        this.width = 60;
        this.height = 60;
        this.totalFrames = 8;
        this.currentFrame = 0;  // ✅ Wichtig!

        // ✅ Bild laden
        this.img = new Image();
        this.img.src = '../img/Objects_Animated/Coin.png';
        this.img.onload = () => {
            this.frameWidth = this.img.width / this.totalFrames;
            this.frameHeight = this.img.height;
        };
        document.fonts.ready.then(() => {
            this.fontLoaded = true;
        });
        
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        }, 100);
    }

     draw(ctx) {
        // Zuerst das Coin-Icon zeichnen
        super.draw(ctx);
        
        // Dann den Text daneben zeichnen
        ctx.font = 'bold 30px Planes_ValMore, Arial';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        
        const text = `x${this.collectedCoins}`;
        const textX = this.x + this.width ;  // 10px Abstand vom Icon
        const textY = this.y + this.height / 2 + 10;  // Vertikal zentriert
        
        ctx.strokeText(text, textX, textY);
        ctx.fillText(text, textX, textY);
    }
} 

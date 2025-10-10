class Coin extends DrawableObject {
    collectedCoins = 0;
    constructor() {
        super();
        this.x = 10;
        this.y = 70;
        this.width = 60;
        this.height = 60;
        this.totalFrames = 8;
        this.currentFrame = 0;
        this.img = new Image();
        this.img.src = '../img/Objects_Animated/Coin.png';
        this.img.onload = () => {
            this.frameWidth = this.img.width / this.totalFrames;
            this.frameHeight = this.img.height;
        };
        document.fonts.ready.then(() => this.fontLoaded = true);
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
        }, 100);
    }

    
    /**
     * Draws the coin icon and collected coins counter
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        super.draw(ctx);
        ctx.font = 'bold 30px Planes_ValMore, Arial';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        const text = `x${this.collectedCoins}`;
        const textX = this.x + this.width;
        const textY = this.y + this.height / 2 + 10;
        ctx.strokeText(text, textX, textY);
        ctx.fillText(text, textX, textY);
    }
} 

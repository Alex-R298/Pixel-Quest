
class Platform extends DrawableObject {
    constructor(imagePath, x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.solid = true;
        this.invisible = !imagePath;
        
        // Nur laden wenn Pfad vorhanden
        if (imagePath) {
            this.loadImage(imagePath);
        }
    }
    
    draw(ctx) {
       this.drawPlatform(ctx);
    }
        
}

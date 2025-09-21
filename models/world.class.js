class World {
    character = new Character();
    enemies = [
        new SmallMushroom(), 
        new SmallMushroom(), 
        new SmallMushroom()
    ];
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    startGameLoop() {
        const gameLoop = () => {
            // Character animieren (Sprite Frames wechseln)
            this.character.animate();
            
            // Neu zeichnen
            this.draw();
            
            // Nächsten Frame anfordern
            requestAnimationFrame(gameLoop);
        };
        
        gameLoop(); // Starte Loop
    }

    draw() {
       this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        // Prüfen ob Bild geladen ist und frameWidth berechnet wurde
        if (this.character.img.complete && this.character.frameWidth > 0) {
            // Position des aktuellen Frames im Sprite Sheet berechnen
            const sourceX = this.character.currentFrame * this.character.frameWidth;
            const sourceY = 0;
            
            // RICHTIGE drawImage Parameter für Sprite Sheet:
            this.ctx.drawImage(
                this.character.img,           // Das Sprite Sheet Bild
                sourceX,                      // X-Position im Sprite Sheet
                sourceY,                      // Y-Position im Sprite Sheet
                this.character.frameWidth,    // Breite eines Frames
                this.character.frameHeight,   // Höhe eines Frames
                this.character.x,             // X-Position auf Canvas
                this.character.y,             // Y-Position auf Canvas
                this.character.width,         // Ziel-Breite auf Canvas
                this.character.height         // Ziel-Höhe auf Canvas
            );
    }
    
}
}

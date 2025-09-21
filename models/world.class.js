class World {
    character = new Character();
    enemies = [
        new SmallMushroom(), 
        new SmallMushroom(), 
        new SmallMushroom()
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // draw wird immer wieder aufgerufen
       let self = this;
                requestAnimationFrame(function() {
                    self.draw();
                });
        this.character.animate();
        this.enemies.forEach(enemy => enemy.animate());
        
        // Prüfen ob Bild geladen ist und frameWidth berechnet wurde
        if (this.character.img.complete && this.character.frameWidth > 0) {
            // Position des aktuellen Frames im Sprite Sheet berechnen
            const sourceX = this.character.currentFrame * this.character.frameWidth;
            const sourceY = 0;
            
            
            this.ctx.drawImage(this.character.img, sourceX, sourceY, this.character.frameWidth, this.character.frameHeight, this.character.x, this.character.y, this.character.width, this.character.height);
            this.enemies.forEach(enemy => {
                if (enemy.img.complete && enemy.frameWidth > 0) {
                    const enemySourceX = enemy.currentFrame * enemy.frameWidth;
                    const enemySourceY = 0;
                    this.ctx.drawImage(enemy.img, enemySourceX, enemySourceY, enemy.frameWidth, enemy.frameHeight, enemy.x, enemy.y, enemy.width, enemy.height);
                }
            });

        }

    }
}
 
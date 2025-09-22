class World {
    character = new Character();
    enemies = [
        new SmallMushroom(), 
        new SmallMushroom(), 
        new SmallMushroom()
    ];

    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('../img/Background/Layers/1.png', 0, 0),
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
        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
        
        this.character.animate();
        this.enemies.forEach(enemy => enemy.animate());
        
        // RICHTIGE REIHENFOLGE (von hinten nach vorne):
        
        // 1. Background Objects (ganz hinten)
        this.addObjectsToMap(this.backgroundObjects);
        
        // 2. Clouds (Hintergrund-Wolken)
        this.addObjectsToMap(this.clouds);
        
        // 3. Character (Spielfigur)
        this.addObjectsToMap([this.character]);
        
        // 4. Enemies (Gegner - vorne)
        this.addObjectsToMap(this.enemies);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.img && mo.img.complete && mo.frameWidth > 0) {
            // Animierte Objekte mit Sprite Sheet
            const sourceX = mo.currentFrame * mo.frameWidth;
            const sourceY = 0;
            this.ctx.drawImage(
                mo.img, 
                sourceX, sourceY, mo.frameWidth, mo.frameHeight, 
                mo.x, mo.y, mo.width, mo.height
            );
        } else if (mo.img && mo.img.complete) {
            // Statische Objekte
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
    }
}

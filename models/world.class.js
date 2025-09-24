class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.startEnemyMovement();
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    startEnemyMovement() {
        this.level.enemies.forEach(enemy => {
            if (enemy.startWalking) {
                enemy.startWalking(); // Falls du die startWalking() Methode hast
            } else {
                // Fallback: Einfache kontinuierliche Bewegung
                enemy.isMoving = true;
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.character.animate();
        this.character.applyGravity();
        this.level.enemies.forEach(enemy => {
            // Bewegung (Position ändern)
            if (enemy.isMoving || enemy.isWalking) {
                enemy.move(); // Bewege nach links
                enemy.animateEnemy();
            }
        });

         this.ctx.translate(this.camera_x, 0);
        
        // RICHTIGE REIHENFOLGE (von hinten nach vorne):
        
        // 1. Background Objects (ganz hinten)
        this.addObjectsToMap(this.level.backgroundObjects);

        // 2. Clouds (Hintergrund-Wolken)
        this.addObjectsToMap(this.level.clouds);

        // 3. Character (Spielfigur)
        this.addObjectsToMap([this.character]);
        
        // 4. Enemies (Gegner - vorne)
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0); // Kamera zurücksetzen


        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
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
        if (mo.otherDirection) {
            this.ctx.restore();
            mo.x = mo.x * -1;
        }
    }
}

class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    energyBar = new EnergyBar();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.startEnemyMovement();
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy)) {
                    console.log("Collision detected!", enemy);
                    this.character.takeDamage(34); // Fester Schaden von 34
                    this.statusBar.setPercentage(this.character.energy);
                    console.log("Character energy:", this.character.energy);
                }
            });
        }, 1000);
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
        this.level.enemies.forEach(enemy => {
            // Bewegung (Position ändern)
            if (enemy.isMoving || enemy.isWalking) {
                enemy.move(); // Bewege nach links
                enemy.animateEnemy();
            }
        });

         this.energyBar.setPercentageEnergy(this.character.energyGreen);

         this.ctx.translate(this.camera_x, 0);
        
        // RICHTIGE REIHENFOLGE (von hinten nach vorne):
        
        // 1. Background Objects (ganz hinten)
        this.addObjectsToMap(this.level.backgroundObjects);


        // 2. Clouds (Hintergrund-Wolken)
        this.addObjectsToMap(this.level.clouds);

        // 3. Character (Spielfigur)
        this.addToMap(this.character);
        
        // 4. Enemies (Gegner - vorne)
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0); // Kamera zurücksetzen

        this.addToMap(this.statusBar);
        this.addToMap(this.energyBar);

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
            this.flipImage(mo);
        }
        
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}

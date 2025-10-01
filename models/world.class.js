class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    energyBar = new EnergyBar();
    coin = new Coin();

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

//     checkCollisions() {
//         setInterval(() => {
//             this.level.enemies.forEach(enemy => {
//                 this.checkAttackEnemy(enemy);
//                 this.damageToEnemies();
//             });
//         }, 1000);
//     }

//     // checkAttackEnemy(enemy) {
//     //     if (enemy.isColliding(this.character)) {
//     //         enemy.attackEnemy();
//     //         enemy.stopWalking();
//     //     } else {
//     //         enemy.isAttacking = false;
//     //         enemy.startWalking();
//     //     }
//     // }

//     checkAttackEnemy(enemy) {
//     if (enemy.isColliding(this.character)) {
//         if (!enemy.isAttacking) {
//             enemy.attackEnemy();
//            enemy.stopWalking();
//         }
        
//         // ✅ Schaden nur wenn Gegner attackiert
//         if (enemy.isAttacking) {
//             this.character.takeDamage(0.5); // Schaden an Charakter
//             this.statusBar.setPercentage(this.character.energy);
//         }
//     } else {
//         enemy.isAttacking = false;
//         enemy.startWalking();
//     }
// }

//     damageToEnemies() {
//     this.level.enemies.forEach(enemy => {
//         if (this.character.isColliding(enemy) && this.character.isAttacking) {
//             enemy.takeDamage(50);

//             console.log("Enemy took damage, energy:", enemy.energy);
//         }
//     });
// }

checkCollisions() {
    setInterval(() => {
            this.checkCollectibles(); // ✅ Checke sammelbare Items
        this.level.enemies.forEach(enemy => {
            this.checkAttackEnemy(enemy);
            this.damageToEnemies(enemy); // ✅ enemy als Parameter übergeben
        });
    }, 1000);
}

checkCollectibles() {
    this.level.collectibleItems.forEach((item, index) => {
        if (this.character.isColliding(item)) {
            this.coin.collectedCoins++;  // ✅ Zähler erhöhen
            this.level.collectibleItems.splice(index, 1);  // Item entfernen
        }
    });
}

checkAttackEnemy(enemy) {
    // ✅ Nur wenn Gegner NICHT tot ist
    if (!enemy.isDead) {
        if (enemy.isColliding(this.character)) {
            if (!enemy.isAttacking) {
                enemy.attackEnemy();
                enemy.stopWalking();
            }
            
            // ✅ Schaden nur wenn Gegner attackiert UND Character nicht tot
            if (enemy.isAttacking && !this.character.isDead) {
                this.character.takeDamage(0.5);
                this.statusBar.setPercentage(this.character.energy);
            }
        } else {
            enemy.isAttacking = false;
            enemy.startWalking();
        }
    }
}

damageToEnemies(enemy) {
    // ✅ HIER kommt dein Code rein - mit hit() statt takeDamage()
    if (this.character.isColliding(enemy) && this.character.isAttacking && !enemy.isDead) {
        enemy.takeDamage(50); // ✅ hit() Methode aufrufen (nicht takeDamage)
        console.log("Enemy hit! Energy:", enemy.energy);
    }
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
                if (enemy.isAttacking) {
        // Nur Attack-Animation, keine Bewegung
        enemy.animateEnemy();
    } else if (enemy.isMoving || enemy.isWalking) {
        enemy.move();
        enemy.animateEnemy();
    }
});

         this.energyBar.setPercentageEnergy(this.character.energyGreen);

    this.ctx.translate(this.camera_x, 0);
    
    // 1. Background Objects (ganz hinten)
    this.addObjectsToMap(this.level.backgroundObjects);

    // 2. Clouds (Hintergrund-Wolken)
    this.addObjectsToMap(this.level.clouds);

    // 3. Collectible Items (Münzen)
    this.addObjectsToMap(this.level.collectibleItems);  // ✅ HIER!

    // 4. Character (Spielfigur)
    this.addToMap(this.character);
    
    // 5. Enemies (Gegner - vorne)
    this.addObjectsToMap(this.level.enemies);
    
    this.ctx.translate(-this.camera_x, 0); // Kamera zurücksetzen

    // UI-Elemente (fixiert am Bildschirm)
    this.addToMap(this.statusBar);
    this.addToMap(this.energyBar);
    this.addToMap(this.coin);

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

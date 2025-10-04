class World {
    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    energyBar = new EnergyBar();
    coin = new Coin();
    // BACKGROUND_MUSIC = new Audio('./audio/background.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.level = createLevel1();
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.intervals = []; // ← Hier hinzufügen
        this.animationFrame = null;
        this.startEnemyMovement();
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.BACKGROUND_MUSIC.volume = 0.08;
        this.BACKGROUND_MUSIC.loop = true;
        this.BACKGROUND_MUSIC.play();
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
    // ✅ Münzen alle 100ms prüfen (schnelle Reaktion)
    setInterval(() => {
        this.checkCollectibles();
    }, 100);
    
    // ✅ Gegner-Angriffe alle 1000ms prüfen
    setInterval(() => {
        this.level.enemies.forEach(enemy => {
            this.checkEnemyAttack(enemy);
        });
    }, 1000);
    
    // ✅ Spieler-Schaden alle 200ms prüfen (schnellere Reaktion!)
    setInterval(() => {
        this.level.enemies.forEach(enemy => {
            this.damageToEnemies(enemy);
        });
    }, 200);
}


checkCollectibles() {
    this.level.collectibleItems.forEach((item, index) => {
        if (this.character.isColliding(item)) {
            // Je nach Typ unterschiedlich behandeln
            if (item.type === 'coin') {
                this.coin.collectedCoins += item.value;
                // Item entfernen
                this.level.collectibleItems.splice(index, 1);
                item.onCollect(this.character);
                
            } else if (item.type === 'food') {
                // ✅ ZUERST prüfen ob Heilung nötig ist
                if (this.character.energyGreen < 100) {
                    // Nur heilen wenn nicht voll
                    this.character.energyGreen = Math.min(this.character.energyGreen + item.healAmount, 100);
                    this.energyBar.setPercentageEnergy(this.character.energyGreen);
                    
                    // Item entfernen und Effekt abspielen
                    this.level.collectibleItems.splice(index, 1);
                    item.onCollect(this.character);
                }
                // ✅ Wenn voll: Item NICHT aufnehmen (bleibt liegen)
            }
        }
    });
}

checkEnemyAttack(enemy) {
    // Nur wenn Gegner nicht tot ist
    if (!enemy.isDead) {
        if (enemy.isColliding(this.character)) {
            // Gegner startet Attack-Animation wenn er nicht bereits angreift
            if (!enemy.isAttacking) {
                enemy.attackEnemy();
                enemy.stopWalking();
                
                // ✅ Schaden kommt SPÄTER (bei Frame 2 der Animation)
                if (!enemy.hasDealtDamage) {
                    enemy.hasDealtDamage = true;
                    
                    // Warte bis Animation bei "Schlag-Frame" ist
                    setTimeout(() => {
                        // Prüfe ob immer noch in Reichweite
                        if (enemy.isColliding(this.character) && 
                            !this.character.isDead && 
                            !this.character.isHurt) {
                            this.character.takeDamage(33.4); // 3 Treffer = tot
                            this.statusBar.setPercentage(this.character.energy);
                        }
                        
                        // Nach 1 Sekunde kann wieder angegriffen werden
                        setTimeout(() => {
                            enemy.hasDealtDamage = false;
                        }, 2000);
                    }, 300); // 300ms = Schlag kommt bei Frame 2
                }
            }
        } else {
            // Gegner hört auf zu attackieren wenn Character weg ist
            enemy.isAttacking = false;
            enemy.hasDealtDamage = false;
            enemy.startWalking();
        }
    }
}

damageToEnemies(enemy) {
    // Prüfe ob Character trifft UND Gegner nicht bereits hurt ist
    if (this.character.isColliding(enemy) && 
        this.character.isAttacking && 
        !enemy.isDead && 
        !enemy.isHurt) {  // ✅ Wichtig: Nur treffen wenn Gegner nicht bereits hurt
        
        enemy.takeDamage(50);
        console.log("Enemy hit! Energy:", enemy.energy);
        
        // enemy.isHurt wird in animateEnemy() automatisch zurückgesetzt
        // Das verhindert mehrfache Treffer pro Attack
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

    this.addObjectsToMap(this.level.platforms);

    // 2. Clouds (Hintergrund-Wolken)
    this.addObjectsToMap(this.level.clouds);

    // 3. Collectible Items (Münzen)
    this.addObjectsToMap(this.level.collectibleItems);  // ✅ HIER!

    // 4. Character (Spielfigur)
    
    // 5. Enemies (Gegner - vorne)
    this.addObjectsToMap(this.level.enemies);

     this.addToMap(this.character);
    
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

cleanup() {
    cancelAnimationFrame(this.animationFrame);
    this.intervals.forEach(interval => clearInterval(interval));
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

   

    // flipImage(mo) {
    //     this.ctx.save();
    //     this.ctx.translate(mo.width, 0);
    //     this.ctx.scale(-1, 1);
    //     mo.x = mo.x * -1;
    // }

    flipImage(mo) {
    this.ctx.save();
    const displayWidth = mo.renderWidth || mo.width;  // ← Diese Zeile hinzufügen
    this.ctx.translate(displayWidth, 0);  // ← Hier displayWidth statt mo.width
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
}

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

}

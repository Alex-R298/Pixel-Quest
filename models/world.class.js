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
    BACKGROUND_MUSIC = new Audio('./audio/background.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.level = createLevel1();
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.intervals = [];
        this.animationFrame = null;
        this.startEnemyMovement();
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    checkCollisions() {
        this.addInterval(setInterval(() => {
            this.checkCollectibles();
            this.checkEnemyInteractions();
        }, 50));
    }

    checkEnemyInteractions() {
        this.level.enemies.forEach(enemy => {
            if (enemy.isDead) return;
            const isColliding = enemy.isColliding(this.character);
            if (isColliding && !this.character.isDead) {
                this.handleEnemyAttack(enemy);
            } else if (enemy.isAttacking) {
                enemy.isAttacking = false;
                if (!enemy.isHurt) enemy.startWalking();
            }
            if (this.character.isAttacking && !enemy.isHurt && !enemy.hitCooldown) {
                if (this.character.isAttackHitting(enemy)) {
                    this.handlePlayerAttack(enemy);
                }
            }
        });
    }

    handleEnemyAttack(enemy) {
        const currentTime = Date.now();
        if (!enemy.isAttacking) {
            enemy.isAttacking = true;
            enemy.attackStartTime = currentTime;
            enemy.stopWalking();
        }
        const attackDelay = enemy instanceof Endboss ? 400 : 300;
        const cooldownTime = enemy instanceof Endboss ? 1500 : 2000;
        if (!enemy.attackCooldown && currentTime - enemy.attackStartTime >= attackDelay) {
            if (enemy.isAttackHitting(this.character) && !this.character.isDead && !this.character.isHurt) {
                this.character.takeDamage(100/3);
                this.statusBar.setPercentage(this.character.energy);
                enemy.attackCooldown = true;
                setTimeout(() => { enemy.attackCooldown = false; enemy.attackStartTime = Date.now(); }, cooldownTime);
            }
        }
    }

    handlePlayerAttack(enemy) {
        enemy.takeDamageEnemy(50);
        const knockbackDirection = this.character.otherDirection ? -1 : 1;
        const wasMoving = enemy.isMoving;
        enemy.stopWalking();
        enemy.x += knockbackDirection * 30;
        enemy.leftBoundary = enemy.x - 60;
        enemy.rightBoundary = enemy.x + 60;
        enemy.knockbackActive = true;
        setTimeout(() => { enemy.knockbackActive = false; if (wasMoving && !enemy.isDead && !enemy.isHurt) enemy.startWalking(); }, 400);
        enemy.hitCooldown = true;
        setTimeout(() => { enemy.hitCooldown = false; }, 600);
    }

    checkCollectibles() {
        this.level.collectibleItems.forEach((item, index) => {
            if (this.character.isColliding(item)) {
                if (item.type === 'coin') {
                    this.coin.collectedCoins += item.value;
                    this.level.collectibleItems.splice(index, 1);
                    item.onCollect(this.character);
                } else if (item.type === 'food' && this.character.energyGreen < 100) {
                    this.character.energyGreen = Math.min(this.character.energyGreen + item.healAmount, 100);
                    this.energyBar.setPercentageEnergy(this.character.energyGreen);
                    this.level.collectibleItems.splice(index, 1);
                    item.onCollect(this.character);
                }
            }
        });
    }

    addInterval(interval) {
        this.intervals.push(interval);
    }

    startEnemyMovement() {
        this.level.enemies.forEach(enemy => {
            if (enemy.startWalking) {
                enemy.startWalking();
            } else {
                enemy.isMoving = true;
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.character.animate();
        this.level.enemies.forEach(enemy => {
            if (enemy.isAttacking) {
                enemy.animateEnemy();
            } else if (!enemy.isHurt && !enemy.knockbackActive && (enemy.isMoving || enemy.isWalking)) {
                enemy.move();
                enemy.animateEnemy();
            } else if (enemy.isHurt || enemy.knockbackActive) {
                enemy.animateEnemy();
            }
        });
        this.drawWorld();
    }

    drawWorld() {
        this.energyBar.setPercentageEnergy(this.character.energyGreen);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.platforms);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectibleItems);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.drawUI();
    }

    drawUI() {
        this.addToMap(this.statusBar);
        this.addToMap(this.energyBar);
        this.addToMap(this.coin);
        requestAnimationFrame(() => { this.draw(); });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    flipImage(mo) {
        this.ctx.save();
        const displayWidth = mo.renderWidth || mo.width;
        this.ctx.translate(displayWidth, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    cleanup() {
        if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
        if (this.intervals) {
            this.intervals.forEach(interval => clearInterval(interval));
            this.intervals = [];
        }
        if (this.BACKGROUND_MUSIC) {
            this.BACKGROUND_MUSIC.pause();
            this.BACKGROUND_MUSIC.currentTime = 0;
        }
        this.level.enemies.forEach(enemy => {
            enemy.isAttacking = false;
            enemy.attackCooldown = false;
            enemy.attackStartTime = 0;
        });
    }
}
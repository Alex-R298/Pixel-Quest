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
    isRunning = true;


    /**
     * Creates a new World instance
     * @param {HTMLCanvasElement} canvas - The game canvas
     * @param {Keyboard} keyboard - Keyboard input handler
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.level = createLevel1();
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.intervals = [];
        this.animationFrame = null;
        this.isRunning = true;
        this.startEnemyMovement();
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }


    /**
     * Sets world reference for character and enemies
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }


    /**
     * Starts collision checking interval
     */
    checkCollisions() {
        this.addInterval(setInterval(() => {
            if (!this.isRunning) return;
            this.checkCollectibles();
            this.checkEnemyInteractions();
        }, 50));
    }


    /**
     * Checks and handles all enemy interactions
     */
    checkEnemyInteractions() {
        this.level.enemies.forEach(enemy => {
            if (enemy.isDead) return;
            this.handleEnemyCollision(enemy);
            this.handlePlayerAttackCheck(enemy);
        });
    }


    /**
     * Handles collision between enemy and character
     * @param {MovableObject} enemy - The enemy to check
     */
    handleEnemyCollision(enemy) {
    const isColliding = enemy.isColliding(this.character);
    if (isColliding && !this.character.isDead && !enemy.isHurt && !enemy.isDead) {
        this.handleEnemyAttack(enemy);
    } else if (enemy.isAttacking && (!isColliding || enemy.isHurt)) {
        enemy.isAttacking = false;
        if (!enemy.isHurt && !enemy.isDead) enemy.startWalking();
    }
}


    /**
     * Checks if player attack hits enemy
     * @param {MovableObject} enemy - The enemy to check
     */
    handlePlayerAttackCheck(enemy) {
        if (this.character.isAttacking && !enemy.isHurt && !enemy.hitCooldown) {
            if (this.character.actions.isAttackHitting(enemy)) {
                this.handlePlayerAttack(enemy);
            }
        }
    }


    /**
     * Handles enemy attack on character
     * @param {MovableObject} enemy - The attacking enemy
     */
    handleEnemyAttack(enemy) {
        const currentTime = Date.now();
        this.initiateEnemyAttack(enemy, currentTime);
        this.executeEnemyAttack(enemy, currentTime);
    }


    /**
     * Initiates enemy attack state
     * @param {MovableObject} enemy - The attacking enemy
     * @param {number} currentTime - Current timestamp
     */
    initiateEnemyAttack(enemy, currentTime) {
    if (!enemy.isAttacking) {
        enemy.isAttacking = true;
        enemy.attackStartTime = currentTime;
        enemy.stopWalking();
        if (enemy.attackEnemy) {
            enemy.attackEnemy();
        }
    }
}


    /**
     * Executes enemy attack damage
     * @param {MovableObject} enemy - The attacking enemy
     * @param {number} currentTime - Current timestamp
     */
    executeEnemyAttack(enemy, currentTime) {
    const attackDelay = enemy instanceof Endboss ? 300 : 300;
    const cooldownTime = enemy instanceof Endboss ? 1000 : 1200;
    if (!enemy.attackCooldown && currentTime - enemy.attackStartTime >= attackDelay) {
        if (enemy.isAttackHitting(this.character) && !this.character.isDead) {
            this.character.takeDamage(100/3);
            this.statusBar.setPercentage(this.character.energy);
            enemy.attackCooldown = true;
            enemy.isAttacking = false;
            setTimeout(() => { 
                enemy.attackCooldown = false; 
                if (!enemy.isDead && !enemy.isHurt) enemy.startWalking();
            }, cooldownTime);
        }
    }
}


    /**
     * Handles player attack on enemy
     * @param {MovableObject} enemy - The attacked enemy
     */
    handlePlayerAttack(enemy) {
        enemy.takeDamageEnemy(50);
        const knockbackDirection = this.character.otherDirection ? -1 : 1;
        const wasMoving = enemy.isMoving;
        this.applyKnockback(enemy, knockbackDirection);
        this.setAttackCooldowns(enemy, wasMoving);
    }


    /**
     * Applies knockback effect to enemy
     * @param {MovableObject} enemy - The enemy to knockback
     * @param {number} direction - Knockback direction
     */
    applyKnockback(enemy, direction) {
        enemy.stopWalking();
        enemy.x += direction * 30;
        enemy.leftBoundary = enemy.x - 60;
        enemy.rightBoundary = enemy.x + 60;
        enemy.knockbackActive = true;
    }


    /**
     * Sets attack cooldowns for enemy
     * @param {MovableObject} enemy - The attacked enemy
     * @param {boolean} wasMoving - Whether enemy was moving before attack
     */
    setAttackCooldowns(enemy, wasMoving) {
        setTimeout(() => { 
            enemy.knockbackActive = false; 
            if (wasMoving && !enemy.isDead && !enemy.isHurt) enemy.startWalking(); 
        }, 400);
        enemy.hitCooldown = true;
        setTimeout(() => { enemy.hitCooldown = false; }, 600);
    }


    /**
     * Checks and handles collectible item pickups
     */
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


    /**
     * Adds interval to tracking array
     * @param {number} interval - Interval ID to track
     */
    addInterval(interval) {
        this.intervals.push(interval);
    }


    /**
     * Starts movement for all enemies
     */
    startEnemyMovement() {
        this.level.enemies.forEach(enemy => {
            if (enemy.startWalking) {
                enemy.startWalking();
            } else {
                enemy.isMoving = true;
            }
        });
    }


    /**
     * Main draw loop for the game
     */
    draw() {
        if (!this.isRunning) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.character.animate();
        this.updateEnemies();
        this.drawWorld();
    }


    /**
     * Updates all enemy animations and movement
     */
    updateEnemies() {
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
    }


    /**
     * Draws all world objects with camera translation
     */
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


    /**
     * Draws UI elements and requests next frame
     */
    drawUI() {
        this.addToMap(this.statusBar);
        this.addToMap(this.energyBar);
        this.addToMap(this.coin);
        if (this.isRunning) {
            this.animationFrame = requestAnimationFrame(() => { this.draw(); });
        }
    }


    /**
     * Adds multiple objects to the map
     * @param {Array} objects - Array of objects to draw
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * Adds a single object to the map with direction handling
     * @param {DrawableObject} mo - Movable object to draw
     */
    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }


    /**
     * Flips image horizontally for opposite direction
     * @param {DrawableObject} mo - Object to flip
     */
    flipImage(mo) {
        this.ctx.save();
        const displayWidth = mo.renderWidth || mo.width;
        this.ctx.translate(displayWidth, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Restores image after flipping
     * @param {DrawableObject} mo - Object to restore
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }


    /**
     * Cleans up all intervals, animations and audio
     */
    cleanup() {
        this.isRunning = false;
        this.stopAnimations();
        this.stopAudio();
        this.resetEnemies();
    }


    /**
     * Stops all animations and intervals
     */
    stopAnimations() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        if (this.intervals) {
            this.intervals.forEach(interval => clearInterval(interval));
            this.intervals = [];
        }
    }


    /**
     * Stops all audio playback
     */
    stopAudio() {
        if (this.BACKGROUND_MUSIC) {
            this.BACKGROUND_MUSIC.pause();
            this.BACKGROUND_MUSIC.currentTime = 0;
        }
        if (this.character.AUDIO_WALK) {
            this.character.AUDIO_WALK.pause();
            this.character.AUDIO_WALK.currentTime = 0;
        }
    }


    /**
     * Resets all enemy states
     */
    resetEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.isAttacking = false;
            enemy.attackCooldown = false;
            enemy.attackStartTime = 0;
        });
    }
}
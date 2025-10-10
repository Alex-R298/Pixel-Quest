/**
 * CharacterActions - Handles all character actions like movement, combat, and climbing
 * Separate file: character-actions.js
 */
class CharacterActions {
    /**
     * Creates a new CharacterActions instance
     * @param {Character} character - Reference to the character
     */
    constructor(character) {
        this.char = character;
    }


    /**
     * Handles all keyboard input
     */
    handleInput() {
        let wasWalking = this.char.isWalking;
        this.char.isWalking = false;
        this.handleJump();
        this.handleWalking(wasWalking);
        this.handleAttack();
        this.climbLadder();
        this.updateCamera();
    }


    /**
     * Handles jump input and execution
     */
    handleJump() {
        if (this.char.world.keyboard.SPACE && !this.char.spaceKeyPressed && !this.char.isAboveGround() && !this.char.isJumping) {
            this.char.AUDIO_JUMP.currentTime = 0;
            this.char.AUDIO_JUMP.volume = sfxVolume;
            this.char.AUDIO_JUMP.play();
            this.char.jump();
            this.char.spaceKeyPressed = true;
        }
        if (!this.char.world.keyboard.SPACE) this.char.spaceKeyPressed = false;
    }


    /**
     * Handles walking input and animation
     * @param {boolean} wasWalking - Previous walking state
     */
    handleWalking(wasWalking) {
        if ((this.char.world.keyboard.D || this.char.world.keyboard.A) && !this.char.isClimbing) {
            this.char.isWalking = true;
            this.char.isAttacking = false;
            this.playWalkSound();
            if (!this.char.isHurt && !wasWalking && this.char.walkingSprite.complete && !this.char.isJumping) {
                this.char.setSprite(this.char.walkingSprite, 6);
            }
            this.handleMovement();
        } else {
            this.stopWalkSound();
        }
    }


    /**
     * Handles left and right movement
     */
    handleMovement() {
        if (this.char.world.keyboard.D && this.char.x < this.char.world.level.level_end_x) {
            this.char.otherDirection = false;
            this.char.moveRight();
            this.char.isClimbing = false;
        }
        if (this.char.world.keyboard.A && this.char.x > 0) {
            this.char.otherDirection = true;
            this.char.moveLeft();
            this.char.isClimbing = false;
        }
    }


    /**
     * Plays walking sound with cooldown
     */
    playWalkSound() {
        const now = Date.now();
        if (now - this.char.walkAudioCooldown > 300) {
            this.char.AUDIO_WALK.currentTime = 0;
            this.char.AUDIO_WALK.volume = sfxVolume;
            this.char.AUDIO_WALK.play();
            this.char.walkAudioCooldown = now;
        }
    }


    /**
     * Stops walking sound
     */
    stopWalkSound() {
        this.char.AUDIO_WALK.pause();
        this.char.AUDIO_WALK.currentTime = 0;
        this.char.walkAudioCooldown = 0;
    }


    /**
     * Handles attack input and execution
     */
    handleAttack() {
        if (this.char.world.keyboard.ENTER && !this.char.enterKeyPressed && !this.char.isAttacking && !this.char.isJumping && !this.char.isClimbing) {
            if (this.char.energyGreen >= 20) {
                this.char.attack();
                this.char.AUDIO_ATTACK.currentTime = 0;
                this.char.AUDIO_ATTACK.volume = sfxVolume;
                this.char.AUDIO_ATTACK.play();
                this.char.enterKeyPressed = true;
                this.char.isWalking = false;
            } else {
                this.char.enterKeyPressed = true;
            }
        }
        if (!this.char.world.keyboard.ENTER) this.char.enterKeyPressed = false;
    }


    /**
     * Gets the attack hitbox based on direction
     * @returns {Object} Hitbox with x, y, width, height properties
     */
    getAttackHitbox() {
        const attackWidth = 50;
        const attackHeight = 60;
        if (this.char.otherDirection) {
            return {
                x: this.char.x - attackWidth,
                y: this.char.y + 10, width: attackWidth, height: attackHeight
            };
        } else {
            return {
                x: this.char.x + this.char.width,
                y: this.char.y + 10, width: attackWidth, height: attackHeight
            };
        }
    }


    /**
     * Checks if attack is hitting a target
     * @param {Object} target - Target object with position and size
     * @returns {boolean} True if attack hits target
     */
    isAttackHitting(target) {
        if (!this.char.isAttacking) return false;
        const attackBox = this.getAttackHitbox();
        return target.x + target.width > attackBox.x &&
               target.x < attackBox.x + attackBox.width &&
               target.y + target.height > attackBox.y &&
               target.y < attackBox.y + attackBox.height;
    }


    /**
     * Updates camera position based on character position
     */
    updateCamera() {
        if (this.char.x > 360 && this.char.x < 2880 - 360) {
            this.char.world.camera_x = -this.char.x + 360;
        }
    }


    /**
     * Handles ladder climbing mechanics
     */
    climbLadder() {
        if (!this.char.world || !this.char.world.level.ladders) {
            this.char.resetRenderSize();
            return;
        }
        for (let ladder of this.char.world.level.ladders) {
            if (this.isOnLadder(ladder)) {
                this.handleClimbing(ladder);
                return;
            }
        }
        this.char.isClimbing = false;
        this.char.resetRenderSize();
    }


    /**
     * Checks if character is on a ladder
     * @param {Object} ladder - Ladder object to check
     * @returns {boolean} True if on ladder
     */
    isOnLadder(ladder) {
        return this.char.x + this.char.width/2 > ladder.x && 
               this.char.x + this.char.width/2 < ladder.x + ladder.width &&
               this.char.y + this.char.height >= ladder.yTop &&
               this.char.y + this.char.height <= ladder.yBottom + 60;
    }


    /**
     * Handles climbing input and animation
     * @param {Object} ladder - Ladder being climbed
     */
    handleClimbing(ladder) {
        if (this.char.world.keyboard.W || this.char.world.keyboard.S) {
            if (!this.char.isClimbing) {
                this.char.isClimbing = true;
                this.char.speedY = 0;
                this.char.isWalking = false;
                if (this.char.climbingSprite.complete) {
                    this.char.setSprite(this.char.climbingSprite, 4);
                    this.char.renderWidth = 60;
                    this.char.renderHeight = 60;
                }
            }
            if (this.char.world.keyboard.W) this.climbUp(ladder);
            if (this.char.world.keyboard.S) this.climbDown(ladder);
        }
    }


    /**
     * Moves character up the ladder
     * @param {Object} ladder - Ladder being climbed
     */
    climbUp(ladder) {
        this.char.y -= 2;
        if (this.char.y + this.char.height <= ladder.yTop) {
            this.char.isClimbing = false;
            this.char.resetRenderSize();
            this.char.y = ladder.yTop - this.char.height;
        }
    }


    /**
     * Moves character down the ladder
     * @param {Object} ladder - Ladder being climbed
     */
    climbDown(ladder) {
        this.char.y += 2;
        if (this.char.y + this.char.height >= ladder.yBottom) {
            this.char.isClimbing = false;
            this.char.resetRenderSize();
        }
    }
}
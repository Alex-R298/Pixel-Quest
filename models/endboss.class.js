// class Endboss extends MovableObject {
//     y;
//     x;
//     width = 80;
//     height = 80;
//      isMoving = false;
//     isWalking = false;
//     isAttacking = false;
//     isHurt = false;
//     isDead = false;
//     walkingSprite = null;
//     idleSprite = null;
//     attackSprite = null;
//     hurtSprite = null;
//     deadSprite = null;
//      leftBoundary = 0;
//     rightBoundary = 0;
//     direction = -1;
//     energy = 250;

//     constructor(x, y) {
//         super(); // ✅ Korrekte super() Verwendung
        
//         // Idle Sprite laden
//         this.idleSprite = new Image();
//         this.idleSprite.src = '../img/Huge mushroom/HugeMushroom_idle.png';
//         this.img = this.idleSprite;

//         // Walking Sprite laden
//         this.walkingSprite = new Image();
//         this.walkingSprite.src = '../img/Huge mushroom/HugeMushroom_walk.png';
//         this.walkingSprite.onload = () => {
//             // Berechne frameWidth für Walking Sprite (6 Frames)
//             this.frameWidth = this.walkingSprite.width / 6;
//             this.frameHeight = this.walkingSprite.height;
//         };

//         this.x = x;
//         this.y = y;
//         this.width = 160;
//         this.height = 160;
//         this.totalFrames = 6; // 6 Frames im Walking Sprite
//         this.speed = 0.15 + Math.random() * 0.25; // Langsamere Geschwindigkeit
//         this.leftBoundary = x - 150;  // 150px links von Start
//         this.rightBoundary = x + 150; // 150px rechts von Start
//         this.direction = -1; // Startet nach links

//         this.attackSprite = new Image();
//         this.attackSprite.src = '../img/Huge mushroom/HugeMushroom_attack2.png';
//         this.attackSprite.onload = () => {
//             // Berechne frameWidth für Attack Sprite (4 Frames)
//             this.frameWidth = this.attackSprite.width / 4;
//             this.frameHeight = this.attackSprite.height;

//             // console.log(`Attack sprite loaded, frameWidth: ${this.frameWidth}`);
//         };

//         this.hurtSprite = new Image();
//         this.hurtSprite.src = '../img/Huge mushroom/HugeMushroom_hurt.png';
//         this.hurtSprite.onload = () => {
//             // Berechne frameWidth für Hurt Sprite (2 Frames)
//             this.frameWidth = this.hurtSprite.width / 4;
//             this.frameHeight = this.hurtSprite.height;
//             console.log(`Hurt sprite loaded, frameWidth: ${this.frameWidth}`);
//         };

//         this.deadSprite = new Image();
//         this.deadSprite.src = '../img/Huge mushroom/HugeMushroom_death.png';
//         this.deadSprite.onload = () => {
//             // Berechne frameWidth für Dead Sprite (1 Frame)
//             this.frameWidth = this.deadSprite.width / 4;
//             this.frameHeight = this.deadSprite.height;
//             console.log(`Dead sprite loaded, frameWidth: ${this.frameWidth}`);
//         };

//     }


//     // ✅ HIER KOMMT DIE NEUE move() METHODE REIN:
//     move() {
//     this.x += this.speed * this.direction;
    
//     // Richtung umkehren bei Grenzen
//     if (this.x <= this.leftBoundary || this.x >= this.rightBoundary) {
//         this.direction *= -1;
//         this.otherDirection = (this.direction === 1);
//         // console.log(`Mushroom turned around at x:${this.x}, new direction:${this.direction}`);
//     }
// }

// deadAnimation() {
//     this.img = this.deadSprite;
//     this.frameWidth = this.deadSprite.width / 4;
//     this.totalFrames = 4;
//     this.currentFrame = 0;
//     this.isMoving = false;
// }

// hurtAnimation() {
//     this.img = this.hurtSprite;
//     this.frameWidth = this.hurtSprite.width / 4;
//     this.totalFrames = 4;
//     this.currentFrame = 0;
// }

// attackEnemy() {
//         if (!this.isAttacking) {
//             this.isAttacking = true;
//             this.img = this.attackSprite;
//             this.frameWidth = this.attackSprite.width / 4;
//             this.frameHeight = this.attackSprite.height;
//             this.totalFrames = 4;
//             this.currentFrame = 0;

//             // Timer um Attack zu beenden
//             setTimeout(() => {
//                 this.isAttacking = false;
//             }, 400); // 4 Frames * 100ms
//             console.log("Attack initiated");
//         }
//     }

//     startWalking() {
//         this.isWalking = true;
//         this.isMoving = true;
//         this.img = this.walkingSprite; // ✅ Wechsle zum Walking Sprite
//         this.currentFrame = 0; // ✅ Starte bei Frame 0
//         // console.log("SmallMushroom started walking at x:", this.x);
//     }

//     stopWalking() {
//         this.isWalking = false;
//         this.isMoving = false;
//     }
// }


class Endboss extends MovableObject {
    y;
    x;
    width = 160;
    height = 160;
    isMoving = false;
    isWalking = false;
    isAttacking = false;
    isHurt = false;
    isDead = false;
    walkingSprite = null;
    idleSprite = null;
    attackSprite = null;
    hurtSprite = null;
    deadSprite = null;
    leftBoundary = 0;
    rightBoundary = 0;
    direction = -1;
    energy = 250;

    constructor(x, y) {
        super();

        // Walking Sprite laden
        this.walkingSprite = new Image();
        this.walkingSprite.src = '../img/Huge mushroom/HugeMushroom_walk.png';
        this.walkingSprite.onload = () => {
            console.log('Endboss walking sprite loaded');
        };

        // Attack Sprite laden
        this.attackSprite = new Image();
        this.attackSprite.src = '../img/Huge mushroom/HugeMushroom_attack2.png';
        this.attackSprite.onload = () => {
            console.log('Endboss attack sprite loaded');
        };

        // Hurt Sprite laden
        this.hurtSprite = new Image();
        this.hurtSprite.src = '../img/Huge mushroom/HugeMushroom_hurt.png';
        this.hurtSprite.onload = () => {
            console.log('Endboss hurt sprite loaded');
        };

        // Dead Sprite laden
        this.deadSprite = new Image();
        this.deadSprite.src = '../img/Huge mushroom/HugeMushroom_death.png';
        this.deadSprite.onload = () => {
            console.log('Endboss dead sprite loaded');
        };

        this.x = x;
        this.y = y;
        this.width = 160;
        this.height = 160;
        this.totalFrames = 4; // Standard für Idle
        this.speed = 0.15 + Math.random() * 0.25;
        this.leftBoundary = x - 150;
        this.rightBoundary = x + 150;
        this.direction = -1;
    }

    animateEnemy() {
        // 1. Death Check
        if (this.energy <= 0 && !this.isDead) {
            if (!this.deadSprite || !this.deadSprite.complete) {
                this.stopWalking();
                console.log("Dead sprite not loaded!");
                return;
            }
            this.isDead = true;
            this.img = this.deadSprite;
            this.frameWidth = this.deadSprite.width / 4;
            this.frameHeight = this.deadSprite.height;
            this.totalFrames = 4;
            this.currentFrame = 0;
            console.log("Endboss is dead");
        }

        // Nur andere Logic wenn nicht tot
        if (!this.isDead) {
            // 2. Attack Check
            if (this.isAttacking && this.attackSprite.complete) {
                this.img = this.attackSprite;
                this.frameWidth = this.attackSprite.width / 4;
                this.frameHeight = this.attackSprite.height;
                this.totalFrames = 4;
            }
            // 3. Hurt Check
            else if (this.isHurt && this.hurtSprite.complete) {
                this.img = this.hurtSprite;
                this.frameWidth = this.hurtSprite.width / 4;
                this.frameHeight = this.hurtSprite.height;
                this.totalFrames = 4;
                console.log("Showing hurt animation");
            }
            // 4. Walking (Standard wenn nichts anderes)
            else {
                if (this.img !== this.walkingSprite) {
                    this.img = this.walkingSprite;
                    this.frameWidth = this.walkingSprite.width / 6;
                    this.frameHeight = this.walkingSprite.height;
                    this.totalFrames = 6;
                    this.currentFrame = 0;
                }
            }
        }

        // 6. Frame Animation läuft IMMER
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime >= this.animationSpeed) {
            if (this.isDead) {
                if (this.currentFrame < this.totalFrames - 1) {
                    this.currentFrame++;
                }
                // Stoppt bei letztem Frame
            } else if (this.isHurt || this.isAttacking) {
                // Hurt/Attack Animation nur einmal abspielen
                if (this.currentFrame < this.totalFrames - 1) {
                    this.currentFrame++;
                } else {
                    // Animation fertig - zurück zu Walking
                    if (this.isHurt) {
                        this.isHurt = false;
                        console.log("Hurt animation finished");
                    }
                    if (this.isAttacking) {
                        this.isAttacking = false;
                    }
                    this.currentFrame = 0;
                }
            } else {
                // Normale Animation (Walking/Idle) - endlos wiederholen
                this.currentFrame++;
                if (this.currentFrame >= this.totalFrames) {
                    this.currentFrame = 0;
                }
            }
            this.lastFrameTime = currentTime;
        }
    }

    move() {
        this.x += this.speed * this.direction;
        
        // Richtung umkehren bei Grenzen
        if (this.x <= this.leftBoundary || this.x >= this.rightBoundary) {
            this.direction *= -1;
            this.otherDirection = (this.direction === 1);
        }
    }

    attackEnemy() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.currentFrame = 0;
            console.log("Endboss attack initiated");
        }
    }

    startWalking() {
        this.isWalking = true;
        this.isMoving = true;
        this.currentFrame = 0;
    }

    stopWalking() {
        this.isWalking = false;
        this.isMoving = false;
    }
}

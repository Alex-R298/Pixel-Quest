// class SmallMushroom extends MovableObject {
//     y;
//     x;
//     width = 80;
//     height = 80;
//      isMoving = false;
//     isWalking = false;
//     isAttacking = false;
//     walkingSprite = null;
//     idleSprite = null;
//     attackSprite = null;
//     hurtSPrite = null;
//     deadSprite = null;
//      leftBoundary = 0;
//     rightBoundary = 0;
//     direction = -1;

//     constructor(x, y) {
//         super(); // ✅ Korrekte super() Verwendung
//         // // Idle Sprite laden
//         // this.idleSprite = new Image();
//         // this.idleSprite.src = '../img/Small_Mushroom/Small_Mushroom_Idle.png';
//         // this.img = this.idleSprite;

//         // Walking Sprite laden
//         this.walkingSprite = new Image();
//         this.walkingSprite.src = '../img/Small_Mushroom/Small_Mushroom_walk.png';
//         this.walkingSprite.onload = () => {
//             // Berechne frameWidth für Walking Sprite (4 Frames)
//             this.frameWidth = this.walkingSprite.width / 4;
//             this.frameHeight = this.walkingSprite.height;
//             // console.log(`Walking sprite loaded, frameWidth: ${this.frameWidth}`);
//         };


//         this.x = x;
//         this.y = y;
//         this.width = 80;
//         this.height = 80;
//         this.totalFrames = 4; // 4 Frames im Walking Sprite
//         this.speed = 0.15 + Math.random() * 0.25; // Langsamere Geschwindigkeit
//     // ✅ HIER KOMMT DEIN NEUER CODE REIN:
//         this.leftBoundary = x - 60;  // 60px links von Start
//         this.rightBoundary = x + 60; // 60px rechts von Start
//         this.direction = -1; // Startet nach links

//         this.attackSprite = new Image();
//         this.attackSprite.src = '../img/Small_Mushroom/Small_Mushroom_attack.png';
//         this.attackSprite.onload = () => {
//             // Berechne frameWidth für Attack Sprite (6 Frames)
//             this.frameWidth = this.attackSprite.width / 4;
//             this.frameHeight = this.attackSprite.height;
//             // console.log(`Attack sprite loaded, frameWidth: ${this.frameWidth}`);

//             this.hurtSprite = new Image();
//             this.hurtSprite.src = '../img/Small_Mushroom/Small_Mushroom_hurt.png';
//             this.hurtSprite.onload = () => {
//                 // Berechne frameWidth für Hurt Sprite (4 Frames)
//                 this.frameWidth = this.hurtSprite.width / 4;
//                 this.frameHeight = this.hurtSprite.height;
//                 // console.log(`Hurt sprite loaded, frameWidth: ${this.frameWidth}`);
//             };

//             this.deadSprite = new Image();
//             this.deadSprite.src = '../img/Small_Mushroom/Small_Mushroom_death.png';
//             this.deadSprite.onload = () => {
//                 // Berechne frameWidth für Dead Sprite (4 Frames)
//                 this.frameWidth = this.deadSprite.width / 4;
//                 this.frameHeight = this.deadSprite.height;
//                 // console.log(`Dead sprite loaded, frameWidth: ${this.frameWidth}`);
//             };
//         };
        
//         // console.log(`Mushroom created at x:${x}, boundaries: ${this.leftBoundary} - ${this.rightBoundary}`);
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

//     attackEnemy() {
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
//         // console.log("SmallMushroom stopped walking at x:", this.x);
//     }
// }

class SmallMushroom extends MovableObject {
    y;
    x;
    width = 80;
    height = 80;
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
    energy = 100;
    hitboxOffset = { x: 20, y: 10, width: -15, height: -10 };

    constructor(x, y) {
        super();
        this.hasDealtDamage = false;
        // Walking Sprite laden
        this.walkingSprite = new Image();
        this.walkingSprite.src = '../img/Small_Mushroom/Small_Mushroom_walk.png';
        this.walkingSprite.onload = () => {
            console.log('SmallMushroom walking sprite loaded');
        };

        // Attack Sprite laden
        this.attackSprite = new Image();
        this.attackSprite.src = '../img/Small_Mushroom/Small_Mushroom_attack.png';
        this.attackSprite.onload = () => {
            console.log('SmallMushroom attack sprite loaded');
        };

        // Hurt Sprite laden
        this.hurtSprite = new Image();
        this.hurtSprite.src = '../img/Small_Mushroom/Small_Mushroom_hurt.png';
        this.hurtSprite.onload = () => {
            console.log('SmallMushroom hurt sprite loaded');
        };

        // Dead Sprite laden
        this.deadSprite = new Image();
        this.deadSprite.src = '../img/Small_Mushroom/Small_Mushroom_death.png';
        this.deadSprite.onload = () => {
            console.log('SmallMushroom dead sprite loaded');
        };

        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.totalFrames = 4;
        this.speed = 0.15 + Math.random() * 0.25;
        this.leftBoundary = x - 60;
        this.rightBoundary = x + 60;
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
        this.isMoving = false;
        this.isWalking = false;
        this.img = this.deadSprite;
        this.frameWidth = this.deadSprite.width / 4;
        this.frameHeight = this.deadSprite.height;
        this.totalFrames = 4;
        this.currentFrame = 0;
        console.log("SmallMushroom is dead");
    }

    // Nur andere Logic wenn nicht tot
    if (!this.isDead) {
        // 2. Hurt Check - HÖCHSTE PRIORITÄT
        if (this.isHurt && this.hurtSprite.complete) {
            this.img = this.hurtSprite;
            this.frameWidth = this.hurtSprite.width / 4;
            this.frameHeight = this.hurtSprite.height;
            this.totalFrames = 4;
            console.log("Showing hurt animation");
        }
        // 3. Attack Check
        else if (this.isAttacking && this.attackSprite.complete) {
            this.img = this.attackSprite;
            this.frameWidth = this.attackSprite.width / 4;
            this.frameHeight = this.attackSprite.height;
            this.totalFrames = 4;
        }
        // 4. Walking (Standard wenn nichts anderes)
        else {
            if (this.img !== this.walkingSprite) {
                this.img = this.walkingSprite;
                this.frameWidth = this.walkingSprite.width / 4;
                this.frameHeight = this.walkingSprite.height;
                this.totalFrames = 4;
                this.currentFrame = 0;
            }
        }
    }

    // 5. Frame Animation läuft IMMER
    const currentTime = Date.now();
    if (currentTime - this.lastFrameTime >= this.animationSpeed) {
        if (this.isDead) {
            if (this.currentFrame < this.totalFrames - 1) {
                this.currentFrame++;
            }
        } else if (this.isHurt || this.isAttacking) {
            // Hurt/Attack Animation nur einmal abspielen
            if (this.currentFrame < this.totalFrames - 1) {
                this.currentFrame++;
            } else {
                // Animation fertig
                if (this.isHurt) {
                    this.isHurt = false;
                    this.startWalking(); // ✅ Zurück zum Laufen
                    console.log("Hurt animation finished");
                }
                if (this.isAttacking) {
                    this.isAttacking = false;
                }
                this.currentFrame = 0;
            }
        } else {
            // Normale Animation (Walking) - endlos wiederholen
            this.currentFrame++;
            if (this.currentFrame >= this.totalFrames) {
                this.currentFrame = 0;
            }
        }
        this.lastFrameTime = currentTime;
    }
}

    move() {
        // ✅ NUR bewegen wenn nicht tot
        if (!this.isDead) {
            this.x += this.speed * this.direction;
            
            // Richtung umkehren bei Grenzen
            if (this.x <= this.leftBoundary || this.x >= this.rightBoundary) {
                this.direction *= -1;
                this.otherDirection = (this.direction === 1);
            }
        }
    }

    takeDamage(damage) {
    if (this.isDead) return; // Kein Schaden wenn schon tot
    
    this.energy -= damage;
    this.isHurt = true;
    this.currentFrame = 0; // Animation von vorne starten
    
    console.log("SmallMushroom took damage:", damage, "Energy:", this.energy);
    
    // ✅ WICHTIG: Stoppe die Bewegung während hurt
    this.stopWalking();
}

    attackEnemy() {
        if (!this.isAttacking && !this.isDead) { // ✅ Nicht attackieren wenn tot
            this.isAttacking = true;
            this.currentFrame = 0;
            console.log("SmallMushroom attack initiated");
        }
    }

    startWalking() {
        if (!this.isDead) { // ✅ Nicht laufen wenn tot
            this.isWalking = true;
            this.isMoving = true;
            this.currentFrame = 0;
        }
    }

    stopWalking() {
        this.isWalking = false;
        this.isMoving = false;
    }
}
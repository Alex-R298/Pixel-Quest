class SmallMushroom extends MovableObject {
    y;
    x;
    width = 80;
    height = 80;
     isMoving = false;
    isWalking = false;
    isAttacking = false;
    walkingSprite = null;
    idleSprite = null;
    attackSprite = null;
     leftBoundary = 0;
    rightBoundary = 0;
    direction = -1;

    constructor(x, y) {
        super(); // ✅ Korrekte super() Verwendung
        
        // // Idle Sprite laden
        // this.idleSprite = new Image();
        // this.idleSprite.src = '../img/Small_Mushroom/Small_Mushroom_Idle.png';
        // this.img = this.idleSprite;

        // Walking Sprite laden
        this.walkingSprite = new Image();
        this.walkingSprite.src = '../img/Small_Mushroom/Small_Mushroom_walk.png';
        this.walkingSprite.onload = () => {
            // Berechne frameWidth für Walking Sprite (4 Frames)
            this.frameWidth = this.walkingSprite.width / 4;
            this.frameHeight = this.walkingSprite.height;
            // console.log(`Walking sprite loaded, frameWidth: ${this.frameWidth}`);
        };


        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.totalFrames = 4; // 4 Frames im Walking Sprite
        this.speed = 0.15 + Math.random() * 0.25; // Langsamere Geschwindigkeit
    // ✅ HIER KOMMT DEIN NEUER CODE REIN:
        this.leftBoundary = x - 60;  // 60px links von Start
        this.rightBoundary = x + 60; // 60px rechts von Start
        this.direction = -1; // Startet nach links

        this.attackSprite = new Image();
        this.attackSprite.src = '../img/Small_Mushroom/Small_Mushroom_attack.png';
        this.attackSprite.onload = () => {
            // Berechne frameWidth für Attack Sprite (6 Frames)
            this.frameWidth = this.attackSprite.width / 4;
            this.frameHeight = this.attackSprite.height;
            // console.log(`Attack sprite loaded, frameWidth: ${this.frameWidth}`);
        };
        
        // console.log(`Mushroom created at x:${x}, boundaries: ${this.leftBoundary} - ${this.rightBoundary}`);
    }

    // ✅ HIER KOMMT DIE NEUE move() METHODE REIN:
    move() {
    this.x += this.speed * this.direction;
    
    // Richtung umkehren bei Grenzen
    if (this.x <= this.leftBoundary || this.x >= this.rightBoundary) {
        this.direction *= -1;
        this.otherDirection = (this.direction === 1);
        // console.log(`Mushroom turned around at x:${this.x}, new direction:${this.direction}`);
    }
} 

    attackEnemy() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.img = this.attackSprite;
            this.frameWidth = this.attackSprite.width / 4;
            this.frameHeight = this.attackSprite.height;
            this.totalFrames = 4;
            this.currentFrame = 0;

            // Timer um Attack zu beenden
            setTimeout(() => {
                this.isAttacking = false;
            }, 400); // 4 Frames * 100ms
            console.log("Attack initiated");
        }
    }

    startWalking() {
        this.isWalking = true;
        this.isMoving = true;
        this.img = this.walkingSprite; // ✅ Wechsle zum Walking Sprite
        this.currentFrame = 0; // ✅ Starte bei Frame 0
        // console.log("SmallMushroom started walking at x:", this.x);
    }

    stopWalking() {
        this.isWalking = false;
        this.isMoving = false;
        // console.log("SmallMushroom stopped walking at x:", this.x);
    }
}

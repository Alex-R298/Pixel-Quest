class Endboss extends MovableObject {
    y;
    x;
    width = 80;
    height = 80;
     isMoving = false;
    isWalking = false;
    walkingSprite = null;
    idleSprite = null;
     leftBoundary = 0;
    rightBoundary = 0;
    direction = -1;

    constructor(x, y) {
        super(); // ✅ Korrekte super() Verwendung
        
        // Idle Sprite laden
        this.idleSprite = new Image();
        this.idleSprite.src = '../img/Huge mushroom/HugeMushroom_idle.png';
        this.img = this.idleSprite;

        // Walking Sprite laden
        this.walkingSprite = new Image();
        this.walkingSprite.src = '../img/Huge mushroom/HugeMushroom_walk.png';
        this.walkingSprite.onload = () => {
            // Berechne frameWidth für Walking Sprite (6 Frames)
            this.frameWidth = this.walkingSprite.width / 6;
            this.frameHeight = this.walkingSprite.height;
        };

        this.x = x;
        this.y = y;
        this.width = 160;
        this.height = 160;
        this.totalFrames = 6; // 6 Frames im Walking Sprite
        this.speed = 0.15 + Math.random() * 0.25; // Langsamere Geschwindigkeit
        this.leftBoundary = x - 150;  // 150px links von Start
        this.rightBoundary = x + 150; // 150px rechts von Start
        this.direction = -1; // Startet nach links
    }

    // ✅ HIER KOMMT DIE NEUE move() METHODE REIN:
    move() {
    this.x += this.speed * this.direction;
    
    // Richtung umkehren bei Grenzen
    if (this.x <= this.leftBoundary || this.x >= this.rightBoundary) {
        this.direction *= -1;
        this.otherDirection = (this.direction === 1);
        console.log(`Mushroom turned around at x:${this.x}, new direction:${this.direction}`);
    }
}

    startWalking() {
        this.isWalking = true;
        this.isMoving = true;
        this.img = this.walkingSprite; // ✅ Wechsle zum Walking Sprite
        this.currentFrame = 0; // ✅ Starte bei Frame 0
        console.log("SmallMushroom started walking at x:", this.x);
    }

    stopWalking() {
        this.isWalking = false;
        this.isMoving = false;
        this.img = this.idleSprite; // Zurück zum Idle Sprite
        this.currentFrame = 0;
    }
}


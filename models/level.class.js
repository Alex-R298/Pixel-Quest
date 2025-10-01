class Level {
    enemies;
    clouds;
    collectibleItems;
    backgroundObjects;
    level_end_x = 2830;

    constructor(enemies, clouds, collectibleItems, backgroundObjects) {  // ✅ Reihenfolge wie in level1.js
        this.enemies = enemies;
        this.clouds = clouds;
        this.collectibleItems = collectibleItems;  // ✅ Jetzt richtig zugeordnet
        this.backgroundObjects = backgroundObjects;
    }
}
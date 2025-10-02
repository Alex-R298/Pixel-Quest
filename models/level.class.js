class Level {
    enemies;
    clouds;
    collectibleItems;
    backgroundObjects;
    platforms = []; // Neue Eigenschaft für Plattformen
    ladders = []; // Neue Eigenschaft für Leitern
    level_end_x = 2830;
    groundY = 600  // Kein Boden mehr - nur Platforms!

    constructor(enemies, clouds, collectibleItems, backgroundObjects, platforms, ladders) {  // ✅ Reihenfolge wie in level1.js
        this.enemies = enemies;
        this.clouds = clouds;
        this.collectibleItems = collectibleItems;  // ✅ Jetzt richtig zugeordnet
        this.backgroundObjects = backgroundObjects;
        this.platforms = platforms;  // Plattformen initialisieren
        this.ladders = ladders;  // Leitern initialisieren
    }
}
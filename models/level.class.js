class Level {
    enemies;
    clouds;
    collectibleItems;
    backgroundObjects;
    platforms = [];
    ladders = [];
    level_end_x = 2830;
    groundY = 600;


    /**
     * Creates a new Level instance
     * @param {Array} enemies - Array of enemy objects
     * @param {Array} clouds - Array of cloud objects
     * @param {Array} collectibleItems - Array of collectible item objects
     * @param {Array} backgroundObjects - Array of background objects
     * @param {Array} platforms - Array of platform objects
     * @param {Array} ladders - Array of ladder objects
     */
    constructor(enemies, clouds, collectibleItems, backgroundObjects, platforms, ladders) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.collectibleItems = collectibleItems;
        this.backgroundObjects = backgroundObjects;
        this.platforms = platforms;
        this.ladders = ladders;
    }
}
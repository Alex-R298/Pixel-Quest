class World {
    character = new Character();
    enemies = [
        new SmallMushroom(200, 160), 
        new SmallMushroom(300, 340), 
        new SmallMushroom(460, 160)
    ];

    clouds = [
        new Cloud('../img/Shape2/cloud_shape2_2.png', 100),
        new Cloud('../img/Shape2/cloud_shape2_1.png' , 300),
        new Cloud('../img/Shape2/cloud_shape2_3.png', 500)
    ];
    backgroundObjects = [
        new BackgroundObject('../img/Background/Layers/8.png', 0),
        new BackgroundObject('../img/Background/Layers/7.png', 0),
        new BackgroundObject('../img/Background/Layers/6.png', 0),
        new BackgroundObject('../img/Background/Layers/5.png', 0),
        new BackgroundObject('../img/Background/Layers/4.png', 0),
        new BackgroundObject('../img/Background/Layers/3.png', 0),
        new BackgroundObject('../img/Background/Layers/2.png', 0),
        new BackgroundObject('../img/Background/Layers/1.png', 0),
        new BackgroundObject('../img/Tiles/Back_Prefab_5.png', 400, 320, 200),
        new BackgroundObject('../img/Tiles/Back_Prefab_1.png', 80, 260, 200),
        new BackgroundObject('../img/Tiles/Back_Prefab_3.png', 300, 200, 50),
        new BackgroundObject('../img/Tiles/Back_Prefab_2.png', 550, 200, 300),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_02.png', 0, 60, 60),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_02.png', 60, 60, 60),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_03.png', 120, 60, 60),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_01.png', 300, 60, 60),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_02.png', 360, 60, 60),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_03.png', 420, 60, 60),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_11.png', 470, 60, 60),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_11.png', 470, 60, 60, 360),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_11.png', 470, 60, 60, 300),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_01.png', 420, 60, 60, 240),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_02.png', 480, 65, 60, 240),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_33.png', 540, 60, 60, 240),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_02.png', 600, 60, 60, 240),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_02.png', 660, 60, 60, 240),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_28.png', 540, 60, 60, 300),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_16.png', 600, 60, 60, 300),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_16.png', 660, 60, 60, 300),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_08.png', 660, 60, 60, 390),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_08.png', 660, 60, 60,),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_08.png', 660, 60, 60, 330),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_01.png', 120, 60, 60, 240),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_02.png', 180, 60, 60, 240),
        new BackgroundObject('../img/Tiles/Tileset/TileSet_03.png', 240, 60, 60, 240),
    ];

    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.startEnemyMovement();
        this.draw();
    }

    startEnemyMovement() {
        this.enemies.forEach(enemy => {
            if (enemy.startWalking) {
                enemy.startWalking(); // Falls du die startWalking() Methode hast
            } else {
                // Fallback: Einfache kontinuierliche Bewegung
                enemy.isMoving = true;
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
        
        this.character.animate();
        this.enemies.forEach(enemy => {
            // Bewegung (Position ändern)
            if (enemy.isMoving || enemy.isWalking) {
                enemy.move(); // Bewege nach links
                enemy.animate();
            }
        });
        
        // RICHTIGE REIHENFOLGE (von hinten nach vorne):
        
        // 1. Background Objects (ganz hinten)
        this.addObjectsToMap(this.backgroundObjects);
        
        // 2. Clouds (Hintergrund-Wolken)
        this.addObjectsToMap(this.clouds);
        
        // 3. Character (Spielfigur)
        this.addObjectsToMap([this.character]);
        
        // 4. Enemies (Gegner - vorne)
        this.addObjectsToMap(this.enemies);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.img && mo.img.complete && mo.frameWidth > 0) {
            // Animierte Objekte mit Sprite Sheet
            const sourceX = mo.currentFrame * mo.frameWidth;
            const sourceY = 0;
            this.ctx.drawImage(
                mo.img, 
                sourceX, sourceY, mo.frameWidth, mo.frameHeight, 
                mo.x, mo.y, mo.width, mo.height
            );
        } else if (mo.img && mo.img.complete) {
            // Statische Objekte
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
    }
}

// class CollectibleItem extends DrawableObject {
//     coinSprite = null;
//     currentFrame = 0;
//     IMAGES_FOOD = [
//         '../img/img/Objects/Food/Cake.png'
//     ];

//     constructor(x, y) {  // ✅ Parameter nicht vergessen!
//         super();
//         this.x = x;
//         this.y = y;
//         this.width = 40;
//         this.height = 40;
//         this.collectible = true;

//         this.coinSprite = new Image();
//         this.coinSprite.src = '../img/Objects_Animated/Coin.png';
//         this.coinSprite.onload = () => {
//             this.img = this.coinSprite;
//             this.frameWidth = this.coinSprite.width / 8;
//             this.frameHeight = this.coinSprite.height;
//             this.totalFrames = 8;
//         };



//         this.animate();  // ✅ Animation starten
//     }



//     animate() {
//         setInterval(() => {
//             this.currentFrame++;
//             if (this.currentFrame >= this.totalFrames) {
//                 this.currentFrame = 0; // Zurück zum ersten Frame
//             }
//         }, 100);
//     }
// }

class CollectibleItem extends DrawableObject {
    currentFrame = 0;
    type = 'coin'; // 'coin' oder 'food'
    value = 1; // Wie viel es wert ist
    healAmount = 0; // Wie viel es heilt (nur für Food)
    
    // Alle möglichen Sprites
    COIN_SPRITE = '../img/Objects_Animated/Coin.png';
    FOOD_SPRITES = [
        '../img/Objects/Food/Cake.png',
        '../img/Objects/Food/Cake2.png',
        '../img/Objects/Food/Cherry.png',
        '../img/Objects/Food/Chicken.png',
        '../img/Objects/Food/Cookies.png',
        '../img/Objects/Food/Croissant.png',
        '../img/Objects/Food/Donut.png',
        '../img/Objects/Food/Fish.png',
        '../img/Objects/Food/Hamburger.png',
        '../img/Objects/Food/Meat.png',
        '../img/Objects/Food/Pizza.png',
        '../img/Objects/Food/Radish.png',
        '../img/Objects/Food/Squash.png',
        '../img/Objects/Food/Strawberry.png',
        '../img/Objects/Food/Tomato.png'
    ];
    COIN_SOUND = new Audio('./audio/coin.mp3' , 'coin');
    FOOD_SOUND = new Audio('./audio/food.mp3', 'food');

    constructor(x, y, type = 'coin') {
        super();
        this.x = x;
        this.y = y;
        this.type = type;
        this.collectible = true;
        this.COIN_SOUND.volume = 0.05;
        this.FOOD_SOUND.volume = 0.05;

        if (type === 'coin') {
            this.setupCoin();
        } else if (type === 'food') {
            this.setupFood();
        }
    }

    setupCoin() {
        this.width = 40;
        this.height = 40;
        this.value = 1; // 1 Münze
        
        const coinSprite = new Image();
        coinSprite.src = this.COIN_SPRITE;
        coinSprite.onload = () => {
            this.img = coinSprite;
            this.frameWidth = coinSprite.width / 8;
            this.frameHeight = coinSprite.height;
            this.totalFrames = 8;
            this.animate(); // Animation starten
        };
    }

   setupFood() {
        this.width = 20;
        this.height = 20;
        this.healAmount = 10; // Heilt 10 Energie
        this.originalY = this.y;
        this.bounceSpeed = 0.05; // Geschwindigkeit
        this.bounceHeight = 6; // Wie hoch es hüpft
        this.bounceTime = Math.random() * Math.PI * 2; // Zufälliger Startpunkt
        this.animateBounce(); // Bounce starten
        // Zufälliges Essen auswählen
        const randomFood = this.FOOD_SPRITES[Math.floor(Math.random() * this.FOOD_SPRITES.length)];
        
        const foodSprite = new Image();
        foodSprite.src = randomFood;
        foodSprite.onload = () => {
            this.img = foodSprite;
            // Food hat keine Animation (statisches Bild)
            this.totalFrames = 1;
            this.frameWidth = foodSprite.width;
            this.frameHeight = foodSprite.height;
        };
        

    }

    animate() {
        // Nur Münzen animieren, Food bleibt statisch
        if (this.type === 'coin') {
            setInterval(() => {
                this.currentFrame++;
                if (this.currentFrame >= this.totalFrames) {
                    this.currentFrame = 0;
                }
            }, 100);
        }
    }

    // ✅ Neue Bounce-Animation für Food
    animateBounce() {
        if (this.type === 'food') {
            setInterval(() => {
                // Sanftes Auf und Ab mit Sinus-Welle
                this.bounceTime += this.bounceSpeed;
                this.y = this.originalY - Math.abs(Math.sin(this.bounceTime)) * this.bounceHeight;
            }, 1000 / 60); // 60 FPS
        }
    }


    onCollect(character) {
        if (this.type === 'coin') {
            this.COIN_SOUND.play();
            console.log("Coin collected! +1");
            // Sound abspielen, Partikel-Effekt, etc.
        } else if (this.type === 'food') {
            this.FOOD_SOUND.play();
            character.energyGreen = Math.min(character.energyGreen + this.healAmount, 100);
            console.log(`Food collected! Healed ${this.healAmount} HP`);
        }
    }
}


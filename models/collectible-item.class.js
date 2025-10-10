class CollectibleItem extends DrawableObject {
    currentFrame = 0;
    type = 'coin';
    value = 1;
    healAmount = 0;
    
    COIN_SPRITE = 'img/Objects_Animated/Coin.png';
    FOOD_SPRITES = [
        'img/Objects/Food/Cake.png',
        'img/Objects/Food/Cake2.png',
        'img/Objects/Food/Cherry.png',
        'img/Objects/Food/Chicken.png',
        'img/Objects/Food/Cookies.png',
        'img/Objects/Food/Croissant.png',
        'img/Objects/Food/Donut.png',
        'img/Objects/Food/Fish.png',
        'img/Objects/Food/Hamburger.png',
        'img/Objects/Food/Meat.png',
        'img/Objects/Food/Pizza.png',
        'img/Objects/Food/Radish.png',
        'img/Objects/Food/Squash.png',
        'img/Objects/Food/Strawberry.png',
        'img/Objects/Food/Tomato.png'
    ];
    COIN_SOUND = new Audio('audio/coin.mp3', 'coin');
    FOOD_SOUND = new Audio('audio/food.mp3', 'food');


    /**
     * Creates a new CollectibleItem instance
     * @param {number} x - X coordinate position
     * @param {number} y - Y coordinate position
     * @param {string} [type='coin'] - Type of collectible ('coin' or 'food')
     */
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


    /**
     * Sets up coin properties and animation
     */
    setupCoin() {
        this.width = 40;
        this.height = 40;
        this.value = 1;
        const coinSprite = new Image();
        coinSprite.src = this.COIN_SPRITE;
        coinSprite.onload = () => {
            this.img = coinSprite;
            this.frameWidth = coinSprite.width / 8;
            this.frameHeight = coinSprite.height;
            this.totalFrames = 8;
            this.animate();
        };
    }


    /**
     * Sets up food properties and bounce animation
     */
    setupFood() {
        this.width = 20;
        this.height = 20;
        this.healAmount = 10;
        this.originalY = this.y;
        this.bounceSpeed = 0.05;
        this.bounceHeight = 6;
        this.bounceTime = Math.random() * Math.PI * 2;
        this.animateBounce();
        const randomFood = this.FOOD_SPRITES[Math.floor(Math.random() * this.FOOD_SPRITES.length)];
        const foodSprite = new Image();
        foodSprite.src = randomFood;
        foodSprite.onload = () => {
            this.img = foodSprite;
            this.totalFrames = 1;
            this.frameWidth = foodSprite.width;
            this.frameHeight = foodSprite.height;
        };
    }


    /**
     * Animates coin sprite frames
     */
    animate() {
        if (this.type === 'coin') {
            setInterval(() => {
                this.currentFrame++;
                if (this.currentFrame >= this.totalFrames) {
                    this.currentFrame = 0;
                }
            }, 100);
        }
    }


    /**
     * Animates bouncing effect for food items
     */
    animateBounce() {
        if (this.type === 'food') {
            setInterval(() => {
                this.bounceTime += this.bounceSpeed;
                this.y = this.originalY - Math.abs(Math.sin(this.bounceTime)) * this.bounceHeight;
            }, 1000 / 60);
        }
    }


    /**
     * Handles item collection effects
     * @param {Character} character - The character collecting the item
     */
    onCollect(character) {
        if (this.type === 'coin') {
            this.COIN_SOUND.play();
            this.COIN_SOUND.volume = sfxVolume;
        } else if (this.type === 'food') {
            this.FOOD_SOUND.play();
            this.FOOD_SOUND.volume = sfxVolume;
            character.energyGreen = Math.min(character.energyGreen + this.healAmount, 100);
        }
    }
}


class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 0;
    y = 0;
    height = 70;
    width = 70;
    currentFrame = 0;
    totalFrames = 4;
    frameWidth = 0;
    frameHeight = 0;
    animationSpeed = 100;
    lastFrameTime = 0;


    /**
     * Loads an image and calculates frame dimensions
     * @param {string} path - Path to the image file
     */
    loadImage(path) {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            this.frameWidth = img.width / this.totalFrames;
            this.frameHeight = img.height;
        };
        this.img = img;
    }


    /**
     * Draws the object on the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        if (this.img && this.img.complete && this.frameWidth > 0) {
            const sourceX = this.currentFrame * this.frameWidth;
            const sourceY = 0;
            const renderW = this.renderWidth || this.width;
            const renderH = this.renderHeight || this.height;
            ctx.drawImage(this.img, sourceX, sourceY, this.frameWidth, this.frameHeight, this.x, this.y, renderW, renderH);
        } else if (this.img && this.img.complete) {
            const renderW = this.renderWidth || this.width;
            const renderH = this.renderHeight || this.height;
            ctx.drawImage(this.img, this.x, this.y, renderW, renderH);
        }
    }


    /**
     * Draws a status bar
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    drawStatusBar(ctx) {
        if (this.img && this.img.complete) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }


    /**
     * Draws an energy bar
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    drawEnergyBar(ctx) {
        if (this.img && this.img.complete) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }


    /**
     * Draws a platform, showing invisible ones only in debug mode
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    drawPlatform(ctx) {
        if (this.invisible) {
            if (window.debugMode) {
                ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
                ctx.lineWidth = 2;
                ctx.strokeRect(this.x, this.y, this.width, this.height);
            }
        } else if (this.img && this.img.complete) {
            super.draw(ctx);
        }
    }


    /**
     * Loads multiple images into cache
     * @param {string[]} arr - Array of image paths
     */
    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws hitbox frame for debugging
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Endboss || this instanceof SmallMushroom) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            const offset = this.hitboxOffset || { x: 0, y: 0, width: 0, height: 0 };
            ctx.rect(
                this.x + offset.x, 
                this.y + offset.y, 
                this.width + offset.width, 
                this.height + offset.height
            );
            ctx.stroke();
        }
    }
}
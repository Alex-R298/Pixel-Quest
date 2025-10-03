class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 0;
    y = 0;
    height = 70;
    width = 70;
    currentFrame = 0;
    totalFrames = 4; // Anzahl der Frames im Sprite Sheet
    frameWidth = 0;  // Wird berechnet wenn Bild lädt
    frameHeight = 0; // Wird berechnet wenn Bild lädt
    animationSpeed = 100; // Millisekunden zwischen Frames
    lastFrameTime = 0;


    loadImage(path) {
        // ✅ Speichere Image-Referenz in lokaler Variable
        const img = new Image();
        img.src = path;
        img.onload = () => {
            // ✅ Nutze die lokale img Variable, nicht this.img
            this.frameWidth = img.width / this.totalFrames;
            this.frameHeight = img.height;
        };
        this.img = img; // Setze this.img erst nach der onload Definition
    }


    // draw(ctx) {
    //     if (this.img && this.img.complete && this.frameWidth > 0) {
    //         // Animierte Objekte mit Sprite Sheet
    //         const sourceX = this.currentFrame * this.frameWidth;
    //         const sourceY = 0;
    //         ctx.drawImage(this.img, sourceX, sourceY, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
    //     } else if (this.img && this.img.complete) {
    //         // Statische Objekte
    //         ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //     }
    // }

    draw(ctx) {
    if (this.img && this.img.complete && this.frameWidth > 0) {
        const sourceX = this.currentFrame * this.frameWidth;
        const sourceY = 0;
        const renderW = this.renderWidth || this.width;   // ← Diese Zeile
        const renderH = this.renderHeight || this.height; // ← Diese Zeile
        ctx.drawImage(this.img, sourceX, sourceY, this.frameWidth, this.frameHeight, this.x, this.y, renderW, renderH);
    } else if (this.img && this.img.complete) {
        const renderW = this.renderWidth || this.width;   // ← Diese Zeile
        const renderH = this.renderHeight || this.height; // ← Diese Zeile
        ctx.drawImage(this.img, this.x, this.y, renderW, renderH);
    }
}


    drawStatusBar(ctx) {
        if (this.img && this.img.complete) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    drawEnergyBar(ctx) {
        if (this.img && this.img.complete) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }


     drawPlatform(ctx) {
        // Unsichtbare Plattformen nur im Debug-Modus zeigen
        if (this.invisible) {
            if (window.debugMode) {
                ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
                ctx.lineWidth = 2;
                ctx.strokeRect(this.x, this.y, this.width, this.height);
            }
            // Sonst nichts zeichnen
        } else if (this.img && this.img.complete) {
            // Nur wenn Bild vorhanden und geladen
            super.draw(ctx);
        }
    }
    
    // Override drawFrame damit keine roten Rahmen gezeichnet werden
    drawFrame(ctx) {
        // Nichts tun - Platforms brauchen keine Debug-Frames
    }


    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            img.onload = () => {
            };
            this.imageCache[path] = img;
        });
    }

//     drawFrame(ctx) {
//     if (this instanceof Character || this instanceof Endboss || this instanceof SmallMushroom) {
//         ctx.beginPath();
//         ctx.lineWidth = '5';
//         ctx.strokeStyle = 'red';
//         ctx.rect(this.x, this.y, this.width, this.height);
//         ctx.stroke();
//     }
// } 

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
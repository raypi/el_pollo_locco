/**
 * Base class for all drawable objects in the game.
 * Provides functionality for loading, caching, and drawing images.
 */
class DrawableObject { 
    x = 100;
    y = 280;
    height = 150;
    width = 100; 
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads a single image from the specified path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path){
        this.img = new Image(); 
        this.img.src = path;
    }

    /**
     * Draws the object's image on the specified context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images and caches them for quick access.
     * @param {Array<string>} arr - Array of image paths to load and cache.
     */
    loadImages(arr){
        arr.forEach((path) => {
           let img = new Image();
           img.src = path;
           this.imageCache[path] = img;
        });   
    }
}

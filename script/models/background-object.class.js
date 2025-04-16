/**
 * Represents a background object in the game.
 * Extends MovableObject with background-specific properties and behaviors.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    
    /**
     * Creates a new BackgroundObject instance.
     * @param {string} imagaPath - The path to the background image.
     * @param {number} x - The x-coordinate of the background object.
     */
    constructor(imagaPath, x) {
        super().loadImage(imagaPath);
        this.y = 480 - this.height;
        this.x = x;
    }
}

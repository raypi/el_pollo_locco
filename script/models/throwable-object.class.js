/**
 * Represents a throwable object in the game, such as a bottle.
 * Extends MovableObject with throwing mechanics and animations.
 */
class ThrowableObject extends MovableObject {
    /**
     * Static counter for the number of bottles available to throw.
     * @type {number}
     */
    static countBottle = 0;
    
    /**
     * Creates a new ThrowableObject instance.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     */
    constructor(x, y) {
      super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
      this.loadImages(Bottles.IMAGES_BOTTLES_ROTATION);
      this.loadImages(Bottles.IMAGES_BOTTLES_SPLASH);
      this.x = x; this.y = y;
      this.height = 60; this.width = 50;
      this.rotationInterval = null; this.isThrown = false;
      this.speedY = 0;
    }
    
    /**
     * Applies gravity to the thrown object, increasing its downward speed.
     */
    throwGravity() {
      if (this.isThrown) {
        this.speedY += this.acceleration;
        this.y += this.speedY;
      }
    }
    
    /**
     * Throws the object in a high arc trajectory.
     */
    throwHigh() {
      if (this.isThrown) return;
      this.isThrown = true; this.animateRotation();
      this.speedY = -18; this.speedX = 10;
      let moveInterval = setInterval(() => { this.x += this.speedX; this.throwGravity(); if (!this.isAboveGrund()) { clearInterval(moveInterval); this.splashBottle(); } }, 25);
    }
    
    /**
     * Throws the object in a horizontal trajectory.
     */
    throwHorizontal() {
      if (this.isThrown) return;
      this.isThrown = true; this.animateRotation();
      this.speedY = 0; this.speedX = 15;
      let moveInterval = setInterval(() => { this.x += this.speedX; this.throwGravity(); if (!this.isAboveGrund()) { clearInterval(moveInterval); this.splashBottle(); } }, 25);
    }
    
    /**
     * Animates the rotation of the object while it's in the air.
     */
    animateRotation() {
      let i = 0;
      this.rotationInterval = setInterval(() => { this.loadImage(Bottles.IMAGES_BOTTLES_ROTATION[i]); i = (i + 1) % Bottles.IMAGES_BOTTLES_ROTATION.length; }, 100);
    }
    
    /**
     * Plays the splash animation when the object hits the ground and marks it for removal.
     */
    splashBottle() {
      clearInterval(this.rotationInterval);
      let i = 0;
      let splashInterval = setInterval(() => { this.loadImage(Bottles.IMAGES_BOTTLES_SPLASH[i]); i++; if (i >= Bottles.IMAGES_BOTTLES_SPLASH.length) { clearInterval(splashInterval); setTimeout(() => { this.removeFromWorld = true; }, 100); } }, 100);
    }
  }

/**
 * Represents a bottle object.
 * @extends DrawableObject
 */
class Bottles extends DrawableObject {
    /**
     * Array of images for the bottle on ground.
     * @type {string[]}
     */
    IMAGES_BOTTLES_GRUND = [
      'assets/img/6_salsa_bottle/salsa_bottle.png',
      'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
      'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
  
    /**
     * Array of images for the bottle rotation animation.
     * @type {string[]}
     */
    static IMAGES_BOTTLES_ROTATION = [
      'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
      'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
      'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
      'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
  
    /**
     * Array of images for the bottle splash animation.
     * @type {string[]}
     */
    static IMAGES_BOTTLES_SPLASH = [
      'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
      'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
      'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
      'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
      'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
      'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
  
    /**
     * Creates an instance of Bottles.
     * @param {number} x - The x-coordinate of the bottle.
     * @param {number} y - The y-coordinate of the bottle.
     */
    constructor(x, y) {
      super();
      this.loadImage(this.IMAGES_BOTTLES_GRUND[0]);
      this.x = x;
      this.y = y;
    }
  }
  


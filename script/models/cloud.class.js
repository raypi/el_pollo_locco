/**
 * Represents a cloud object that moves left.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /**
   * The y-coordinate of the cloud.
   * @type {number}
   */
    y = 20;  
    /**
   * The height of the cloud.
   * @type {number}
   */
    height = 250;
    /**
   * The width of the cloud.
   * @type {number}
   */
    width = 500;
    /**
   * The horizontal speed of the cloud.
   * @type {number}
   */
    speed = 0.15;

     /**
   * Creates a new Cloud instance, loads its image, sets an initial x-coordinate,
   * and starts the animation.
   */
    constructor(){
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }
  /**
   * Starts the cloud's animation by moving it to the left.
   */
    animate() {
        this.moveLeft();
    }
}
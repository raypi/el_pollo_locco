/**
 * Represents a small chicken enemy in the game.
 * Extends MovableObject with small chicken-specific properties and behaviors.
 */
class SmalChicken extends MovableObject {
    width = 40;
    height = 40;
    y = 380;
    alive = true;
    state = "alive";

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Array of image paths for the death animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    
    /**
     * Creates a new SmalChicken instance.
     * Initializes position, speed, and starts animation.
     */
    constructor(){
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random() * 2300;
        this.speed = 0.15 + Math.random() + 0.25;
        this.animate();
    }
   
    /**
     * Starts the small chicken's movement and animation.
     * Handles both alive and death states.
     */
    animate(){
        this.moveLeft();
        this.animationInterval = setInterval(() => {
            if (this.alive) {
                let index = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[index];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                clearInterval(this.animationInterval);
                this.loadImage(this.IMAGES_DEAD[0]);
            }
        }, 200);    
    }

    /**
     * Triggers the death animation for the small chicken.
     * Sets the chicken as dead and schedules its removal.
     */
    deadAnimation() {
        this.alive = false;
        this.state = "dead";
                
        setTimeout(() => {
            this.isDead = true;
        }, 1000);
    }
}

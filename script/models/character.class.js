/**
 * Represents the main character (Pepe) in the game.
 * Extends MovableObject with character-specific properties and behaviors.
 */
class Character extends MovableObject {
    
    height = 280;
    x = 100;
    y = 150; 
    speed = 5;
    lastMoveTime = Date.now();
    longIdle = false; 
    world;
    state = "alive"

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array of image paths for the jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Array of image paths for the death animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Array of image paths for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Array of image paths for the idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
     * Array of image paths for the long idle animation.
     * @type {string[]}
     */
    IMAGES_LONGIDLE = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Creates a new Character instance.
     * @param {Function} gameOverCallback - Callback function to be called when the character dies.
     */
    constructor(gameOverCallback){
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        this.gameOverCallback = gameOverCallback; 
    }

    /**
     * Starts the character's animation cycles.
     */
    animate() {
        this.startMovementAnimation();
        this.startFrameAnimation();
    }
      
    /**
     * Starts the movement animation interval.
     */
    startMovementAnimation() {
        setInterval(() => {
            this.processRightMovement();
            this.processLeftMovement();
            this.processJumpMovement();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }
      
    /**
     * Processes right movement when the right key is pressed.
     */
    processRightMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.lastMoveTime = Date.now();
            this.longIdle = false;
        }
    }
      
    /**
     * Processes left movement when the left key is pressed.
     */
    processLeftMovement() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
            this.lastMoveTime = Date.now();
            this.longIdle = false;
        }
    }
      
    /**
     * Processes jump movement when the space key is pressed.
     */
    processJumpMovement() {
        if (this.world.keyboard.SPACE && !this.isAboveGrund()) {
            this.jump();
            this.lastMoveTime = Date.now();
            this.longIdle = false;
        }
    }
      
    /**
     * Starts the frame animation interval for character states.
     */
    startFrameAnimation() {
        setInterval(() => {
            if (this.isDead() || this.isHurt() || this.isAboveGrund()) {
                if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
                else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
                else this.playAnimation(this.IMAGES_JUMPING);
            } else {
                this.animateIdleOrWalking();
            }
        }, 100);
    }
      
    /**
     * Animates the character in idle or walking state based on keyboard input.
     */
    animateIdleOrWalking() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            const timeSince = Date.now() - this.lastMoveTime;
            if (timeSince < 50) this.loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
            else this.checkIdle();
        }
    }
      
    /**
     * Checks if the character should be in idle or long idle state based on time since last movement.
     */
    checkIdle() {
        const now = Date.now();
        const timeSinceLastMove = now - this.lastMoveTime;
    
        if (timeSinceLastMove > 5000) { 
            this.playAnimation(this.IMAGES_LONGIDLE);
            this.longIdle = true;
        } else if (timeSinceLastMove > 200 && !this.longIdle) { 
            this.playAnimation(this.IMAGES_IDLE);
        }
    }     

    /**
     * Handles the character's death, plays death animation, and triggers game over callback.
     */
    dieCharacter() {
        this.state = "dead"; 
        this.playAnimation(this.IMAGES_DEAD);
        this.deathTimeoutId = setTimeout(() => {
            if (this.world && this.world.stopGame) {
                this.world.stopGame(); 
            }
            if (this.gameOverCallback && typeof this.gameOverCallback === 'function') {
                this.gameOverCallback('character');
            }
        }, 2000);
    }
}

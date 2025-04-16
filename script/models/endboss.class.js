/**
 * Represents the end boss enemy in the game.
 * Extends MovableObject with boss-specific properties and behaviors.
 */
class Endboss extends MovableObject {
    width = 300;
    height = 300;
    y = 150;
    energyBoss = 100;
    currentAnimationFrame = 0;
    contact = false;
    lasthitBoss = Date.now();
    state = "alive";
    lastAnimationTime = Date.now();
    deathX = null;
  
    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
      'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
      'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
      'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
      'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Array of image paths for the alert animation.
     * @type {string[]}
     */
    IMAGES_ALERT = [
      'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Array of image paths for the attack animation.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
      'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Array of image paths for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
      'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
      'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
      'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Array of image paths for the death animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
      'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
      'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
      'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
      'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
      'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
      'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
  
    /**
     * Creates a new Endboss instance.
     * @param {Function} gameOverCallback - Optional callback function that is called when the boss dies.
     * The callback is called with the parameter 'endboss' to indicate that the player has defeated the boss.
     */
    constructor(gameOverCallback) {
      super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ALERT);
      this.loadImages(this.IMAGES_ATTACK);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 2550; 
      this.speed = 0.15 + Math.random() + 0.25;
      this.gameOverCallback = gameOverCallback;
    }
  
    /**
     * Starts the boss animation cycle.
     */
    startAnimation() {
      this.animationInterval = setInterval(() => {
        if (this.state !== "alive") { this.startDeathAnimation(); return; }
        this.runAliveAnimationFrame();
      }, 100);
    }
    
    /**
     * Starts the death animation sequence.
     */
    startDeathAnimation() {
      clearInterval(this.animationInterval);
      const frameCount = this.IMAGES_DEAD.length, delay = 3000 / frameCount;
      let deathFrame = 0;
      let deathInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_DEAD); deathFrame++;
        if (deathFrame >= frameCount) {
          clearInterval(deathInterval); this.state = "finished";
          if (typeof world !== 'undefined' && world.stopGame) world.stopGame();
          if (this.gameOverCallback && typeof this.gameOverCallback === 'function')
            this.gameOverCallback('endboss');
        }
      }, delay);
    }
    
    /**
     * Runs a single frame of animation when the boss is alive.
     */
    runAliveAnimationFrame() {
      if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
      else if ((this.currentAnimationFrame % 60) < 15) this.playAnimation(this.IMAGES_ALERT);
      else if ((this.currentAnimationFrame % 60) < 30) this.playAnimation(this.IMAGES_ATTACK);
      else { this.playAnimation(this.IMAGES_WALKING); this.moveLeftBoss(); }
      this.currentAnimationFrame++;
    }
    
    /**
     * Reduces the boss's energy when hit and updates the status bar.
     */
    hitBoss() {
      this.energyBoss -= 33;
      if (this.energyBoss < 0) this.energyBoss = 0;
      if (typeof world !== "undefined" && world.endbossBar) {
        world.endbossBar.setPercentage(this.energyBoss);
      }
      this.lasthitBoss = Date.now();
      if (this.energyBoss <= 20) {
        this.dieBoss();
      }
    }
  
    /**
     * Triggers the boss death state.
     */
    dieBoss() {
      this.state = "dead";
      this.deathX = this.x;
    }
  
    /**
     * Moves the boss to the left if it's alive.
     */
    moveLeftBoss() {
      if (this.state !== "alive" || this.deathX !== null) return;
      this.x -= 2;
    }
  
    /**
     * Handles the first contact with the player.
     * Sets up the boss bar and starts the animation.
     */
    firstContact() {
      if (!this.contact && typeof world !== "undefined" && world.character.x > 2200) {
        this.contact = true;
        world.contactBossBar = true;
        this.startAnimation();
        world.endbossBar = new StatusBar("Endboss");
        world.endbossBar.x = 470;
        world.endbossBar.y = 20;
      }
    }
  
    /**
     * Checks if the boss is currently in the hurt state.
     * @returns {boolean} True if the boss is hurt, false otherwise.
     */
    isHurt() {
      return (Date.now() - this.lasthitBoss) / 1000 < 1;
    }
  }

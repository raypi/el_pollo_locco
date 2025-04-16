/**
 * Represents a status bar in the game for displaying various metrics.
 * Extends DrawableObject with status bar specific functionality.
 */
class StatusBar extends DrawableObject {
    /**
     * The type of status bar (Health, Coin, Bottle, Endboss).
     * @type {string}
     */
    type;
    
    /**
     * The current percentage value of the status bar.
     * @type {number}
     */
    percentage = 100;
    
    /**
     * Array of image paths for the health status bar at different percentage levels.
     * @type {string[]}
     */
    IMAGES_HEALTH = [
      'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
      'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
      'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
      'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
      'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
      'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
    
    /**
     * Array of image paths for the coin status bar at different percentage levels.
     * @type {string[]}
     */
    IMAGES_COIN = [
      'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
      'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
      'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
      'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
      'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
      'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    
    /**
     * Array of image paths for the bottle status bar at different percentage levels.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
      'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
      'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
      'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
      'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
      'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
      'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    
    /**
     * Array of image paths for the endboss status bar at different percentage levels.
     * @type {string[]}
     */
    IMAGES_ENDBOSS = [
      'assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
      'assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
      'assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
      'assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
      'assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
      'assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];
    
    /**
     * Creates a new StatusBar instance of the specified type.
     * @param {string} type - The type of status bar ('Health', 'Coin', 'Bottle', or 'Endboss').
     */
    constructor(type) {
      super();
      this.type = type; this.x = 0; this.y = 0; this.width = 200; this.height = 50;
      if (this.type === 'Health') { this.loadImages(this.IMAGES_HEALTH); this.setPercentage(101); }
      else if (this.type === 'Coin') { this.loadImages(this.IMAGES_COIN); this.setPercentage(1); }
      else if (this.type === 'Bottle') { this.loadImages(this.IMAGES_BOTTLE); this.setPercentage(1); }
      else if (this.type === 'Endboss') { this.loadImages(this.IMAGES_ENDBOSS); this.setPercentage(101); }
    }
    
    /**
     * Sets the percentage value of the status bar and updates the displayed image.
     * @param {number} percentage - The percentage value to set (0-100).
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      let path;
      if (this.type === 'Health') { path = this.IMAGES_HEALTH[this.resolveImageIndex()]; }
      else if (this.type === 'Coin') { path = this.IMAGES_COIN[this.resolveImageIndex()]; }
      else if (this.type === 'Bottle') { path = this.IMAGES_BOTTLE[this.resolveImageIndex()]; }
      else if (this.type === 'Endboss') { path = this.IMAGES_ENDBOSS[this.resolveImageIndex()]; }
      this.img = this.imageCache[path];
    }
    
    /**
     * Determines which image to display based on the current percentage value.
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex() {
      if (this.percentage >= 100) return 5;
      else if (this.percentage > 80) return 4;
      else if (this.percentage > 60) return 3;
      else if (this.percentage > 40) return 2;
      else if (this.percentage > 20) return 1;
      else return 0;
    }
  }

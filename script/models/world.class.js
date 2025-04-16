/**
 * Represents the game world that contains and manages all game objects and interactions.
 */
class World {
    character = new Character();
    level = level001;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    countOpponents = 0;
    statusBar = new StatusBar('Health');
    coinBar = new StatusBar('Coin');
    bottleBar = new StatusBar('Bottle');
    endbossBar;
    throwableObjects = [];
    bottle = new Bottles();
    coins = new Coins();
  
    /**
     * Creates a new World instance.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the world on.
     * @param {Object} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
      this.ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.contactBossBar = false;
      this.stopped = false;
      this.controlLeftImg = new Image(); this.controlLeftImg.src = 'assets/button/arrowleft.png';
      this.controlUpImg = new Image(); this.controlUpImg.src = 'assets/button/arrowup.png';
      this.controlRightImg = new Image(); this.controlRightImg.src = 'assets/button/arrowright.png';
      this.character = new Character(resultType => { screenManager.showGameOverScreen(resultType); });
      this.setWorld();
      this.character.animate();
      this.draw();
      this.run();
    }
  
    /**
     * Sets up the world reference in the character.
     */
    setWorld() {
      this.character.world = this;
      this.character.keyboard = this.keyboard;
    }
  
    /**
     * Starts the game loops for different update frequencies.
     */
    run() {
      this.fastIntervalId = setInterval(() => {
        this.checkJumpChickenCollisions(); this.checkSmalChicken(); this.chickenBottle();
      }, 1000/60);
      this.slowIntervalId = setInterval(() => {
        this.checkThrowObjects(); this.collectingCoins(); this.collectingBottles(); this.checkChickenCollisions();
        this.checkEndbossCollisions(); this.endbossBottle(); this.level.endboss.forEach(boss => boss.firstContact());
      }, 200);
    }
  
    /**
     * Stops the game by calling stopGame method.
     */
    stop() { this.stopGame(); }
  
    /**
     * Creates and throws a bottle in the specified direction.
     * @param {string} type - The type of throw ('M' for high throw, 'N' for horizontal throw).
     */
    throwBottle(type) {
      if (ThrowableObject.countBottle > 0) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        type === 'M' ? bottle.throwHigh() : bottle.throwHorizontal();
        this.throwableObjects.push(bottle);
        ThrowableObject.countBottle--;
        this.bottleBar.setPercentage(Math.max(this.bottleBar.percentage - 20, 0));
      }
    }
  
    /**
     * Checks if the player is trying to throw objects and handles the throw.
     */
    checkThrowObjects() {
      if (this.keyboard.M) this.throwBottle('M');
      if (this.keyboard.N) this.throwBottle('N');
    }
  
    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisions() {
      this.level.enemies.forEach(enemy => { 
        if (this.character.isColliding(enemy)) { 
          this.character.hit(); 
          this.statusBar.setPercentage(this.character.energy); 
        } 
      });
    }
  
    /**
     * Main draw function that renders all game elements.
     */
    draw() {
      if (this.stopped) return;
      this.filterThrowableObjects();
      this.clearCanvas();
      this.drawBackground();
      this.drawStatusBars();
      this.drawWorldObjects();
      this.resetCamera();
      this.animationFrameId = requestAnimationFrame(() => { this.draw(); });
    }

    /**
     * Filters out throwable objects that should be removed from the world.
     */
    filterThrowableObjects() { this.throwableObjects = this.throwableObjects.filter(bottle => !bottle.removeFromWorld); }
    
    /**
     * Clears the canvas for the next frame.
     */
    clearCanvas() { this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); }
    
    /**
     * Draws the background objects with camera translation.
     */
    drawBackground() {
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObject);
      this.ctx.translate(-this.camera_x, 0);
    }
    
    /**
     * Draws all status bars.
     */
    drawStatusBars() {
      this.statusBar.y = 0; this.addToMap(this.statusBar);
      this.coinBar.y = 40; this.addToMap(this.coinBar);
      this.bottleBar.y = 80; this.addToMap(this.bottleBar);
      if (this.contactBossBar) this.addToMap(this.endbossBar);
    }
    
    /**
     * Draws all world objects with camera translation.
     */
    drawWorldObjects() {
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.clouds);
      this.level.enemies = this.level.enemies.filter(enemy => !enemy.removeFromWorld);
      this.addObjectsToMap(this.level.enemies);
      this.level.smalChicken = this.level.smalChicken.filter(chicken => !chicken.removeFromWorld);
      this.addObjectsToMap(this.level.smalChicken);
      this.addObjectsToMap(this.level.endboss);
      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.throwableObjects);
      this.addToMap(this.character);
    }
    
    /**
     * Resets the camera translation.
     */
    resetCamera() { this.ctx.translate(-this.camera_x, 0); }
  
    /**
     * Stops all game loops, animations, and timeouts.
     */
    stopGame() {
      this.stopped = true;
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      if (this.fastIntervalId) clearInterval(this.fastIntervalId);
      if (this.slowIntervalId) clearInterval(this.slowIntervalId);
      if (this.character && this.character.deathTimeoutId) { clearTimeout(this.character.deathTimeoutId); this.character.deathTimeoutId = null; }
      if (this.level) {
        if (this.level.enemies) this.level.enemies.forEach(e => { if (e.removeTimeout) clearTimeout(e.removeTimeout); });
        if (this.level.smalChicken) this.level.smalChicken.forEach(c => { if (c.removeTimeout) clearTimeout(c.removeTimeout); });
        if (this.level.endboss) this.level.endboss.forEach(b => { if (b.animationInterval) clearInterval(b.animationInterval); });
      }
    }
  
    /**
     * Adds an array of objects to the map.
     * @param {Array} objects - The array of objects to add to the map.
     */
    addObjectsToMap(objects) {
      if (!objects || objects.length === 0) return;
      objects.forEach(o => { this.addToMap(o); });
    }
  
    /**
     * Adds a single object to the map, handling direction flipping if needed.
     * @param {Object} mo - The movable object to add to the map.
     */
    addToMap(mo) {
      if (mo.otherDirection) this.flipImage(mo);
      mo.draw(this.ctx);
      if (mo.otherDirection) this.flipImageBack(mo);
    }
  
    /**
     * Flips the image horizontally for objects facing left.
     * @param {Object} mo - The movable object to flip.
     */
    flipImage(mo) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = -mo.x;
    }
    
    /**
     * Restores the original image orientation after flipping.
     * @param {Object} mo - The movable object to restore.
     */
    flipImageBack(mo) { mo.x = -mo.x; this.ctx.restore(); }
  
    /**
     * Handles coin collection by the character.
     */
    collectingCoins() {
      this.level.coins = this.level.coins.filter(coin => {
        if (this.character.isColliding(coin)) {
          AudioHub.stopOneSound(AudioHub.COINBARCOLLECT);
          AudioHub.playOneSound(AudioHub.COINBARCOLLECT);
          this.coinBar.setPercentage(Math.min(this.coinBar.percentage + 20, 100));
          return false;
        }
        return true;
      });
    }
  
    /**
     * Handles bottle collection by the character.
     */
    collectingBottles() {
      this.level.bottles = this.level.bottles.filter(bottle => {
        if (this.character.isColliding(bottle)) {
          AudioHub.stopOneSound(AudioHub.COINBARCOLLECT);
          AudioHub.playOneSound(AudioHub.COINBARCOLLECT);
          this.bottleBar.setPercentage(Math.min(this.bottleBar.percentage + 20, 100));
          ThrowableObject.countBottle++;
          return false;
        }
        return true;
      });
    }
  
    /**
     * Checks collisions with small chickens and handles different interaction scenarios.
     */
    checkSmalChicken() {
      this.level.smalChicken.forEach(small => {
        if (this.character.isColliding(small) && this.character.y < 149 && this.character.speedY < 0) {
          AudioHub.stopOneSound(AudioHub.CHICKENHIT); AudioHub.playOneSound(AudioHub.CHICKENHIT);
          small.alive = false; small.state = "dead"; small.deadAnimation();
          small.removeTimeout = setTimeout(() => { small.removeFromWorld = true; }, 1000);
        } else if (this.throwableObjects.length > 0 && this.throwableObjects[0].isColliding(small)) {
          AudioHub.stopOneSound(AudioHub.CHICKENHIT); AudioHub.playOneSound(AudioHub.CHICKENHIT);
          small.deadAnimation();
          small.removeTimeout = setTimeout(() => { small.removeFromWorld = true; }, 1000);
        } else if (this.character.y == 151 && small.alive && this.character.isColliding(small)) {
          this.character.hit(); this.statusBar.setPercentage(this.character.energy);
        }
      });
    }
  
    /**
     * Checks collisions with regular chickens when the character is walking.
     */
    checkChickenCollisions() {
      if (this.character.y == 151) {
        this.level.enemies.forEach(enemy => { 
          if (enemy.alive && this.character.isColliding(enemy)) { 
            this.character.hit(); 
            this.statusBar.setPercentage(this.character.energy); 
          } 
        });
      }
    }
  
    /**
     * Checks collisions with regular chickens when the character is jumping on them.
     */
    checkJumpChickenCollisions() {
      this.level.enemies.forEach(enemy => { 
        if (this.character.isColliding(enemy) && this.character.y < 149 && this.character.speedY < 0) { 
          AudioHub.stopOneSound(AudioHub.CHICKENHIT); AudioHub.playOneSound(AudioHub.CHICKENHIT);
          enemy.alive = false; enemy.state = "dead"; 
          enemy.removeTimeout = setTimeout(() => { enemy.removeFromWorld = true; }, 1000);
        } 
      });
    }
  
    /**
     * Checks if thrown bottles hit regular chickens.
     */
    chickenBottle() {
      this.level.enemies.forEach(enemy => { 
        if (this.throwableObjects.length > 0) { 
          let bottle = this.throwableObjects[0]; 
          if (bottle.isColliding(enemy)) { 
            AudioHub.stopOneSound(AudioHub.CHICKENHIT); AudioHub.playOneSound(AudioHub.CHICKENHIT);
            enemy.alive = false; enemy.state = "dead"; 
            enemy.removeTimeout = setTimeout(() => { enemy.removeFromWorld = true; }, 1000);
          } 
        } 
      });
    }
  
    /**
     * Checks collisions between the character and the end boss.
     */
    checkEndbossCollisions() {
      this.level.endboss.forEach(endboss => { 
        if (this.character.isColliding(endboss)) { 
          this.character.hit(); 
          this.statusBar.setPercentage(this.character.energy); 
        } 
      });
    }
  
    /**
     * Checks if thrown bottles hit the end boss.
     */
    endbossBottle() {
      this.throwableObjects = this.throwableObjects.filter(bottle => {
        if (bottle.removeFromWorld) return false;
        for (let endboss of this.level.endboss) {
          if (bottle.isColliding(endboss)) {
            AudioHub.stopOneSound(AudioHub.CHICKENHIT);
            AudioHub.playOneSound(AudioHub.CHICKENHIT);
            endboss.hitBoss();
            return false;
          }
        }
        return true;
      });
    }
  }

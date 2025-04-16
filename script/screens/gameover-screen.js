/**
 * Represents the game over screen shown when the player wins or loses.
 */
class GameOverScreen {
    /**
     * Creates a new GameOverScreen instance.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the screen on.
     * @param {string} type - The type of game over ('endboss' for win, 'character' for loss).
     * @param {Function} restartGameCallback - Callback function for the "New Game" button.
     * @param {Function} exitGameCallback - Callback function for the "Menu" button.
     */
    constructor(canvas, type, restartGameCallback, exitGameCallback) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.restartGameCallback = restartGameCallback;
      this.exitGameCallback = exitGameCallback;
      this.type = type;
      this.gameOverImage = new Image();
      if (this.type === 'endboss') this.gameOverImage.src = 'assets/img/9_intro_outro_screens/win/win_1.png';
      else if (this.type === 'character') this.gameOverImage.src = 'assets/img/9_intro_outro_screens/game_over/you lost.png';
      else this.gameOverImage.src = 'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png';
      this.gameOverImage.onload = () => { this.draw(); };
      this.buttons = [
        { label: 'Neues Spiel', action: () => this.restartGameCallback() },
        { label: 'Menü', action: () => { AudioHub.stopOneSound(AudioHub.GAMEMUSIC); this.exitGameCallback(); } }
      ];
    }
    
    /**
     * Draws the complete game over screen.
     */
    draw() {
      this.drawBackground();
      this.drawGameOverImage();
      this.drawButtons();
    }
    
    /**
     * Draws the background of the game over screen.
     */
    drawBackground() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Draws the game over image (win or lose).
     */
    drawGameOverImage() {
      const imgW = 300, imgH = 100, imgX = (this.canvas.width - imgW) / 2, imgY = this.canvas.height / 3 - imgH / 2;
      this.ctx.drawImage(this.gameOverImage, imgX, imgY, imgW, imgH);
    }
    
    /**
     * Draws a single button.
     * @param {Object} b - The button object.
     * @param {number} i - The index of the button.
     */
    drawButton(b, i) {
      const bw = 200, bh = 50, x = (this.canvas.width - bw) / 2, y = this.canvas.height / 2 + 100 + i * (bh + 20);
      this.ctx.fillStyle = 'rgba(255,255,255,0.8)'; this.ctx.fillRect(x, y, bw, bh);
      this.ctx.fillStyle = 'black'; this.ctx.fillText(b.label, x + bw / 2, y + bh / 2 + 10);
      b.x = x; b.y = y; b.width = bw; b.height = bh;
    }
    
    /**
     * Draws all buttons on the game over screen.
     */
    drawButtons() {
      this.ctx.font = '18px Sixtyfour, sans-serif'; this.ctx.textAlign = 'center';
      this.buttons.forEach((b, i) => this.drawButton(b, i));
    }
    
    /**
     * Converts client coordinates to canvas coordinates, accounting for scaling.
     * @param {number} cx - The client X coordinate.
     * @param {number} cy - The client Y coordinate.
     * @returns {Object} The scaled coordinates.
     */
    getScaledCoordinates(cx, cy) {
      const r = this.canvas.getBoundingClientRect(), scaleX = this.canvas.width / r.width, scaleY = this.canvas.height / r.height;
      return { x: (cx - r.left) * scaleX, y: (cy - r.top) * scaleY };
    }
    
    /**
     * Handles click events on the game over screen.
     * @param {MouseEvent} e - The click event.
     */
    handleClick(e) {
      const { x, y } = this.getScaledCoordinates(e.clientX, e.clientY);
      this.buttons.forEach(b => { if (x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height) b.action(); });
    }
    
    /**
     * Handles touch start events on the game over screen.
     * @param {TouchEvent} e - The touch start event.
     */
    handleTouchStart(e) {
      e.preventDefault();
      const t = e.changedTouches[0], { x, y } = this.getScaledCoordinates(t.clientX, t.clientY);
      let clicked = false;
      this.buttons.forEach(b => { if (x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height) { clicked = true; b.action(); } });
      if (!clicked) this.handleClick({ clientX: t.clientX, clientY: t.clientY });
    }
    
    /**
     * Handles touch end events on the game over screen.
     * @param {TouchEvent} e - The touch end event.
     */
    handleTouchEnd(e) {
      e.preventDefault();
      const t = e.changedTouches[0], { x, y } = this.getScaledCoordinates(t.clientX, t.clientY);
      let clicked = false;
      this.buttons.forEach(b => { if (x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height) { clicked = true; b.action(); } });
      if (!clicked) this.handleClick({ clientX: t.clientX, clientY: t.clientY });
    }
    
    /**
     * Adds event listeners for mouse and touch events.
     */
    addEventListeners() {
      this.boundHandleClick = this.handleClick.bind(this);
      this.boundHandleTouchStart = this.handleTouchStart.bind(this);
      this.boundHandleTouchEnd = this.handleTouchEnd.bind(this);
      this.canvas.style.touchAction = 'none';
      this.canvas.addEventListener('click', this.boundHandleClick);
      this.canvas.addEventListener('touchstart', this.boundHandleTouchStart, { passive: false });
      this.canvas.addEventListener('touchend', this.boundHandleTouchEnd, { passive: false });
    }
    
    /**
     * Removes event listeners for mouse and touch events.
     */
    removeEventListeners() {
      if (this.boundHandleClick) this.canvas.removeEventListener('click', this.boundHandleClick);
      if (this.boundHandleTouchStart) this.canvas.removeEventListener('touchstart', this.boundHandleTouchStart);
      if (this.boundHandleTouchEnd) this.canvas.removeEventListener('touchend', this.boundHandleTouchEnd);
      this.canvas.onclick = null;
    }
  }

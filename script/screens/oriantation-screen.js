/**
 * Represents the orientation screen shown when the device is in portrait mode.
 * Prompts the user to rotate their device to landscape mode.
 */
class OrientationScreen {
  /**
   * Creates a new OrientationScreen instance.
   * @param {HTMLCanvasElement} canvas - The canvas element to render the screen on.
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.boundHandleClick = this.handleClick.bind(this);
    this.boundHandleTouchStart = this.handleTouchStart.bind(this);
    this.addEventListeners();
  }

  /**
   * Draws the orientation screen with instructions to rotate the device.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = '24px Sixtyfour, sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    const line1 = "Bitte drehen Sie";
    const line2 = "Ihr Gerät in den";
    const line3 = "Landscape-Modus";
    const lineHeight = 30;
    const totalHeight = lineHeight * 3;
    const startY = (this.canvas.height / 2) - (totalHeight / 2) + (lineHeight / 2);
    this.ctx.fillText(line1, this.canvas.width / 2, startY);
    this.ctx.fillText(line2, this.canvas.width / 2, startY + lineHeight);
    this.ctx.fillText(line3, this.canvas.width / 2, startY + 2 * lineHeight);
  }
  
  /**
   * Handles click events on the orientation screen.
   * @param {MouseEvent} event - The click event.
   */
  handleClick(event) {
    // Empty implementation - no action needed for clicks on this screen
  }
  
  /**
   * Handles touch start events on the orientation screen.
   * @param {TouchEvent} event - The touch start event.
   */
  handleTouchStart(event) {
    // Empty implementation - no action needed for touches on this screen
  }
  
  /**
   * Adds event listeners for mouse and touch events.
   */
  addEventListeners() {
    this.canvas.addEventListener('click', this.boundHandleClick);
    this.canvas.addEventListener('touchstart', this.boundHandleTouchStart);
  }
  
  /**
   * Removes event listeners for mouse and touch events.
   */
  removeEventListeners() {
    this.canvas.removeEventListener('click', this.boundHandleClick);
    this.canvas.removeEventListener('touchstart', this.boundHandleTouchStart);
  }
}

/**
 * Represents the impressum (imprint) screen that displays legal information.
 */
class ImpressumScreen {
  /**
   * Creates a new ImpressumScreen instance.
   * @param {HTMLCanvasElement} canvas - The canvas element to render the screen on.
   * @param {Function} exitGameCallback - Callback function for the "Menu" button.
   */
  constructor(canvas, exitGameCallback) {
    this.canvas = canvas; 
    this.ctx = canvas.getContext('2d'); 
    this.exitGameCallback = exitGameCallback;
    this.buttons = [{ 
      label: 'Menü', 
      width: 200, 
      height: 50, 
      action: () => { 
        this.removeEventListeners(); 
        if (typeof this.exitGameCallback === 'function') this.exitGameCallback(); 
      } 
    }];
    this.hoveredButton = null; 
    this.boundHandleMouseMove = this.handleMouseMove.bind(this); 
    this.boundHandleClick = this.handleClick.bind(this);
    this.addEventListeners();
  }
  
  /**
   * Shows the impressum screen.
   */
  show() { 
    this.draw(); 
  }
  
  /**
   * Draws the impressum text content.
   */
  drawText() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = '20px Arial'; 
    this.ctx.textAlign = 'center'; 
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("Impressum:", this.canvas.width / 2, 50);
    this.ctx.font = '16px Arial';
    const txt = [
      "Angaben gemäß § 5 TMG:", 
      "Ray Don", 
      "Am Yachthaven 1", 
      "18950 Rostock", 
      "", 
      "Kontakt:", 
      "Telefon: 0177559880", 
      "E-Mail: ray@developing-sailor.com"
    ];
    txt.forEach((l, i) => this.ctx.fillText(l, this.canvas.width / 2, 100 + i * 25));
  }
  
  /**
   * Draws a single button.
   * @param {Object} b - The button object.
   * @param {number} i - The index of the button.
   */
  drawButton(b, i) {
    b.x = (this.canvas.width - 240) / 2; 
    b.y = this.canvas.height - 100; 
    b.width = 240; 
    b.height = 60;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; 
    this.ctx.fillRect(b.x, b.y, b.width, b.height);
    this.ctx.strokeStyle = 'white'; 
    this.ctx.lineWidth = 2; 
    this.ctx.strokeRect(b.x, b.y, b.width, b.height);
    this.ctx.fillStyle = (this.hoveredButton === i) ? 'yellow' : 'white'; 
    this.ctx.textAlign = 'center'; 
    this.ctx.font = '24px Arial';
    this.ctx.fillText(b.label, b.x + b.width / 2, b.y + b.height / 2 + 8);
  }
  
  /**
   * Draws all buttons on the impressum screen.
   */
  drawButtons() { 
    this.buttons.forEach((b, i) => this.drawButton(b, i)); 
  }
  
  /**
   * Draws the complete impressum screen.
   */
  draw() { 
    this.drawText(); 
    this.drawButtons(); 
  }
  
  /**
   * Handles mouse movement events to detect button hover.
   * @param {MouseEvent} e - The mouse move event.
   */
  handleMouseMove(e) {
    const r = this.canvas.getBoundingClientRect(), 
      x = e.clientX - r.left, 
      y = e.clientY - r.top;
    this.hoveredButton = null; 
    this.buttons.forEach((b, i) => { 
      if (x > b.x && x < b.x + b.width && y > b.y && y < b.y + b.height) 
        this.hoveredButton = i; 
    });
    this.draw();
  }
  
  /**
   * Handles click events on the impressum screen.
   * @param {MouseEvent} e - The click event.
   */
  handleClick(e) {
    const r = this.canvas.getBoundingClientRect(), 
      x = e.clientX - r.left, 
      y = e.clientY - r.top;
    this.buttons.forEach(b => { 
      if (x > b.x && x < b.x + b.width && y > b.y && y < b.y + b.height) 
        if (typeof b.action === 'function') b.action(); 
    });
  }
  
  /**
   * Handles touch start events on the impressum screen.
   * @param {TouchEvent} e - The touch start event.
   */
  handleTouchStart(e) {
    e.preventDefault();
    const t = e.changedTouches[0], 
      r = this.canvas.getBoundingClientRect(),
      sX = this.canvas.width / r.width, 
      sY = this.canvas.height / r.height,
      tx = (t.clientX - r.left) * sX, 
      ty = (t.clientY - r.top) * sY;
    let c = false; 
    this.buttons.forEach(b => { 
      if (tx >= b.x && tx <= b.x + b.width && ty >= b.y && ty <= b.y + b.height) { 
        c = true; 
        b.action(); 
      } 
    });
    if (!c) this.handleClick({ clientX: t.clientX, clientY: t.clientY });
  }
  
  /**
   * Handles touch move events on the impressum screen.
   * @param {TouchEvent} e - The touch move event.
   */
  handleTouchMove(e) { 
    const t = e.changedTouches[0]; 
    this.handleMouseMove({ clientX: t.clientX, clientY: t.clientY }); 
  }
  
  /**
   * Adds event listeners for mouse and touch events.
   */
  addEventListeners() {
    this.canvas.addEventListener('click', this.boundHandleClick);
    this.canvas.addEventListener('mousemove', this.boundHandleMouseMove);
    this.boundHandleTouchStart = this.handleTouchStart.bind(this);
    this.boundHandleTouchMove = this.handleTouchMove.bind(this);
    this.canvas.addEventListener('touchstart', this.boundHandleTouchStart);
    this.canvas.addEventListener('touchmove', this.boundHandleTouchMove);
  }
  
  /**
   * Removes event listeners for mouse and touch events.
   */
  removeEventListeners() {
    this.canvas.removeEventListener('click', this.boundHandleClick);
    this.canvas.removeEventListener('mousemove', this.boundHandleMouseMove);
    this.canvas.removeEventListener('touchstart', this.boundHandleTouchStart);
    this.canvas.removeEventListener('touchmove', this.boundHandleTouchMove);
  }
}

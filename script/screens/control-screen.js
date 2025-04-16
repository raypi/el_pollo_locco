/**
 * Represents the controls screen that displays game control instructions.
 */
class ControlsScreen {
  /**
   * Creates a new ControlsScreen instance.
   * @param {HTMLCanvasElement} canvas - The canvas element to render the screen on.
   * @param {Function} exitGameCallback - Callback function for the "Menu" button.
   */
  constructor(canvas, exitGameCallback) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.exitGameCallback = exitGameCallback;
    this.buttons = [{ label: 'Menü', action: () => { this.removeEventListeners(); if (typeof this.exitGameCallback === 'function') this.exitGameCallback(); } }];
    this.hoveredButton = null;
    this.boundHandleClick = this.handleClick.bind(this);
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.addEventListeners();
  }
  
  /**
   * Shows the controls screen.
   */
  show() { 
    this.draw(); 
  }
  
  /**
   * Draws the complete controls screen.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawHeading();
    this.drawText();
    this.drawButtons();
  }
  
  /**
   * Draws the heading of the controls screen.
   */
  drawHeading() {
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("Steuerung", this.canvas.width / 2, 50);
  }
  
  /**
   * Draws the control instructions text.
   */
  drawText() {
    this.ctx.font = '16px Arial';
    const info = [
      "Verwende die Pfeiltasten links und rechts zum Laufen",
      "Drücke die Leertaste, um zu springen.",
      "Werfe Flaschen mit M = hoher Wurf und N = flacher Wurf"
    ];
    info.forEach((line, i) => {
      this.ctx.fillText(line, this.canvas.width / 2, 100 + i * 25);
    });
  }
  
  /**
   * Draws a single button.
   * @param {Object} button - The button object.
   * @param {number} index - The index of the button.
   */
  drawButton(button, index) {
    const x = (this.canvas.width - 240) / 2, y = this.canvas.height - 100;
    button.x = x; button.y = y; button.width = 240; button.height = 60;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(x, y, 240, 60);
    this.ctx.strokeStyle = 'white'; this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, 240, 60);
    this.ctx.fillStyle = (this.hoveredButton === index) ? 'yellow' : 'white';
    this.ctx.textAlign = 'center'; this.ctx.font = '24px Arial';
    this.ctx.fillText(button.label, x + 120, y + 30 + 8);
  }
  
  /**
   * Draws all buttons on the controls screen.
   */
  drawButtons() { 
    this.buttons.forEach((b, i) => this.drawButton(b, i)); 
  }
  
  /**
   * Handles mouse movement events to detect button hover.
   * @param {MouseEvent} event - The mouse move event.
   */
  handleMouseMove(event) {
    const r = this.canvas.getBoundingClientRect(),
          mouseX = event.clientX - r.left,
          mouseY = event.clientY - r.top;
    this.hoveredButton = null;
    this.buttons.forEach((b, i) => {
      if (mouseX > b.x && mouseX < b.x + b.width && mouseY > b.y && mouseY < b.y + b.height)
        this.hoveredButton = i;
    });
    this.draw();
  }
  
  /**
   * Handles click events on the controls screen.
   * @param {MouseEvent} event - The click event.
   */
  handleClick(event) {
    const r = this.canvas.getBoundingClientRect(),
          clickX = event.clientX - r.left,
          clickY = event.clientY - r.top;
    this.buttons.forEach(b => {
      if (clickX > b.x && clickX < b.x + b.width && clickY > b.y && clickY < b.y + b.height)
        { if (typeof b.action === 'function') b.action(); }
    });
  }
  
  /**
   * Handles touch start events on the controls screen.
   * @param {TouchEvent} event - The touch start event.
   */
  handleTouchStart(event) {
    event.preventDefault();
    const t = event.changedTouches[0],
          r = this.canvas.getBoundingClientRect(),
          scaleX = this.canvas.width / r.width,
          scaleY = this.canvas.height / r.height,
          touchX = (t.clientX - r.left) * scaleX,
          touchY = (t.clientY - r.top) * scaleY;
    let clicked = false;
    this.buttons.forEach(b => {
      if (touchX >= b.x && touchX <= b.x + b.width && touchY >= b.y && touchY <= b.y + b.height) {
        clicked = true;
        b.action();
      }
    });
    if (!clicked)
      this.handleClick({ clientX: t.clientX, clientY: t.clientY });
  }
  
  /**
   * Handles touch move events on the controls screen.
   * @param {TouchEvent} event - The touch move event.
   */
  handleTouchMove(event) {
    const t = event.changedTouches[0];
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

/**
 * Represents the explanation screen that provides game instructions to the player.
 */
class ExplanationScreen {
  /**
   * Creates a new ExplanationScreen instance.
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
    this.boundHandleClick = this.handleClick.bind(this); 
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.addEventListeners();
  }
  
  /**
   * Shows the explanation screen.
   */
  show() { 
    this.draw(); 
  }
  
  /**
   * Draws the complete explanation screen.
   */
  draw() { 
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
    this.drawText(); 
    this.drawButtons(); 
  }
  
  /**
   * Draws the explanation text on the screen.
   */
  drawText() {
    const txt = `Willkommen im Spiel! Steuere Pepe durch das anspruchsvolle Level, sammle Münzen und besiege gefährliche Gegner. Nutze dein Geschick und schnelle Reaktionen, um die Gegner zu überwinden und verborgene Schätze zu entdecken. Viel Erfolg, und Spaß beim Spielen. Genieße das Abenteuer jeden Moment.`,
      margin = 200, 
      maxW = this.canvas.width - margin * 2, 
      startY = 100, 
      lh = 24;
    this.ctx.font = '16px Arial'; 
    this.ctx.fillStyle = 'black'; 
    this.drawCenteredText(this.ctx, txt, margin, startY, maxW, lh);
  }
  
  /**
   * Draws text centered and wrapped to fit within a specified width.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {string} text - The text to draw.
   * @param {number} x - The x-coordinate to start drawing.
   * @param {number} y - The y-coordinate to start drawing.
   * @param {number} maxWidth - The maximum width for text wrapping.
   * @param {number} lineHeight - The height of each line of text.
   */
  drawCenteredText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' '), lines = []; 
    let line = '';
    for (let i = 0; i < words.length; i++) { 
      const testLine = line + words[i] + ' ', 
        testWidth = ctx.measureText(testLine).width; 
      if (testWidth > maxWidth && line !== '') { 
        lines.push(line.trim()); 
        line = words[i] + ' '; 
      } else { 
        line = testLine; 
      } 
    }
    lines.push(line.trim()); 
    ctx.textAlign = 'center'; 
    for (let i = 0; i < lines.length; i++) { 
      ctx.fillText(lines[i], x + maxWidth / 2, y + i * lineHeight); 
    }
  }
  
  /**
   * Draws all buttons on the explanation screen.
   */
  drawButtons() {
    this.buttons.forEach((b, i) => {
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
    });
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
   * Handles click events on the explanation screen.
   * @param {MouseEvent} event - The click event.
   */
  handleClick(event) {
    const r = this.canvas.getBoundingClientRect(), 
      clickX = event.clientX - r.left, 
      clickY = event.clientY - r.top;
    this.buttons.forEach(b => { 
      if (clickX > b.x && clickX < b.x + b.width && clickY > b.y && clickY < b.y + b.height) { 
        if (typeof b.action === 'function') b.action(); 
      } 
    });
  }
  
  /**
   * Handles touch start events on the explanation screen.
   * @param {TouchEvent} event - The touch start event.
   */
  handleTouchStart(event) {
    event.preventDefault(); 
    const t = event.changedTouches[0], 
      r = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / r.width, 
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
    if (!clicked) this.handleClick({ clientX: t.clientX, clientY: t.clientY });
  }
  
  /**
   * Handles touch move events on the explanation screen.
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

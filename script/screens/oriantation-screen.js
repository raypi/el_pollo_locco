class OrientationScreen {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.boundHandleClick = this.handleClick.bind(this);
    this.boundHandleTouchStart = this.handleTouchStart.bind(this);
    this.addEventListeners();
  }

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
  

  handleClick(event) {

  }
  

  handleTouchStart(event) {
    
  }
  

  addEventListeners() {
    this.canvas.addEventListener('click', this.boundHandleClick);
    this.canvas.addEventListener('touchstart', this.boundHandleTouchStart);
  }
  

  removeEventListeners() {
    this.canvas.removeEventListener('click', this.boundHandleClick);
    this.canvas.removeEventListener('touchstart', this.boundHandleTouchStart);
  }
}
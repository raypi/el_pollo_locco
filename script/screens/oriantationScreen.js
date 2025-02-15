class OrientationScreen {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
    }
  
    draw() {
      // Canvas leeren
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Hintergrund (z.B. schwarz) zeichnen
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Text mittig zeichnen
      this.ctx.font = '24px Sixtyfour, sans-serif';
      this.ctx.fillStyle = 'white';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(
        "Bitte drehen Sie Ihr Gerät in den Landscape-Modus",
        this.canvas.width / 2,
        this.canvas.height / 2
      );
    }
  }
  
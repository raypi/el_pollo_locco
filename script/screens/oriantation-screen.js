class OrientationScreen {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      
      // Bound event handlers
      this.boundHandleClick = this.handleClick.bind(this);
      this.boundHandleTouchStart = this.handleTouchStart.bind(this);
      
      // Event Listener hinzufügen
      this.addEventListeners();
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
    
    /**
     * Klick-Handler (wird nicht wirklich benötigt, aber für Konsistenz implementiert)
     */
    handleClick(event) {
      // Nichts zu tun, da der Benutzer das Gerät drehen muss
    }
    
    /**
     * Touch-Start-Event: simuliere einen Klick
     */
    handleTouchStart(event) {
      // Nichts zu tun, da der Benutzer das Gerät drehen muss
    }
    
    /**
     * Event Listener hinzufügen
     */
    addEventListeners() {
      this.canvas.addEventListener('click', this.boundHandleClick);
      this.canvas.addEventListener('touchstart', this.boundHandleTouchStart);
    }
    
    /**
     * Event Listener entfernen
     */
    removeEventListeners() {
      this.canvas.removeEventListener('click', this.boundHandleClick);
      this.canvas.removeEventListener('touchstart', this.boundHandleTouchStart);
    }
  }

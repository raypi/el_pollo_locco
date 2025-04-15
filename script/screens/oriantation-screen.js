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
    
    // Hintergrund (schwarz) zeichnen
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Text Eigenschaften einstellen
    this.ctx.font = '24px Sixtyfour, sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    
    // Textzeilen definieren
    const line1 = "Bitte drehen Sie";
    const line2 = "Ihr Gerät in den";
    const line3 = "Landscape-Modus";
    
    // Zeilenhöhe festlegen (hier mit 30px als Beispiel)
    const lineHeight = 30;
    
    // Gesamthöhe des Textblocks (3 Zeilen)
    const totalHeight = lineHeight * 3;
    
    // Start-Y-Position so berechnen, dass der ganze Textblock vertikal zentriert ist
    const startY = (this.canvas.height / 2) - (totalHeight / 2) + (lineHeight / 2);
    
    // Jede Zeile zeichnen
    this.ctx.fillText(line1, this.canvas.width / 2, startY);
    this.ctx.fillText(line2, this.canvas.width / 2, startY + lineHeight);
    this.ctx.fillText(line3, this.canvas.width / 2, startY + 2 * lineHeight);
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
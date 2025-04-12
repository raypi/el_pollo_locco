class ControlsScreen {
    /**
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element.
     * @param {function} exitGameCallback - Callback, der beim Klick auf den „Menü“-Button ausgeführt wird (zurück zum Startscreen).
     */
    constructor(canvas, exitGameCallback) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.exitGameCallback = exitGameCallback;
  
      // Konfiguration für den Zurück-/Menü-Button
      this.button = {
        label: 'Menü',
        width: 200,
        height: 50,
        x: 0, // wird in show() berechnet
        y: 0  // wird in show() berechnet
      };
    }
  
    show() {
      // Canvas leeren
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      // Überschrift "Steuerung" zeichnen
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText("Steuerung", this.canvas.width / 2, 50);
  
      // Steuerungsinformationen (Beispieltext)
      this.ctx.font = '16px Arial';
      const text = [
        "Verwende die Pfeiltasten links und rechts zum laufen",
        "Drücke die Leertaste, um zu springen.",
        "Werfe Flaschen mit M = hoher Wurf und N = flacher Wurf"
      ];
      text.forEach((line, index) => {
        this.ctx.fillText(line, this.canvas.width / 2, 100 + index * 25);
      });
  
      // Menü-Button zeichnen
      this.button.x = (this.canvas.width - this.button.width) / 2;
      this.button.y = this.canvas.height - 100;
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      this.ctx.fillRect(this.button.x, this.button.y, this.button.width, this.button.height);
      this.ctx.fillStyle = 'black';
      this.ctx.font = '18px Arial';
      this.ctx.fillText(this.button.label, this.canvas.width / 2, this.button.y + this.button.height / 2 + 10);
    }
  
    handleClick(event) {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      if (
        clickX > this.button.x &&
        clickX < this.button.x + this.button.width &&
        clickY > this.button.y &&
        clickY < this.button.y + this.button.height
      ) {
        if (typeof this.exitGameCallback === 'function') {
          this.exitGameCallback();
        }
      }
    }
  }
  
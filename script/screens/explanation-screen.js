class ExplanationScreen {
    /**
     * @param {HTMLCanvasElement} canvas – Das Canvas-Element.
     * @param {function} exitGameCallback – Callback, der beim Klick auf den „Menü“-Button ausgeführt wird (zurück zum Startscreen).
     */
    constructor(canvas, exitGameCallback) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.exitGameCallback = exitGameCallback;
      
      // Konfiguration für den Menü-Button
      this.button = {
        label: 'Menü',
        width: 200,
        height: 50,
        x: 0,
        y: 0
      };
    }
    
    // Zeichnet den gesamten Screen: Text plus Menü-Button.
    show() {
      // Canvas leeren
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      const explanationText = `Willkommen im Spiel! Steuere Pepe durch das anspruchsvolle Level, sammle Münzen und besiege gefährliche Gegner. Nutze dein Geschick und schnelle Reaktionen, um die Gegner zu überwinden und verborgene Schätze zu entdecken. Viel Erfolg, und Spaß beim Spielen. Genieße das Abenteuer jeden Moment.`;
      
      // Definiert den Bereich (Box), in dem der Text erscheinen soll.
      const margin = 200;                       // Abstand vom Rand
      const maxWidth = this.canvas.width - margin * 2;  // Verfügbare Breite
      const startX = margin;                    // linke Position
      const startY = 100;                        // obere Position
      const lineHeight = 24;                    // Zeilenhöhe
    
      this.ctx.font = '16px Arial';
      this.ctx.fillStyle = 'black';
      // Aufruf der Methode, die den Text zeilenweise zentriert zeichnet
      this.drawCenteredText(this.ctx, explanationText, startX, startY, maxWidth, lineHeight);
    
      // Menü-Button zeichnen
      this.button.x = (this.canvas.width - this.button.width) / 2;
      this.button.y = this.canvas.height - 100;
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      this.ctx.fillRect(this.button.x, this.button.y, this.button.width, this.button.height);
      this.ctx.fillStyle = 'black';
      this.ctx.font = '18px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(this.button.label, this.canvas.width / 2, this.button.y + this.button.height / 2 + 10);
    }
    
    // Diese Methode teilt den Text in Zeilen auf (basierend auf maxWidth)
    // und zeichnet jede Zeile zentriert innerhalb der Box.
    drawCenteredText(ctx, text, x, y, maxWidth, lineHeight) {
      const words = text.split(' ');
      let line = '';
      const lines = [];
      
      // Text in Zeilen aufteilen
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth && line !== '') {
          lines.push(line.trim());
          line = words[i] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line.trim());
      
      // Jede Zeile zentriert zeichnen:
      ctx.textAlign = 'center'; // Text soll zentriert werden
      for (let i = 0; i < lines.length; i++) {
        const centerX = x + maxWidth / 2;
        ctx.fillText(lines[i], centerX, y + i * lineHeight);
      }
    }
    
    // Leitet Klicks an den Menü-Button weiter.
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
  
  
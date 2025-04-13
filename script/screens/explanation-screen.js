class ExplanationScreen {
  /**
   * @param {HTMLCanvasElement} canvas – Das Canvas-Element.
   * @param {function} exitGameCallback – Callback, der beim Klick auf den „Menü“-Button ausgeführt wird (zurück zum Startscreen).
   */
  constructor(canvas, exitGameCallback) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.exitGameCallback = exitGameCallback;

    // Wir legen ein Buttons-Array an (auch wenn es aktuell nur einen Button gibt).
    this.buttons = [
      {
        label: 'Menü',
        width: 200,
        height: 50,
        action: () => {
          // Beim Klick: Event Listener entfernen, dann Callback ausführen
          this.removeEventListeners();
          if (typeof this.exitGameCallback === 'function') {
            this.exitGameCallback();
          }
        }
      }
    ];

    // Index des Buttons, über dem sich die Maus gerade befindet (für Hover)
    this.hoveredButton = null;

    // Gebundene Event-Handler, damit removeEventListener sauber funktioniert
    this.boundHandleClick = this.handleClick.bind(this);
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);

    // Event-Listener registrieren
    this.addEventListeners();
  }

  /**
   * Methode zum Zeichnen/Anzeigen des Screens
   */
  show() {
    this.draw();
  }

  /**
   * Zeichnet den Screen (Text + Button[s])
   */
  draw() {
    // Canvas leeren
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Erklärungstext
    const explanationText = `Willkommen im Spiel! Steuere Pepe durch das anspruchsvolle Level, sammle Münzen und besiege gefährliche Gegner. Nutze dein Geschick und schnelle Reaktionen, um die Gegner zu überwinden und verborgene Schätze zu entdecken. Viel Erfolg, und Spaß beim Spielen. Genieße das Abenteuer jeden Moment.`;

    // Text-Parameter
    const margin = 200;
    const maxWidth = this.canvas.width - margin * 2;
    const startX = margin;
    const startY = 100;
    const lineHeight = 24;

    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = 'black';
    this.drawCenteredText(this.ctx, explanationText, startX, startY, maxWidth, lineHeight);

    // Buttons zeichnen
    this.buttons.forEach((button, index) => {
      // Position: mittig, kurz über dem unteren Canvas-Rand
      button.x = (this.canvas.width - button.width) / 2;
      button.y = this.canvas.height - 100;

      // Wenn gehhovered, zeichnen wir einen halbtransparenten Hintergrund und ändern die Textfarbe
      if (this.hoveredButton === index) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.fillRect(button.x, button.y, button.width, button.height);
        this.ctx.fillStyle = 'yellow';
      } else {
        // Normaler Hintergrund und Textfarbe
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.fillRect(button.x, button.y, button.width, button.height);
        this.ctx.fillStyle = 'black';
      }

      this.ctx.font = '18px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(
        button.label,
        button.x + button.width / 2,
        button.y + button.height / 2 + 7
      );
    });
  }

  /**
   * Zerlegt den Text in Zeilen und zeichnet ihn zentriert.
   * (Unverändert aus deinem Original-Code übernommen)
   */
  drawCenteredText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    const lines = [];

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

    ctx.textAlign = 'center';
    for (let i = 0; i < lines.length; i++) {
      const centerX = x + maxWidth / 2;
      ctx.fillText(lines[i], centerX, y + i * lineHeight);
    }
  }

  /**
   * Mausbewegung: Prüfen, ob wir über einem Button sind (für den Hover-Effekt)
   */
  handleMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Standard: kein Button gehhovered
    this.hoveredButton = null;

    // Checken, ob die Maus über einem Button ist
    this.buttons.forEach((button, index) => {
      if (
        mouseX > button.x &&
        mouseX < button.x + button.width &&
        mouseY > button.y &&
        mouseY < button.y + button.height
      ) {
        this.hoveredButton = index;
      }
    });

    // Neu zeichnen, damit der Hover sofort sichtbar wird
    this.draw();
  }

  /**
   * Klickverarbeitung: Prüfen, ob ein Button geklickt wurde
   */
  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    this.buttons.forEach((button) => {
      if (
        clickX > button.x &&
        clickX < button.x + button.width &&
        clickY > button.y &&
        clickY < button.y + button.height
      ) {
        // Button-Aktion ausführen (z.B. zurück zum Menü)
        if (typeof button.action === 'function') {
          button.action();
        }
      }
    });
  }

  /**
   * Event-Listener hinzufügen (mousemove + click)
   */
  addEventListeners() {
    this.canvas.addEventListener('mousemove', this.boundHandleMouseMove);
    this.canvas.addEventListener('click', this.boundHandleClick);
  }

  /**
   * Event-Listener entfernen
   */
  removeEventListeners() {
    this.canvas.removeEventListener('mousemove', this.boundHandleMouseMove);
    this.canvas.removeEventListener('click', this.boundHandleClick);
  }
}


// class ExplanationScreen {
//     /**
//      * @param {HTMLCanvasElement} canvas – Das Canvas-Element.
//      * @param {function} exitGameCallback – Callback, der beim Klick auf den „Menü“-Button ausgeführt wird (zurück zum Startscreen).
//      */
//     constructor(canvas, exitGameCallback) {
//       this.canvas = canvas;
//       this.ctx = canvas.getContext('2d');
//       this.exitGameCallback = exitGameCallback;
      
//       // Konfiguration für den Menü-Button
//       this.button = {
//         label: 'Menü',
//         width: 200,
//         height: 50,
//         x: 0,
//         y: 0
//       };
//     }
    
//     // Zeichnet den gesamten Screen: Text plus Menü-Button.
//     show() {
//       // Canvas leeren
//       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
//       const explanationText = `Willkommen im Spiel! Steuere Pepe durch das anspruchsvolle Level, sammle Münzen und besiege gefährliche Gegner. Nutze dein Geschick und schnelle Reaktionen, um die Gegner zu überwinden und verborgene Schätze zu entdecken. Viel Erfolg, und Spaß beim Spielen. Genieße das Abenteuer jeden Moment.`;
      
//       // Definiert den Bereich (Box), in dem der Text erscheinen soll.
//       const margin = 200;                       // Abstand vom Rand
//       const maxWidth = this.canvas.width - margin * 2;  // Verfügbare Breite
//       const startX = margin;                    // linke Position
//       const startY = 100;                        // obere Position
//       const lineHeight = 24;                    // Zeilenhöhe
    
//       this.ctx.font = '16px Arial';
//       this.ctx.fillStyle = 'black';
//       // Aufruf der Methode, die den Text zeilenweise zentriert zeichnet
//       this.drawCenteredText(this.ctx, explanationText, startX, startY, maxWidth, lineHeight);
    
//       // Menü-Button zeichnen
//       this.button.x = (this.canvas.width - this.button.width) / 2;
//       this.button.y = this.canvas.height - 100;
//       this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
//       this.ctx.fillRect(this.button.x, this.button.y, this.button.width, this.button.height);
//       this.ctx.fillStyle = 'black';
//       this.ctx.font = '18px Arial';
//       this.ctx.textAlign = 'center';
//       this.ctx.fillText(this.button.label, this.canvas.width / 2, this.button.y + this.button.height / 2 + 10);
//     }
    
//     // Diese Methode teilt den Text in Zeilen auf (basierend auf maxWidth)
//     // und zeichnet jede Zeile zentriert innerhalb der Box.
//     drawCenteredText(ctx, text, x, y, maxWidth, lineHeight) {
//       const words = text.split(' ');
//       let line = '';
//       const lines = [];
      
//       // Text in Zeilen aufteilen
//       for (let i = 0; i < words.length; i++) {
//         const testLine = line + words[i] + ' ';
//         const testWidth = ctx.measureText(testLine).width;
//         if (testWidth > maxWidth && line !== '') {
//           lines.push(line.trim());
//           line = words[i] + ' ';
//         } else {
//           line = testLine;
//         }
//       }
//       lines.push(line.trim());
      
//       // Jede Zeile zentriert zeichnen:
//       ctx.textAlign = 'center'; // Text soll zentriert werden
//       for (let i = 0; i < lines.length; i++) {
//         const centerX = x + maxWidth / 2;
//         ctx.fillText(lines[i], centerX, y + i * lineHeight);
//       }
//     }
    
//     // Leitet Klicks an den Menü-Button weiter.
//     handleClick(event) {
//       const rect = this.canvas.getBoundingClientRect();
//       const clickX = event.clientX - rect.left;
//       const clickY = event.clientY - rect.top;
      
//       if (
//         clickX > this.button.x &&
//         clickX < this.button.x + this.button.width &&
//         clickY > this.button.y &&
//         clickY < this.button.y + this.button.height
//       ) {
//         if (typeof this.exitGameCallback === 'function') {
//           this.exitGameCallback();
//         }
//       }
//     }
//   }
  
  
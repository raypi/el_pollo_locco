
class ControlsScreen {
  /**
   * @param {HTMLCanvasElement} canvas - Das Canvas-Element.
   * @param {function} exitGameCallback - Callback, der beim Klick auf den „Menü“-Button ausgeführt wird (zurück zum Startscreen).
   */
  constructor(canvas, exitGameCallback) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.exitGameCallback = exitGameCallback;

    // Array mit Buttons. Hier nur 1, aber du kannst natürlich mehr anlegen.
    this.buttons = [
      { 
        label: 'Menü', 
        action: () => {
          // Wenn geklickt, entferne erst die Event Listener
          this.removeEventListeners();
          // Dann Callback ausführen
          if (typeof this.exitGameCallback === 'function') {
            this.exitGameCallback();
          }
        }
      }
    ];

    // Index des Buttons, über dem die Maus gerade schwebt.
    this.hoveredButton = null;

    // Bound Event-Handler
    this.boundHandleClick = this.handleClick.bind(this);
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);

    // Event Listener hinzufügen
    this.addEventListeners();
  }

  /**
   * Zeichnet den Screen
   */
  show() {
    this.draw();
  }

  draw() {
    // Canvas leeren
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Überschrift zeichnen
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("Steuerung", this.canvas.width / 2, 50);

    // Steuerungsinfos
    this.ctx.font = '16px Arial';
    const text = [
      "Verwende die Pfeiltasten links und rechts zum Laufen",
      "Drücke die Leertaste, um zu springen.",
      "Werfe Flaschen mit M = hoher Wurf und N = flacher Wurf"
    ];
    text.forEach((line, index) => {
      this.ctx.fillText(line, this.canvas.width / 2, 100 + index * 25);
    });

    // Jetzt unsere Buttons zeichnen – analog zum StartScreen
    this.ctx.font = '18px Arial';

    this.buttons.forEach((button, index) => {
      // Beispiel-Position: Button mittig, weiter unten
      const x = (this.canvas.width - 200) / 2;
      const y = this.canvas.height - 100;
      button.x = x;
      button.y = y;
      button.width = 200;
      button.height = 50;

      // Falls Button gehhovered, zeichnen wir ein halbtransparentes Rechteck
      if (this.hoveredButton === index) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.fillRect(button.x, button.y, button.width, button.height);
        this.ctx.fillStyle = 'yellow';
      } else {
        this.ctx.fillStyle = 'white';
        // Optional: ein Hintergrundrechteck für den Button
        this.ctx.fillRect(button.x, button.y, button.width, button.height);
        this.ctx.fillStyle = 'black';
      }

      // Button-Label in der Mitte
      this.ctx.textAlign = 'center';
      this.ctx.fillText(
        button.label,
        button.x + button.width / 2,
        button.y + button.height / 2 + 6
      );
    });
  }

  /**
   * Prüft bei Mousemove, ob wir über einem Button sind.
   */
  handleMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    this.hoveredButton = null; // Standard: kein Button gehhovered

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

    // Neu zeichnen, damit Hover-Effekt sichtbar wird
    this.draw();
  }

  /**
   * Klickverarbeitung
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
        // Ausführen der Button-Aktion
        if (typeof button.action === 'function') {
          button.action();
        }
      }
    });
  }

  /**
   * Event Listener hinzufügen
   */
   // Methode zum Hinzufügen der Event Listener (jetzt mit Touch-Events)
   addEventListeners() {
    this.canvas.addEventListener('click', this.boundHandleClick);
    this.canvas.addEventListener('mousemove', this.boundHandleMouseMove);
    this.canvas.addEventListener('touchstart', this.boundHandleTouchStart);
    this.canvas.addEventListener('touchmove', this.boundHandleTouchMove);
}

// Methode zum Entfernen der Event Listener (sowohl Mouse als auch Touch)
removeEventListeners() {
    this.canvas.removeEventListener('click', this.boundHandleClick);
    this.canvas.removeEventListener('mousemove', this.boundHandleMouseMove);
    this.canvas.removeEventListener('touchstart', this.boundHandleTouchStart);
    this.canvas.removeEventListener('touchmove', this.boundHandleTouchMove);
}
}

// class ControlsScreen {
//     /**
//      * @param {HTMLCanvasElement} canvas - Das Canvas-Element.
//      * @param {function} exitGameCallback - Callback, der beim Klick auf den „Menü“-Button ausgeführt wird (zurück zum Startscreen).
//      */
//     constructor(canvas, exitGameCallback) {
//       this.canvas = canvas;
//       this.ctx = canvas.getContext('2d');
//       this.exitGameCallback = exitGameCallback;
  
//       // Konfiguration für den Zurück-/Menü-Button
//       this.button = {
//         label: 'Menü',
//         width: 200,
//         height: 50,
//         x: 0, // wird in show() berechnet
//         y: 0  // wird in show() berechnet
//       };
//     }
  
//     show() {
//       // Canvas leeren
//       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
//       // Überschrift "Steuerung" zeichnen
//       this.ctx.font = '20px Arial';
//       this.ctx.textAlign = 'center';
//       this.ctx.fillStyle = 'black';
//       this.ctx.fillText("Steuerung", this.canvas.width / 2, 50);
  
//       // Steuerungsinformationen (Beispieltext)
//       this.ctx.font = '16px Arial';
//       const text = [
//         "Verwende die Pfeiltasten links und rechts zum laufen",
//         "Drücke die Leertaste, um zu springen.",
//         "Werfe Flaschen mit M = hoher Wurf und N = flacher Wurf"
//       ];
//       text.forEach((line, index) => {
//         this.ctx.fillText(line, this.canvas.width / 2, 100 + index * 25);
//       });
  
//       // Menü-Button zeichnen
//       this.button.x = (this.canvas.width - this.button.width) / 2;
//       this.button.y = this.canvas.height - 100;
//       this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
//       this.ctx.fillRect(this.button.x, this.button.y, this.button.width, this.button.height);
//       this.ctx.fillStyle = 'black';
//       this.ctx.font = '18px Arial';
//       this.ctx.fillText(this.button.label, this.canvas.width / 2, this.button.y + this.button.height / 2 + 10);
//     }
  
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
  
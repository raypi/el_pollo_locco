class ImpressumScreen {
  /**
   * @param {HTMLCanvasElement} canvas - Das Canvas-Element, auf dem der Impressum-Screen gezeichnet wird.
   * @param {function} exitGameCallback - Callback, der beim Klick auf den „Menü“-Button ausgeführt wird (zurück zum Startscreen).
   */
  constructor(canvas, exitGameCallback) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.exitGameCallback = exitGameCallback;

    // Buttons-Array
    this.buttons = [
      {
        label: 'Menü',
        width: 200,
        height: 50,
        action: () => {
          // Zuerst Event-Listener entfernen
          this.removeEventListeners();
          if (typeof this.exitGameCallback === 'function') {
            this.exitGameCallback();
          }
        }
      }
    ];

    // Index des Buttons, über dem die Maus schwebt (null = keiner)
    this.hoveredButton = null;

    // Gebundene Event-Handler
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.boundHandleClick = this.handleClick.bind(this);

    // Event-Listener hinzufügen
    this.addEventListeners();
  }

  /**
   * Zeigt (bzw. zeichnet) den Screen
   */
  show() {
    this.draw();
  }

  /**
   * Zeichnet alles (Text, Buttons)
   */
  draw() {
    // Canvas leeren
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Überschrift
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("Impressum:", this.canvas.width / 2, 50);

    // Textblöcke
    this.ctx.font = '16px Arial';
    const text = [
      "Angaben gemäß § 5 TMG:",
      "Ray Don",
      "Am Yachthaven 1",
      "18950 Rostock",
      "",
      "Kontakt:",
      "Telefon: 0177559880",
      "E-Mail: ray@developing-sailor.com"
    ];
    text.forEach((line, index) => {
      this.ctx.fillText(line, this.canvas.width / 2, 100 + index * 25);
    });

    // Buttons zeichnen (aktuell nur 1)
    this.buttons.forEach((button, index) => {
      // Button-Position setzen
      button.x = (this.canvas.width - 240) / 2;
      button.y = this.canvas.height - 100;
      button.width = 240;
      button.height = 60;

      // Hover-Effekt
      if (this.hoveredButton === index) {
        this.ctx.fillStyle = 'yellow';
      } else {
        this.ctx.fillStyle = 'white';
      }

      // Label auf dem Button
      this.ctx.textAlign = 'center';
      this.ctx.font = '24px Arial'; // Größere Schrift für bessere Lesbarkeit
      this.ctx.fillText(
        button.label,
        button.x + button.width / 2,
        button.y + button.height / 2 + 8
      );
    });
  }

  /**
   * Prüft bei Mausbewegung, ob wir über einem Button sind – für den Hover-Effekt
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

    // Neu zeichnen, damit Hover-Effekt sichtbar wird
    this.draw();
  }

  /**
   * Klick-Verarbeitung
   */
  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Prüfen, ob ein Button geklickt wurde
    this.buttons.forEach((button) => {
      if (
        clickX > button.x &&
        clickX < button.x + button.width &&
        clickY > button.y &&
        clickY < button.y + button.height
      ) {
        // Aktion ausführen (z. B. zurück zum Menü)
        if (typeof button.action === 'function') {
          button.action();
        }
      }
    });
  }

  /**
   * Touch-Start-Event: simuliere einen Klick
   */
  handleTouchStart(event) {
    // Wir verwenden preventDefault() nur für den Canvas, um unerwünschtes Scrollen zu verhindern
    event.preventDefault();
    
    const touch = event.changedTouches[0];
    const rect = this.canvas.getBoundingClientRect();
    
    // Berechne die korrekten Touch-Koordinaten relativ zum Canvas
    // und berücksichtige dabei die Skalierung des Canvas
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const rectWidth = rect.width;
    const rectHeight = rect.height;
    
    // Skalierungsfaktoren berechnen
    const scaleX = canvasWidth / rectWidth;
    const scaleY = canvasHeight / rectHeight;
    
    // Touch-Position relativ zum Canvas berechnen
    const touchX = (touch.clientX - rect.left) * scaleX;
    const touchY = (touch.clientY - rect.top) * scaleY;
    
    console.log('Touch at:', touchX, touchY);
    
    // Prüfe direkt, ob ein Button getroffen wurde
    let buttonClicked = false;
    this.buttons.forEach((button, index) => {
        if (
            touchX >= button.x && 
            touchX <= button.x + button.width &&
            touchY >= button.y && 
            touchY <= button.y + button.height
        ) {
            console.log('Button clicked:', button.label);
            buttonClicked = true;
            button.action();
        }
    });
    
    // Wenn kein Button direkt getroffen wurde, verwende die normale Klick-Verarbeitung
    if (!buttonClicked) {
        const simulatedEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY
        };
        this.handleClick(simulatedEvent);
    }
  }

  /**
   * Touch-Move-Event: simuliere die Mausbewegung
   */
  handleTouchMove(event) {
    // Wir entfernen preventDefault(), da es Touch-Interaktionen blockieren kann
    const touch = event.changedTouches[0];
    const simulatedEvent = {
        clientX: touch.clientX,
        clientY: touch.clientY
    };
    this.handleMouseMove(simulatedEvent);
  }

  // Methode zum Hinzufügen der Event Listener (jetzt mit Touch-Events)
  addEventListeners() {
    this.canvas.addEventListener('click', this.boundHandleClick);
    this.canvas.addEventListener('mousemove', this.boundHandleMouseMove);
    
    // Bound event handlers für Touch-Events
    this.boundHandleTouchStart = this.handleTouchStart.bind(this);
    this.boundHandleTouchMove = this.handleTouchMove.bind(this);
    
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


// class ImpressumScreen {
//     /**
//      * @param {HTMLCanvasElement} canvas - Das Canvas-Element, auf dem der Impressum-Screen gezeichnet wird.
//      * @param {function} exitGameCallback - Callback, der beim Klick auf den „Menü“-Button ausgeführt wird (zurück zum Startscreen).
//      */
//     constructor(canvas, exitGameCallback) {
//       this.canvas = canvas;
//       this.ctx = canvas.getContext('2d');
//       this.exitGameCallback = exitGameCallback;
//       this.button = {
//         label: 'Menü',
//         width: 200,
//         height: 50,
//         x: 0, 
//         y: 0  
//       };
//     }
  
//     show() {
//       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//       this.ctx.font = '20px Arial';
//       this.ctx.textAlign = 'center';
//       this.ctx.fillStyle = 'black';
//       this.ctx.fillText("Impressum:", this.canvas.width / 2, 50);  
//       this.ctx.font = '16px Arial';
//       const text = [
//         "Angaben gemäß § 5 TMG:",
//         "Ray Don",
//         "Am Yachthaven 1",
//         "18950 Rostock",
//         "",
//         "Kontakt:",
//         "Telefon: 0177559880",
//         "E-Mail: ray@developing-sailor.com"
//       ];
//       text.forEach((line, index) => {
//         this.ctx.fillText(line, this.canvas.width / 2, 100 + index * 25);
//       });
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

class ControlsScreen {
  constructor(canvas, exitGameCallback) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.exitGameCallback = exitGameCallback;
    this.buttons = [{ label: 'Menü', action: () => { this.removeEventListeners(); if (typeof this.exitGameCallback === 'function') this.exitGameCallback(); } }];
    this.hoveredButton = null;
    this.boundHandleClick = this.handleClick.bind(this);
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.addEventListeners();
  }
  show() { 
    this.draw(); 
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawHeading();
    this.drawText();
    this.drawButtons();
  }
  drawHeading() {
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText("Steuerung", this.canvas.width / 2, 50);
  }
  drawText() {
    this.ctx.font = '16px Arial';
    const info = [
      "Verwende die Pfeiltasten links und rechts zum Laufen",
      "Drücke die Leertaste, um zu springen.",
      "Werfe Flaschen mit M = hoher Wurf und N = flacher Wurf"
    ];
    info.forEach((line, i) => {
      this.ctx.fillText(line, this.canvas.width / 2, 100 + i * 25);
    });
  }
  drawButton(button, index) {
    const x = (this.canvas.width - 240) / 2, y = this.canvas.height - 100;
    button.x = x; button.y = y; button.width = 240; button.height = 60;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(x, y, 240, 60);
    this.ctx.strokeStyle = 'white'; this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, 240, 60);
    this.ctx.fillStyle = (this.hoveredButton === index) ? 'yellow' : 'white';
    this.ctx.textAlign = 'center'; this.ctx.font = '24px Arial';
    this.ctx.fillText(button.label, x + 120, y + 30 + 8);
  }
  drawButtons() { 
    this.buttons.forEach((b, i) => this.drawButton(b, i)); 
  }
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
  handleClick(event) {
    const r = this.canvas.getBoundingClientRect(),
          clickX = event.clientX - r.left,
          clickY = event.clientY - r.top;
    this.buttons.forEach(b => {
      if (clickX > b.x && clickX < b.x + b.width && clickY > b.y && clickY < b.y + b.height)
        { if (typeof b.action === 'function') b.action(); }
    });
  }
  handleTouchStart(event) {
    event.preventDefault();
    const t = event.changedTouches[0],
          r = this.canvas.getBoundingClientRect(),
          scaleX = this.canvas.width / r.width,
          scaleY = this.canvas.height / r.height,
          touchX = (t.clientX - r.left) * scaleX,
          touchY = (t.clientY - r.top) * scaleY;
    console.log('Touch at:', touchX, touchY);
    let clicked = false;
    this.buttons.forEach(b => {
      if (touchX >= b.x && touchX <= b.x + b.width && touchY >= b.y && touchY <= b.y + b.height) {
        console.log('Button clicked:', b.label);
        clicked = true;
        b.action();
      }
    });
    if (!clicked)
      this.handleClick({ clientX: t.clientX, clientY: t.clientY });
  }
  handleTouchMove(event) {
    const t = event.changedTouches[0];
    this.handleMouseMove({ clientX: t.clientX, clientY: t.clientY });
  }
  addEventListeners() {
    this.canvas.addEventListener('click', this.boundHandleClick);
    this.canvas.addEventListener('mousemove', this.boundHandleMouseMove);
    this.boundHandleTouchStart = this.handleTouchStart.bind(this);
    this.boundHandleTouchMove = this.handleTouchMove.bind(this);
    this.canvas.addEventListener('touchstart', this.boundHandleTouchStart);
    this.canvas.addEventListener('touchmove', this.boundHandleTouchMove);
  }
  removeEventListeners() {
    this.canvas.removeEventListener('click', this.boundHandleClick);
    this.canvas.removeEventListener('mousemove', this.boundHandleMouseMove);
    this.canvas.removeEventListener('touchstart', this.boundHandleTouchStart);
    this.canvas.removeEventListener('touchmove', this.boundHandleTouchMove);
  }
}

// class ControlsScreen {
//   /**
//    * @param {HTMLCanvasElement} canvas - Das Canvas-Element.
//    * @param {function} exitGameCallback - Callback, der beim Klick auf den „Menü“-Button ausgeführt wird (zurück zum Startscreen).
//    */
//   constructor(canvas, exitGameCallback) {
//     this.canvas = canvas;
//     this.ctx = canvas.getContext('2d');
//     this.exitGameCallback = exitGameCallback;

//     // Array mit Buttons. Hier nur 1, aber du kannst natürlich mehr anlegen.
//     this.buttons = [
//       { 
//         label: 'Menü', 
//         action: () => {
//           // Wenn geklickt, entferne erst die Event Listener
//           this.removeEventListeners();
//           // Dann Callback ausführen
//           if (typeof this.exitGameCallback === 'function') {
//             this.exitGameCallback();
//           }
//         }
//       }
//     ];

//     // Index des Buttons, über dem die Maus gerade schwebt.
//     this.hoveredButton = null;

//     // Bound Event-Handler
//     this.boundHandleClick = this.handleClick.bind(this);
//     this.boundHandleMouseMove = this.handleMouseMove.bind(this);

//     // Event Listener hinzufügen
//     this.addEventListeners();
//   }

//   /**
//    * Zeichnet den Screen
//    */
//   show() {
//     this.draw();
//   }

//   draw() {
//     // Canvas leeren
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

//     // Überschrift zeichnen
//     this.ctx.font = '20px Arial';
//     this.ctx.textAlign = 'center';
//     this.ctx.fillStyle = 'black';
//     this.ctx.fillText("Steuerung", this.canvas.width / 2, 50);

//     // Steuerungsinfos
//     this.ctx.font = '16px Arial';
//     const text = [
//       "Verwende die Pfeiltasten links und rechts zum Laufen",
//       "Drücke die Leertaste, um zu springen.",
//       "Werfe Flaschen mit M = hoher Wurf und N = flacher Wurf"
//     ];
//     text.forEach((line, index) => {
//       this.ctx.fillText(line, this.canvas.width / 2, 100 + index * 25);
//     });

//     // Jetzt unsere Buttons zeichnen – analog zum StartScreen
//     this.ctx.font = '18px Arial';

//     this.buttons.forEach((button, index) => {
//       // Beispiel-Position: Button mittig, weiter unten
//       const x = (this.canvas.width - 240) / 2;
//       const y = this.canvas.height - 100;
//       button.x = x;
//       button.y = y;
//       button.width = 240;
//       button.height = 60;

//       // Zeichne einen sichtbaren Hintergrund für den Button
//       this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Halbtransparenter schwarzer Hintergrund
//       this.ctx.fillRect(button.x, button.y, button.width, button.height);
      
//       // Zeichne einen Rahmen um den Button für bessere Sichtbarkeit
//       this.ctx.strokeStyle = 'white';
//       this.ctx.lineWidth = 2;
//       this.ctx.strokeRect(button.x, button.y, button.width, button.height);
      
//       // Falls Button gehhovered, ändern wir die Textfarbe
//       if (this.hoveredButton === index) {
//         this.ctx.fillStyle = 'yellow';
//       } else {
//         this.ctx.fillStyle = 'white';
//       }

//       // Button-Label in der Mitte
//       this.ctx.textAlign = 'center';
//       this.ctx.font = '24px Arial'; // Größere Schrift für bessere Lesbarkeit
//       this.ctx.fillText(
//         button.label,
//         button.x + button.width / 2,
//         button.y + button.height / 2 + 8
//       );
//     });
//   }

//   /**
//    * Prüft bei Mousemove, ob wir über einem Button sind.
//    */
//   handleMouseMove(event) {
//     const rect = this.canvas.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left;
//     const mouseY = event.clientY - rect.top;

//     this.hoveredButton = null; // Standard: kein Button gehhovered

//     this.buttons.forEach((button, index) => {
//       if (
//         mouseX > button.x &&
//         mouseX < button.x + button.width &&
//         mouseY > button.y &&
//         mouseY < button.y + button.height
//       ) {
//         this.hoveredButton = index;
//       }
//     });

//     // Neu zeichnen, damit Hover-Effekt sichtbar wird
//     this.draw();
//   }

//   /**
//    * Klickverarbeitung
//    */
//   handleClick(event) {
//     const rect = this.canvas.getBoundingClientRect();
//     const clickX = event.clientX - rect.left;
//     const clickY = event.clientY - rect.top;

//     this.buttons.forEach((button) => {
//       if (
//         clickX > button.x &&
//         clickX < button.x + button.width &&
//         clickY > button.y &&
//         clickY < button.y + button.height
//       ) {
//         // Ausführen der Button-Aktion
//         if (typeof button.action === 'function') {
//           button.action();
//         }
//       }
//     });
//   }

//   /**
//    * Touch-Start-Event: simuliere einen Klick
//    */
//   handleTouchStart(event) {
//     // Wir verwenden preventDefault() nur für den Canvas, um unerwünschtes Scrollen zu verhindern
//     event.preventDefault();
    
//     const touch = event.changedTouches[0];
//     const rect = this.canvas.getBoundingClientRect();
    
//     // Berechne die korrekten Touch-Koordinaten relativ zum Canvas
//     // und berücksichtige dabei die Skalierung des Canvas
//     const canvasWidth = this.canvas.width;
//     const canvasHeight = this.canvas.height;
//     const rectWidth = rect.width;
//     const rectHeight = rect.height;
    
//     // Skalierungsfaktoren berechnen
//     const scaleX = canvasWidth / rectWidth;
//     const scaleY = canvasHeight / rectHeight;
    
//     // Touch-Position relativ zum Canvas berechnen
//     const touchX = (touch.clientX - rect.left) * scaleX;
//     const touchY = (touch.clientY - rect.top) * scaleY;
    
//     console.log('Touch at:', touchX, touchY);
    
//     // Prüfe direkt, ob ein Button getroffen wurde
//     let buttonClicked = false;
//     this.buttons.forEach((button, index) => {
//         if (
//             touchX >= button.x && 
//             touchX <= button.x + button.width &&
//             touchY >= button.y && 
//             touchY <= button.y + button.height
//         ) {
//             console.log('Button clicked:', button.label);
//             buttonClicked = true;
//             button.action();
//         }
//     });
    
//     // Wenn kein Button direkt getroffen wurde, verwende die normale Klick-Verarbeitung
//     if (!buttonClicked) {
//         const simulatedEvent = {
//             clientX: touch.clientX,
//             clientY: touch.clientY
//         };
//         this.handleClick(simulatedEvent);
//     }
//   }

//   /**
//    * Touch-Move-Event: simuliere die Mausbewegung
//    */
//   handleTouchMove(event) {
//     // Wir entfernen preventDefault(), da es Touch-Interaktionen blockieren kann
//     const touch = event.changedTouches[0];
//     const simulatedEvent = {
//         clientX: touch.clientX,
//         clientY: touch.clientY
//     };
//     this.handleMouseMove(simulatedEvent);
//   }

//   /**
//    * Event Listener hinzufügen
//    */
//   // Methode zum Hinzufügen der Event Listener (jetzt mit Touch-Events)
//   addEventListeners() {
//     this.canvas.addEventListener('click', this.boundHandleClick);
//     this.canvas.addEventListener('mousemove', this.boundHandleMouseMove);
    
//     // Bound event handlers für Touch-Events
//     this.boundHandleTouchStart = this.handleTouchStart.bind(this);
//     this.boundHandleTouchMove = this.handleTouchMove.bind(this);
    
//     this.canvas.addEventListener('touchstart', this.boundHandleTouchStart);
//     this.canvas.addEventListener('touchmove', this.boundHandleTouchMove);
//   }

//   // Methode zum Entfernen der Event Listener (sowohl Mouse als auch Touch)
//   removeEventListeners() {
//     this.canvas.removeEventListener('click', this.boundHandleClick);
//     this.canvas.removeEventListener('mousemove', this.boundHandleMouseMove);
//     this.canvas.removeEventListener('touchstart', this.boundHandleTouchStart);
//     this.canvas.removeEventListener('touchmove', this.boundHandleTouchMove);
//   }
// }
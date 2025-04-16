class ImpressumScreen {
  constructor(canvas, exitGameCallback) {
    this.canvas = canvas; this.ctx = canvas.getContext('2d'); this.exitGameCallback = exitGameCallback;
    this.buttons = [{ label: 'Menü', width: 200, height: 50, action: () => { this.removeEventListeners(); if (typeof this.exitGameCallback === 'function') this.exitGameCallback(); } }];
    this.hoveredButton = null; this.boundHandleMouseMove = this.handleMouseMove.bind(this); this.boundHandleClick = this.handleClick.bind(this);
    this.addEventListeners();
  }
  show() { this.draw(); }
  drawText() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = '20px Arial'; this.ctx.textAlign = 'center'; this.ctx.fillStyle = 'black';
    this.ctx.fillText("Impressum:", this.canvas.width / 2, 50);
    this.ctx.font = '16px Arial';
    const txt = ["Angaben gemäß § 5 TMG:", "Ray Don", "Am Yachthaven 1", "18950 Rostock", "", "Kontakt:", "Telefon: 0177559880", "E-Mail: ray@developing-sailor.com"];
    txt.forEach((l, i) => this.ctx.fillText(l, this.canvas.width / 2, 100 + i * 25));
  }
  drawButton(b, i) {
    b.x = (this.canvas.width - 240) / 2; b.y = this.canvas.height - 100; b.width = 240; b.height = 60;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; this.ctx.fillRect(b.x, b.y, b.width, b.height);
    this.ctx.strokeStyle = 'white'; this.ctx.lineWidth = 2; this.ctx.strokeRect(b.x, b.y, b.width, b.height);
    this.ctx.fillStyle = (this.hoveredButton === i) ? 'yellow' : 'white'; this.ctx.textAlign = 'center'; this.ctx.font = '24px Arial';
    this.ctx.fillText(b.label, b.x + b.width / 2, b.y + b.height / 2 + 8);
  }
  drawButtons() { this.buttons.forEach((b, i) => this.drawButton(b, i)); }
  draw() { this.drawText(); this.drawButtons(); }
  handleMouseMove(e) {
    const r = this.canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    this.hoveredButton = null; this.buttons.forEach((b, i) => { if (x > b.x && x < b.x + b.width && y > b.y && y < b.y + b.height) this.hoveredButton = i; });
    this.draw();
  }
  handleClick(e) {
    const r = this.canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    this.buttons.forEach(b => { if (x > b.x && x < b.x + b.width && y > b.y && y < b.y + b.height) if (typeof b.action === 'function') b.action(); });
  }
  handleTouchStart(e) {
    e.preventDefault();
    const t = e.changedTouches[0], r = this.canvas.getBoundingClientRect(),
      sX = this.canvas.width / r.width, sY = this.canvas.height / r.height,
      tx = (t.clientX - r.left) * sX, ty = (t.clientY - r.top) * sY;
    console.log('Touch at:', tx, ty);
    let c = false; this.buttons.forEach(b => { if (tx >= b.x && tx <= b.x + b.width && ty >= b.y && ty <= b.y + b.height) { console.log('Button clicked:', b.label); c = true; b.action(); } });
    if (!c) this.handleClick({ clientX: t.clientX, clientY: t.clientY });
  }
  handleTouchMove(e) { const t = e.changedTouches[0]; this.handleMouseMove({ clientX: t.clientX, clientY: t.clientY }); }
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

// class ImpressumScreen {
//   /**
//    * @param {HTMLCanvasElement} canvas - Das Canvas-Element, auf dem der Impressum-Screen gezeichnet wird.
//    * @param {function} exitGameCallback - Callback, der beim Klick auf den „Menü“-Button ausgeführt wird (zurück zum Startscreen).
//    */
//   constructor(canvas, exitGameCallback) {
//     this.canvas = canvas;
//     this.ctx = this.canvas.getContext('2d');
//     this.exitGameCallback = exitGameCallback;

//     // Buttons-Array
//     this.buttons = [
//       {
//         label: 'Menü',
//         width: 200,
//         height: 50,
//         action: () => {
//           // Zuerst Event-Listener entfernen
//           this.removeEventListeners();
//           if (typeof this.exitGameCallback === 'function') {
//             this.exitGameCallback();
//           }
//         }
//       }
//     ];

//     // Index des Buttons, über dem die Maus schwebt (null = keiner)
//     this.hoveredButton = null;

//     // Gebundene Event-Handler
//     this.boundHandleMouseMove = this.handleMouseMove.bind(this);
//     this.boundHandleClick = this.handleClick.bind(this);

//     // Event-Listener hinzufügen
//     this.addEventListeners();
//   }

//   /**
//    * Zeigt (bzw. zeichnet) den Screen
//    */
//   show() {
//     this.draw();
//   }

//   /**
//    * Zeichnet alles (Text, Buttons)
//    */
//   draw() {
//     // Canvas leeren
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

//     // Überschrift
//     this.ctx.font = '20px Arial';
//     this.ctx.textAlign = 'center';
//     this.ctx.fillStyle = 'black';
//     this.ctx.fillText("Impressum:", this.canvas.width / 2, 50);

//     // Textblöcke
//     this.ctx.font = '16px Arial';
//     const text = [
//       "Angaben gemäß § 5 TMG:",
//       "Ray Don",
//       "Am Yachthaven 1",
//       "18950 Rostock",
//       "",
//       "Kontakt:",
//       "Telefon: 0177559880",
//       "E-Mail: ray@developing-sailor.com"
//     ];
//     text.forEach((line, index) => {
//       this.ctx.fillText(line, this.canvas.width / 2, 100 + index * 25);
//     });

//     // Buttons zeichnen (aktuell nur 1)
//     this.buttons.forEach((button, index) => {
//       // Button-Position setzen
//       button.x = (this.canvas.width - 240) / 2;
//       button.y = this.canvas.height - 100;
//       button.width = 240;
//       button.height = 60;

//       // Zeichne einen sichtbaren Hintergrund für den Button
//       this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Halbtransparenter schwarzer Hintergrund
//       this.ctx.fillRect(button.x, button.y, button.width, button.height);
      
//       // Zeichne einen Rahmen um den Button für bessere Sichtbarkeit
//       this.ctx.strokeStyle = 'white';
//       this.ctx.lineWidth = 2;
//       this.ctx.strokeRect(button.x, button.y, button.width, button.height);
      
//       // Hover-Effekt
//       if (this.hoveredButton === index) {
//         this.ctx.fillStyle = 'yellow';
//       } else {
//         this.ctx.fillStyle = 'white';
//       }

//       // Label auf dem Button
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
//    * Prüft bei Mausbewegung, ob wir über einem Button sind – für den Hover-Effekt
//    */
//   handleMouseMove(event) {
//     const rect = this.canvas.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left;
//     const mouseY = event.clientY - rect.top;

//     // Standard: kein Button gehhovered
//     this.hoveredButton = null;

//     // Checken, ob die Maus über einem Button ist
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
//    * Klick-Verarbeitung
//    */
//   handleClick(event) {
//     const rect = this.canvas.getBoundingClientRect();
//     const clickX = event.clientX - rect.left;
//     const clickY = event.clientY - rect.top;

//     // Prüfen, ob ein Button geklickt wurde
//     this.buttons.forEach((button) => {
//       if (
//         clickX > button.x &&
//         clickX < button.x + button.width &&
//         clickY > button.y &&
//         clickY < button.y + button.height
//       ) {
//         // Aktion ausführen (z. B. zurück zum Menü)
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
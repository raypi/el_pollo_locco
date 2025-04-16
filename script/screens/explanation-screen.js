class ExplanationScreen {
  constructor(canvas, exitGameCallback) {
    this.canvas = canvas; this.ctx = canvas.getContext('2d'); this.exitGameCallback = exitGameCallback;
    this.buttons = [{ label: 'Menü', width: 200, height: 50, action: () => { this.removeEventListeners(); if (typeof this.exitGameCallback === 'function') this.exitGameCallback(); } }];
    this.hoveredButton = null; this.boundHandleClick = this.handleClick.bind(this); this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.addEventListeners();
  }
  show() { this.draw(); }
  draw() { this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); this.drawText(); this.drawButtons(); }
  drawText() {
    const txt = `Willkommen im Spiel! Steuere Pepe durch das anspruchsvolle Level, sammle Münzen und besiege gefährliche Gegner. Nutze dein Geschick und schnelle Reaktionen, um die Gegner zu überwinden und verborgene Schätze zu entdecken. Viel Erfolg, und Spaß beim Spielen. Genieße das Abenteuer jeden Moment.`,
      margin = 200, maxW = this.canvas.width - margin * 2, startY = 100, lh = 24;
    this.ctx.font = '16px Arial'; this.ctx.fillStyle = 'black'; this.drawCenteredText(this.ctx, txt, margin, startY, maxW, lh);
  }
  drawCenteredText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' '), lines = []; let line = '';
    for (let i = 0; i < words.length; i++) { const testLine = line + words[i] + ' ', testWidth = ctx.measureText(testLine).width; if (testWidth > maxWidth && line !== '') { lines.push(line.trim()); line = words[i] + ' '; } else { line = testLine; } }
    lines.push(line.trim()); ctx.textAlign = 'center'; for (let i = 0; i < lines.length; i++) { ctx.fillText(lines[i], x + maxWidth / 2, y + i * lineHeight); }
  }
  drawButtons() {
    this.buttons.forEach((b, i) => {
      b.x = (this.canvas.width - 240) / 2; b.y = this.canvas.height - 100; b.width = 240; b.height = 60;
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; this.ctx.fillRect(b.x, b.y, b.width, b.height);
      this.ctx.strokeStyle = 'white'; this.ctx.lineWidth = 2; this.ctx.strokeRect(b.x, b.y, b.width, b.height);
      this.ctx.fillStyle = (this.hoveredButton === i) ? 'yellow' : 'white'; this.ctx.textAlign = 'center'; this.ctx.font = '24px Arial';
      this.ctx.fillText(b.label, b.x + b.width / 2, b.y + b.height / 2 + 8);
    });
  }
  handleMouseMove(event) {
    const r = this.canvas.getBoundingClientRect(), mouseX = event.clientX - r.left, mouseY = event.clientY - r.top;
    this.hoveredButton = null; this.buttons.forEach((b, i) => { if (mouseX > b.x && mouseX < b.x + b.width && mouseY > b.y && mouseY < b.y + b.height) this.hoveredButton = i; });
    this.draw();
  }
  handleClick(event) {
    const r = this.canvas.getBoundingClientRect(), clickX = event.clientX - r.left, clickY = event.clientY - r.top;
    this.buttons.forEach(b => { if (clickX > b.x && clickX < b.x + b.width && clickY > b.y && clickY < b.y + b.height) { if (typeof b.action === 'function') b.action(); } });
  }
  handleTouchStart(event) {
    event.preventDefault(); const t = event.changedTouches[0], r = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / r.width, scaleY = this.canvas.height / r.height, touchX = (t.clientX - r.left) * scaleX, touchY = (t.clientY - r.top) * scaleY;
    console.log('Touch at:', touchX, touchY); let clicked = false;
    this.buttons.forEach(b => { if (touchX >= b.x && touchX <= b.x + b.width && touchY >= b.y && touchY <= b.y + b.height) { console.log('Button clicked:', b.label); clicked = true; b.action(); } });
    if (!clicked) this.handleClick({ clientX: t.clientX, clientY: t.clientY });
  }
  handleTouchMove(event) { const t = event.changedTouches[0]; this.handleMouseMove({ clientX: t.clientX, clientY: t.clientY }); }
  addEventListeners() {
    this.canvas.addEventListener('click', this.boundHandleClick);
    this.canvas.addEventListener('mousemove', this.boundHandleMouseMove);
    this.boundHandleTouchStart = this.handleTouchStart.bind(this); this.boundHandleTouchMove = this.handleTouchMove.bind(this);
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

// class ExplanationScreen {
//   /**
//    * @param {HTMLCanvasElement} canvas – Das Canvas-Element.
//    * @param {function} exitGameCallback – Callback, der beim Klick auf den „Menü“-Button ausgeführt wird (zurück zum Startscreen).
//    */
//   constructor(canvas, exitGameCallback) {
//     this.canvas = canvas;
//     this.ctx = this.canvas.getContext('2d');
//     this.exitGameCallback = exitGameCallback;

//     // Wir legen ein Buttons-Array an (auch wenn es aktuell nur einen Button gibt).
//     this.buttons = [
//       {
//         label: 'Menü',
//         width: 200,
//         height: 50,
//         action: () => {
//           // Beim Klick: Event Listener entfernen, dann Callback ausführen
//           this.removeEventListeners();
//           if (typeof this.exitGameCallback === 'function') {
//             this.exitGameCallback();
//           }
//         }
//       }
//     ];

//     // Index des Buttons, über dem sich die Maus gerade befindet (für Hover)
//     this.hoveredButton = null;

//     // Gebundene Event-Handler, damit removeEventListener sauber funktioniert
//     this.boundHandleClick = this.handleClick.bind(this);
//     this.boundHandleMouseMove = this.handleMouseMove.bind(this);

//     // Event-Listener registrieren
//     this.addEventListeners();
//   }

//   /**
//    * Methode zum Zeichnen/Anzeigen des Screens
//    */
//   show() {
//     this.draw();
//   }

//   /**
//    * Zeichnet den Screen (Text + Button[s])
//    */
//   draw() {
//     // Canvas leeren
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

//     // Erklärungstext
//     const explanationText = `Willkommen im Spiel! Steuere Pepe durch das anspruchsvolle Level, sammle Münzen und besiege gefährliche Gegner. Nutze dein Geschick und schnelle Reaktionen, um die Gegner zu überwinden und verborgene Schätze zu entdecken. Viel Erfolg, und Spaß beim Spielen. Genieße das Abenteuer jeden Moment.`;

//     // Text-Parameter
//     const margin = 200;
//     const maxWidth = this.canvas.width - margin * 2;
//     const startX = margin;
//     const startY = 100;
//     const lineHeight = 24;

//     this.ctx.font = '16px Arial';
//     this.ctx.fillStyle = 'black';
//     this.drawCenteredText(this.ctx, explanationText, startX, startY, maxWidth, lineHeight);

//     // Buttons zeichnen
//     this.buttons.forEach((button, index) => {
//       // Position: mittig, kurz über dem unteren Canvas-Rand
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
      
//       // Wenn gehhovered, ändern wir die Textfarbe
//       if (this.hoveredButton === index) {
//         this.ctx.fillStyle = 'yellow';
//       } else {
//         this.ctx.fillStyle = 'white';
//       }

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
//    * Zerlegt den Text in Zeilen und zeichnet ihn zentriert.
//    * (Unverändert aus deinem Original-Code übernommen)
//    */
//   drawCenteredText(ctx, text, x, y, maxWidth, lineHeight) {
//     const words = text.split(' ');
//     let line = '';
//     const lines = [];

//     for (let i = 0; i < words.length; i++) {
//       const testLine = line + words[i] + ' ';
//       const testWidth = ctx.measureText(testLine).width;
//       if (testWidth > maxWidth && line !== '') {
//         lines.push(line.trim());
//         line = words[i] + ' ';
//       } else {
//         line = testLine;
//       }
//     }
//     lines.push(line.trim());

//     ctx.textAlign = 'center';
//     for (let i = 0; i < lines.length; i++) {
//       const centerX = x + maxWidth / 2;
//       ctx.fillText(lines[i], centerX, y + i * lineHeight);
//     }
//   }

//   /**
//    * Mausbewegung: Prüfen, ob wir über einem Button sind (für den Hover-Effekt)
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

//     // Neu zeichnen, damit der Hover sofort sichtbar wird
//     this.draw();
//   }

//   /**
//    * Klickverarbeitung: Prüfen, ob ein Button geklickt wurde
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
//         // Button-Aktion ausführen (z.B. zurück zum Menü)
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
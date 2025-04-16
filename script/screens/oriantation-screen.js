class ScreenManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.currentScreen = null;
    this.lastActiveScreen = null;
    this.isCheckingOrientation = false;
  }
  checkOrientation() {
    if (this.isCheckingOrientation) return false;
    this.isCheckingOrientation = true;
    try {
      return this.checkPortrait() || this.checkLandscape();
    } finally {
      this.isCheckingOrientation = false;
    }
  }
  checkPortrait() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      if (!(this.currentScreen instanceof OrientationScreen)) {
        if (this.currentScreen) this.lastActiveScreen = this.currentScreen;
        this.directShowOrientationScreen();
        return true;
      }
    }
    return false;
  }
  checkLandscape() {
    if (
      !window.matchMedia("(orientation: portrait)").matches &&
      this.currentScreen instanceof OrientationScreen &&
      this.lastActiveScreen
    ) {
      const last = this.lastActiveScreen; this.lastActiveScreen = null;
      if (last instanceof StartScreen) this.directShowStartScreen();
      else if (last instanceof GameOverScreen) this.directShowGameOverScreen('character');
      else if (last instanceof ControlsScreen) this.directShowControlsScreen();
      else if (last instanceof ExplanationScreen) this.directShowExplanationScreen();
      else if (last instanceof ImpressumScreen) this.directShowImpressumScreen();
      else this.directShowStartScreen();
      return true;
    }
    return false;
  }
  directShowStartScreen() {
    this.stopAllGameProcesses();
    this.currentScreen = new StartScreen(this.canvas, () => { this.startGame(); });
    this.currentScreen.draw();
    this.currentScreen.show();
    hideMobileControls();
  }
  showStartScreen() {
    if (this.checkOrientation()) return;
    this.directShowStartScreen();
  }
  stopAllGameProcesses() {
    if (typeof world !== 'undefined' && world) { if (world.stopGame) world.stopGame(); }
    if (localStorage.getItem('musicOn') !== 'true') AudioHub.stopAllSounds();
  }
  startGame() {
    if (this.checkOrientation()) return;
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    this.canvas.onclick = null;
    this.clearCanvas();
    startGame();
    showMobileControls();
  }
  directShowGameOverScreen(type) {
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    hideMobileControls();
    this.currentScreen = new GameOverScreen(this.canvas, type, () => { this.newGame(); }, () => { this.showStartScreen(); });
    this.currentScreen.draw();
    if (typeof this.currentScreen.addEventListeners === 'function')
      this.currentScreen.addEventListeners();
    else this.canvas.onclick = (e) => { this.currentScreen.handleClick(e); };
  }
  showGameOverScreen(type) {
    if (this.checkOrientation()) return;
    this.directShowGameOverScreen(type);
  }
  newGame() {
    if (this.checkOrientation()) return;
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    this.canvas.onclick = null;
    this.clearCanvas();
    newGame();
    showMobileControls();
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  directShowOrientationScreen() {
    if (this.currentScreen instanceof OrientationScreen) return;
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    hideMobileControls();
    this.currentScreen = new OrientationScreen(this.canvas);
    this.currentScreen.draw();
    console.log('OrientationScreen wird angezeigt');
  }
  showOrientationScreen() {
    this.directShowOrientationScreen();
  }
  directShowImpressumScreen() {
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    hideMobileControls();
    this.clearCanvas();
    this.currentScreen = new ImpressumScreen(this.canvas, () => { this.showStartScreen(); });
    this.currentScreen.show();
  }
  showImpressumScreen() {
    if (this.checkOrientation()) return;
    this.directShowImpressumScreen();
  }
  directShowControlsScreen() {
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    hideMobileControls();
    this.clearCanvas();
    this.currentScreen = new ControlsScreen(this.canvas, () => { this.showStartScreen(); });
    this.currentScreen.show();
  }
  showControlsScreen() {
    if (this.checkOrientation()) return;
    this.directShowControlsScreen();
  }
  directShowExplanationScreen() {
    this.stopAllGameProcesses();
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function')
      this.currentScreen.removeEventListeners();
    hideMobileControls();
    this.clearCanvas();
    this.currentScreen = new ExplanationScreen(this.canvas, () => { this.showStartScreen(); });
    this.currentScreen.show();
  }
  showExplanationScreen() {
    if (this.checkOrientation()) return;
    this.directShowExplanationScreen();
  }
}

// class OrientationScreen {
//   /**
//    * @param {HTMLCanvasElement} canvas
//    */
//   constructor(canvas) {
//     this.canvas = canvas;
//     this.ctx = canvas.getContext('2d');
    
//     // Bound event handlers
//     this.boundHandleClick = this.handleClick.bind(this);
//     this.boundHandleTouchStart = this.handleTouchStart.bind(this);
    
//     // Event Listener hinzufügen
//     this.addEventListeners();
//   }

//   draw() {
//     // Canvas leeren
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
//     // Hintergrund (schwarz) zeichnen
//     this.ctx.fillStyle = 'black';
//     this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
//     // Text Eigenschaften einstellen
//     this.ctx.font = '24px Sixtyfour, sans-serif';
//     this.ctx.fillStyle = 'white';
//     this.ctx.textAlign = 'center';
//     this.ctx.textBaseline = 'middle';
    
//     // Textzeilen definieren
//     const line1 = "Bitte drehen Sie";
//     const line2 = "Ihr Gerät in den";
//     const line3 = "Landscape-Modus";
    
//     // Zeilenhöhe festlegen (hier mit 30px als Beispiel)
//     const lineHeight = 30;
    
//     // Gesamthöhe des Textblocks (3 Zeilen)
//     const totalHeight = lineHeight * 3;
    
//     // Start-Y-Position so berechnen, dass der ganze Textblock vertikal zentriert ist
//     const startY = (this.canvas.height / 2) - (totalHeight / 2) + (lineHeight / 2);
    
//     // Jede Zeile zeichnen
//     this.ctx.fillText(line1, this.canvas.width / 2, startY);
//     this.ctx.fillText(line2, this.canvas.width / 2, startY + lineHeight);
//     this.ctx.fillText(line3, this.canvas.width / 2, startY + 2 * lineHeight);
//   }
  
//   /**
//    * Klick-Handler (wird nicht wirklich benötigt, aber für Konsistenz implementiert)
//    */
//   handleClick(event) {
//     // Nichts zu tun, da der Benutzer das Gerät drehen muss
//   }
  
//   /**
//    * Touch-Start-Event: simuliere einen Klick
//    */
//   handleTouchStart(event) {
//     // Nichts zu tun, da der Benutzer das Gerät drehen muss
//   }
  
//   /**
//    * Event Listener hinzufügen
//    */
//   addEventListeners() {
//     this.canvas.addEventListener('click', this.boundHandleClick);
//     this.canvas.addEventListener('touchstart', this.boundHandleTouchStart);
//   }
  
//   /**
//    * Event Listener entfernen
//    */
//   removeEventListeners() {
//     this.canvas.removeEventListener('click', this.boundHandleClick);
//     this.canvas.removeEventListener('touchstart', this.boundHandleTouchStart);
//   }
// }
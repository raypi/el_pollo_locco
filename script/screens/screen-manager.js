class ScreenManager {
  /**
   * Canvas als Parameter zu übergeben.
   * @param {HTMLCanvasElement} canvas 
   */
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        // Aktueller Screen (z. B. StartScreen, GameOverScreen)
        this.currentScreen = null;
    }

    showStartScreen(){
        // Erstelle eine neue Instanz von StartScreen und übergebe als Callback zum Starten des Spiels.
        this.currentScreen = new StartScreen(this.canvas, () => {
            this.startGame();
        });
        this.currentScreen.draw();
        // Richte den Klick-Eventhandler so ein, dass er an den aktuellen Screen weiterreicht.
        this.canvas.onclick = (event) => {
            this.currentScreen.handleClick(event);
        };
    }

    // Startet das Spiel.
    startGame() {
       // Entferne den Klickhandler des Menüs.
       this.canvas.onclick = null;
       this.clearCanvas();
       // Rufe die globale startGame()-Funktion auf.
       startGame();
    }
/**
   * Zeigt den Game Over Screen an.
   * @param {string} type - 'endboss' (Spieler gewinnt, weil er den Boss besiegt) oder 'character' (Spieler verliert).
   */
showGameOverScreen(type) {
    this.currentScreen = new GameOverScreen(
      this.canvas,
      type,
      () => {
        // Callback für "Neues Spiel"
        this.newGame();
      },
      () => {
        // Callback für "Menü" – zurück zum Startscreen
        this.showStartScreen();
      }
    );
    this.currentScreen.draw();
    this.canvas.onclick = (event) => {
      this.currentScreen.handleClick(event);
    };
  }


    // Startet ein neues Spiel.
    newGame() {
        this.canvas.onclick = null;
        this.clearCanvas();
        newGame();
    }

    // Hilfsfunktion, um den Canvas zu leeren.
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    showOrientationScreen() {
        this.currentScreen = new OrientationScreen(this.canvas);
        this.currentScreen.draw();
        this.canvas.onclick = (event) => {
        this.currentScreen.handleClick(event);
        };
      }

      showImpressumScreen() {
        this.currentScreen = new ImpressumScreen(this.canvas, () => {
          this.showStartScreen();
        });
        this.currentScreen.show();
        this.canvas.onclick = (event) => {
          this.currentScreen.handleClick(event);
        };
      }
}
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
        // Stoppe alle laufenden Prozesse und Timeouts
        this.stopAllGameProcesses();
        
        // Erstelle eine neue Instanz von StartScreen und übergebe als Callback zum Starten des Spiels.
        this.currentScreen = new StartScreen(this.canvas, () => {
            this.startGame();
        });
        this.currentScreen.draw();
        
        // Wir brauchen keinen globalen onclick Handler mehr, da der StartScreen
        // seine eigenen Event Listener verwaltet
    }
    
    // Hilfsmethode zum Stoppen aller Spielprozesse
    stopAllGameProcesses() {
        // Stoppe die Welt, falls sie existiert
        if (typeof world !== 'undefined' && world) {
            if (world.stopGame) {
                world.stopGame(); // Die stopGame-Methode kümmert sich jetzt um alle Timeouts und Intervalle
            }
        }
    }

    // Startet das Spiel.
    startGame() {
       // Stoppe alle laufenden Prozesse und Timeouts
       this.stopAllGameProcesses();
       
       // Entferne alle vorherigen Event Listener
       if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
         this.currentScreen.removeEventListeners();
       }
       
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
    // Stoppe alle laufenden Prozesse und Timeouts
    this.stopAllGameProcesses();
    
    // Entferne alle vorherigen Event Listener
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
      this.currentScreen.removeEventListeners();
    }
    
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
        // Stoppe alle laufenden Prozesse und Timeouts
        this.stopAllGameProcesses();
        
        // Entferne alle vorherigen Event Listener
        if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
          this.currentScreen.removeEventListeners();
        }
        
        this.canvas.onclick = null;
        this.clearCanvas();
        newGame();
    }

    // Hilfsfunktion, um den Canvas zu leeren.
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    showOrientationScreen() {
        // Stoppe alle laufenden Prozesse und Timeouts
        this.stopAllGameProcesses();
        
        // Entferne alle vorherigen Event Listener
        if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
          this.currentScreen.removeEventListeners();
        }
        
        this.currentScreen = new OrientationScreen(this.canvas);
        this.currentScreen.draw();
        this.canvas.onclick = (event) => {
          this.currentScreen.handleClick(event);
        };
      }

      showImpressumScreen() {
        // Stoppe alle laufenden Prozesse und Timeouts
        this.stopAllGameProcesses();
        
        // Entferne alle vorherigen Event Listener
        if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
          this.currentScreen.removeEventListeners();
        }
      
        // Canvas ggf. leeren (optional)
        this.clearCanvas();
      
        // Neuen ImpressumScreen erstellen
        this.currentScreen = new ImpressumScreen(this.canvas, () => {
          this.showStartScreen();
        });
      
        // Screen anzeigen
        this.currentScreen.show();
      
      }

      // showControlsScreen() {
      //   // Stoppe alle laufenden Prozesse und Timeouts
      //   this.stopAllGameProcesses();
        
      //   // Entferne alle vorherigen Event Listener
      //   if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
      //     this.currentScreen.removeEventListeners();
      //   }
        
      //   this.currentScreen = new ControlsScreen(this.canvas, () => {
      //     this.showStartScreen();
      //   });
      //   this.currentScreen.show();
      //   this.canvas.onclick = (event) => {
      //     this.currentScreen.handleClick(event);
      //   };
      // }

      showControlsScreen() {
        // Stoppe alle laufenden Prozesse und Timeouts
        this.stopAllGameProcesses();
      
        // Entferne alle vorherigen Event Listener des aktiven Screens
        if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
          this.currentScreen.removeEventListeners();
        }
      
        // Canvas leeren (optional, je nach Bedarf)
        this.clearCanvas();
      
        // Erstelle den neuen ControlsScreen mit Callback
        this.currentScreen = new ControlsScreen(this.canvas, () => {
          // Callback für den "Menü"-Button
          this.showStartScreen();
        });
        
        // Zeige den Screen an (ruft intern seine draw-Methode auf)
        this.currentScreen.show();
      
        // WICHTIG: Kein eigener this.canvas.onclick mehr!
        // Die Klasse ControlsScreen verwaltet ihre Maus-Events intern (addEventListeners()).
      }
      
    
      showExplanationScreen() {
        // Stoppe alle laufenden Prozesse und Timeouts
        this.stopAllGameProcesses();
      
        // Entferne alle vorherigen Event Listener
        if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
          this.currentScreen.removeEventListeners();
        }
      
        // Canvas ggf. leeren (optional, kann nicht schaden)
        this.clearCanvas();
      
        // Neuen ExplanationScreen erstellen
        this.currentScreen = new ExplanationScreen(this.canvas, () => {
          this.showStartScreen();
        });
      
        // Den Screen anzeigen
        this.currentScreen.show();
      
        // Kein eigenes this.canvas.onclick mehr – das übernimmt ExplanationScreen intern!
      }
    }

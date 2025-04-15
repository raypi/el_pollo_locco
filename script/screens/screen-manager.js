class ScreenManager {
  /**
   * Canvas als Parameter zu übergeben.
   * @param {HTMLCanvasElement} canvas 
   */
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        // Aktueller Screen (z. B. StartScreen, GameOverScreen)
        this.currentScreen = null;
        // Speichern des letzten aktiven Screens (für Rückkehr nach Orientierungswechsel)
        this.lastActiveScreen = null;
        // Flag, um rekursive Aufrufe zu verhindern
        this.isCheckingOrientation = false;
    }

    // Hilfsmethode zur Überprüfung der Orientierung
    checkOrientation() {
        // Wenn bereits eine Orientierungsprüfung läuft, breche ab, um Rekursion zu vermeiden
        if (this.isCheckingOrientation) {
            return false;
        }
        
        // Setze Flag, dass wir gerade die Orientierung prüfen
        this.isCheckingOrientation = true;
        
        try {
            // Prüfe, ob das Gerät im Portraitmodus ist
            if (window.matchMedia("(orientation: portrait)").matches) {
                // Nur wenn wir nicht bereits den OrientationScreen anzeigen
                if (!(this.currentScreen instanceof OrientationScreen)) {
                    console.log('Portraitmodus erkannt - zeige OrientationScreen');
                    // Speichere den aktuellen Screen, falls er nicht der OrientationScreen ist
                    if (this.currentScreen) {
                        this.lastActiveScreen = this.currentScreen;
                    }
                    
                    // Direkter Aufruf ohne erneute Orientierungsprüfung
                    this.directShowOrientationScreen();
                    return true; // Orientierung wurde geändert
                }
            } else {
                // Wenn wir im Landscape-Modus sind und gerade den OrientationScreen anzeigen,
                // kehre zum letzten aktiven Screen zurück
                if (this.currentScreen instanceof OrientationScreen && this.lastActiveScreen) {
                    console.log('Landscapemodus erkannt - kehre zum letzten Screen zurück');
                    
                    // Speichere eine Referenz auf den letzten aktiven Screen
                    const lastScreen = this.lastActiveScreen;
                    
                    // Setze lastActiveScreen auf null, um Rekursion zu vermeiden
                    this.lastActiveScreen = null;
                    
                    // Wir müssen den richtigen Screen wieder anzeigen, ohne erneute Orientierungsprüfung
                    if (lastScreen instanceof StartScreen) {
                        this.directShowStartScreen();
                    } else if (lastScreen instanceof GameOverScreen) {
                        // Hier müssten wir den Typ speichern, vereinfacht:
                        this.directShowGameOverScreen('character');
                    } else if (lastScreen instanceof ControlsScreen) {
                        this.directShowControlsScreen();
                    } else if (lastScreen instanceof ExplanationScreen) {
                        this.directShowExplanationScreen();
                    } else if (lastScreen instanceof ImpressumScreen) {
                        this.directShowImpressumScreen();
                    } else {
                        // Fallback: Wenn kein bekannter Screen, zeige StartScreen
                        this.directShowStartScreen();
                    }
                    return true; // Orientierung wurde geändert
                }
            }
            return false; // Keine Änderung der Orientierung
        } finally {
            // Stelle sicher, dass das Flag zurückgesetzt wird, auch bei Fehlern
            this.isCheckingOrientation = false;
        }
    }

    // Direkte Methode zum Anzeigen des StartScreens ohne Orientierungsprüfung
    directShowStartScreen() {
        // Stoppe alle laufenden Prozesse und Timeouts
        this.stopAllGameProcesses();
        
        // Erstelle eine neue Instanz von StartScreen und übergebe als Callback zum Starten des Spiels.
        this.currentScreen = new StartScreen(this.canvas, () => {
            this.startGame();
        });
        this.currentScreen.draw();
        this.currentScreen.show();

        hideMobileControls();
    }
    
    showStartScreen(){
        // Prüfe zuerst die Orientierung
        if (this.checkOrientation()) {
            return; // Wenn die Orientierung geändert wurde, breche hier ab
        }
        
        // Wenn die Orientierung OK ist, zeige den StartScreen
        this.directShowStartScreen();
    }
    
    // Hilfsmethode zum Stoppen aller Spielprozesse
    stopAllGameProcesses() {
        // Stoppe die Welt, falls sie existiert
        if (typeof world !== 'undefined' && world) {
            if (world.stopGame) {
                world.stopGame(); // Die stopGame-Methode kümmert sich jetzt um alle Timeouts und Intervalle
            }
        }
        
        // Prüfe den Sound-Status in localStorage
        const soundOn = localStorage.getItem('musicOn');
        if (soundOn !== 'true') {
            // Wenn Sound ausgeschaltet ist, stoppe alle Sounds
            AudioHub.stopAllSounds();
        }
    }

    // Startet das Spiel.
    startGame() {
       // Prüfe zuerst die Orientierung
       if (this.checkOrientation()) {
           return; // Wenn die Orientierung geändert wurde, breche hier ab
       }
       
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
       // Stelle sicher, dass die mobilen Steuerelemente angezeigt werden
       showMobileControls();
    }
/**
   * Direkte Methode zum Anzeigen des GameOverScreens ohne Orientierungsprüfung
   * @param {string} type - 'endboss' (Spieler gewinnt, weil er den Boss besiegt) oder 'character' (Spieler verliert).
   */
  directShowGameOverScreen(type) {
    // Stoppe alle laufenden Prozesse und Timeouts
    this.stopAllGameProcesses();
    
    // Entferne alle vorherigen Event Listener
    if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
      this.currentScreen.removeEventListeners();
    }
    
    // Mobile Controls ausblenden
    hideMobileControls();
    
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
    
    // Event Listener hinzufügen (statt direktem onclick)
    if (typeof this.currentScreen.addEventListeners === 'function') {
      this.currentScreen.addEventListeners();
    } else {
      // Fallback für ältere Implementierungen
      this.canvas.onclick = (event) => {
        this.currentScreen.handleClick(event);
      };
    }
  }

/**
   * Zeigt den Game Over Screen an.
   * @param {string} type - 'endboss' (Spieler gewinnt, weil er den Boss besiegt) oder 'character' (Spieler verliert).
   */
showGameOverScreen(type) {
    // Prüfe zuerst die Orientierung
    if (this.checkOrientation()) {
        return; // Wenn die Orientierung geändert wurde, breche hier ab
    }
    
    // Wenn die Orientierung OK ist, zeige den GameOverScreen
    this.directShowGameOverScreen(type);
  }


    // Startet ein neues Spiel.
    newGame() {
        // Prüfe zuerst die Orientierung
        if (this.checkOrientation()) {
            return; // Wenn die Orientierung geändert wurde, breche hier ab
        }
        
        // Stoppe alle laufenden Prozesse und Timeouts
        this.stopAllGameProcesses();
        
        // Entferne alle vorherigen Event Listener
        if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
          this.currentScreen.removeEventListeners();
        }
        
        this.canvas.onclick = null;
        this.clearCanvas();
        newGame();
        // Stelle sicher, dass die mobilen Steuerelemente angezeigt werden
        showMobileControls();
    }

    // Hilfsfunktion, um den Canvas zu leeren.
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Direkte Methode zum Anzeigen des OrientationScreens ohne Orientierungsprüfung
    directShowOrientationScreen() {
        // Wenn wir bereits den OrientationScreen anzeigen, nichts tun
        if (this.currentScreen instanceof OrientationScreen) {
            return;
        }
        
        // Stoppe alle laufenden Prozesse und Timeouts
        this.stopAllGameProcesses();
        
        // Entferne alle vorherigen Event Listener
        if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
          this.currentScreen.removeEventListeners();
        }
        
        // Mobile Controls ausblenden
        hideMobileControls();
        
        this.currentScreen = new OrientationScreen(this.canvas);
        this.currentScreen.draw();
        
        // Event Listener werden bereits im Konstruktor hinzugefügt
        console.log('OrientationScreen wird angezeigt');
    }
    
    showOrientationScreen() {
        this.directShowOrientationScreen();
    }

      // Direkte Methode zum Anzeigen des ImpressumScreens ohne Orientierungsprüfung
      directShowImpressumScreen() {
        // Stoppe alle laufenden Prozesse und Timeouts
        this.stopAllGameProcesses();
        
        // Entferne alle vorherigen Event Listener
        if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
          this.currentScreen.removeEventListeners();
        }
      
        // Mobile Controls ausblenden
        hideMobileControls();
        
        // Canvas ggf. leeren (optional)
        this.clearCanvas();
      
        // Neuen ImpressumScreen erstellen
        this.currentScreen = new ImpressumScreen(this.canvas, () => {
          this.showStartScreen();
        });
      
        // Screen anzeigen
        this.currentScreen.show();
      }
      
      showImpressumScreen() {
        // Prüfe zuerst die Orientierung
        if (this.checkOrientation()) {
            return; // Wenn die Orientierung geändert wurde, breche hier ab
        }
        
        // Wenn die Orientierung OK ist, zeige den ImpressumScreen
        this.directShowImpressumScreen();
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

      // Direkte Methode zum Anzeigen des ControlsScreens ohne Orientierungsprüfung
      directShowControlsScreen() {
        // Stoppe alle laufenden Prozesse und Timeouts
        this.stopAllGameProcesses();
      
        // Entferne alle vorherigen Event Listener des aktiven Screens
        if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
          this.currentScreen.removeEventListeners();
        }
      
        // Mobile Controls ausblenden
        hideMobileControls();
        
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
      
      showControlsScreen() {
        // Prüfe zuerst die Orientierung
        if (this.checkOrientation()) {
            return; // Wenn die Orientierung geändert wurde, breche hier ab
        }
        
        // Wenn die Orientierung OK ist, zeige den ControlsScreen
        this.directShowControlsScreen();
      }
      
    
      // Direkte Methode zum Anzeigen des ExplanationScreens ohne Orientierungsprüfung
      directShowExplanationScreen() {
        // Stoppe alle laufenden Prozesse und Timeouts
        this.stopAllGameProcesses();
      
        // Entferne alle vorherigen Event Listener
        if (this.currentScreen && typeof this.currentScreen.removeEventListeners === 'function') {
          this.currentScreen.removeEventListeners();
        }
      
        // Mobile Controls ausblenden
        hideMobileControls();
        
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
      
      showExplanationScreen() {
        // Prüfe zuerst die Orientierung
        if (this.checkOrientation()) {
            return; // Wenn die Orientierung geändert wurde, breche hier ab
        }
        
        // Wenn die Orientierung OK ist, zeige den ExplanationScreen
        this.directShowExplanationScreen();
      }
    }

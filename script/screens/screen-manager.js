class ScreenManager {

    constructor(){
    
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

}
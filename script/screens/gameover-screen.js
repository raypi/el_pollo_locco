// Es handelt sich um einen einheitlichen Game Over Screen, der je nach übergebenem Typ
// (z. B. 'endboss' oder 'character') unterschiedliche Grafiken anzeigt.

class GameOverScreen {
    /**
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element.
     * @param {string} type - Bestimmt, welche Grafik angezeigt wird ('endboss' oder 'character').
     * @param {function} restartGameCallback - Callback für "Neues Spiel".
     * @param {function} exitGameCallback - Callback für "Menü" (zurück zum Startscreen).
     */


    constructor(canvas, type, restartGameCallback, exitGameCallback) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.restartGameCallback = restartGameCallback;
        this.exitGameCallback = exitGameCallback;
        this.type = type; // 'endboss' oder 'character'

        // Wähle die Grafik anhand des Typs
        this.gameOverImage = new Image();
        if (this.type === 'endboss') {
            // Beispiel: Spieler gewinnt (Boss besiegt)
            this.gameOverImage.src = 'assets/img/9_intro_outro_screens/win/win_1.png';
        } else if (this.type === 'character') {
            // Beispiel: Spieler verliert
            this.gameOverImage.src = 'assets/img/9_intro_outro_screens/game_over/you lost.png';
        } else {
            // Fallback-Grafik
            this.gameOverImage.src = 'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png';
            console.log('kann nicht passieren ist aber passiert, nicht von character und endboss')
        }

        // Sobald das Bild geladen ist, wird der Screen gezeichnet.
        this.gameOverImage.onload = () => {
            this.draw();
        };

        // Definiere die Buttons.
        this.buttons = [
            { label: 'Neues Spiel', action: () => this.restartGameCallback() },
            { label: 'Menü', action: () => this.exitGameCallback() }
        ];
    }



    draw() {
        // Canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Hintergrundfarbe
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Logo zeichnen
        const logoWidth = 300;
        const logoHeight = 100;
        const logoX = (this.canvas.width - logoWidth) / 2;
        const logoY = this.canvas.height / 3 - logoHeight / 2;

        this.ctx.drawImage(this.logoImage, logoX, logoY, logoWidth, logoHeight);

        // Buttons zeichnen
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';

        this.buttons.forEach((button, index) => {
            const buttonWidth = 200;
            const buttonHeight = 50;
            const x = (this.canvas.width / 2) - (buttonWidth / 2) + index * (buttonWidth + 20) - (this.buttons.length - 1) * 120; // Zentrierung der Buttons
            const y = this.canvas.height / 2 + 100;

            // Button Rechteck
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.fillRect(x, y, buttonWidth, buttonHeight);

            // Button Text
            this.ctx.fillStyle = 'black';
            this.ctx.fillText(button.label, x + buttonWidth / 2, y + buttonHeight / 2 + 10);

            // Speichere die Position für Klickerkennung
            button.x = x;
            button.y = y;
            button.width = buttonWidth;
            button.height = buttonHeight;
        });
    }

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
                button.action(); // Führe die Aktion des Buttons aus
            }
        });
    }


}

class StartScreen {

    /**
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element.
     * @param {function} startGameCallback - Callback, das ausgeführt wird, wenn der Spieler startet.
     */  

    constructor(canvas, startGameCallback) {

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.startGameCallback = startGameCallback;
        this.backgroundImage = new Image();
        this.backgroundImage.src = 'assets/img/9_intro_outro_screens/start/startscreen_1.png';
        this.backgroundImage.onload = () => {
            this.draw(); // Zeichne den Startscreen, sobald das Bild geladen ist
        };
        this.buttons = [
            { label: 'Start', action: this.startGameCallback },
            { label: 'Steuerung', action: () => this.showControls() },
            { label: 'Erklärung', action: () => this.showExplanation() },
            { label: 'Musik J/ N', action: () => this.toggleSound() },
            { label: 'Game Over', action: () => this.showGameOver() },// nur zu testzwecken
        ];
    }

    // Zeichnet den Startscreen.
    draw() {
        // Canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Hintergrundbild zeichnen
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        // Buttons zeichnen
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.buttons.forEach((button, index) => {
            const x = this.canvas.width / 2;
            const y = 200 + index * 60; // Vertikaler Abstand zwischen den Buttons
            this.ctx.fillText(button.label, x, y);
            // Button-Größen und Positionen für die Klickerkennung speichern.
            button.x = x - 100;
            button.y = y - 30;
            button.width = 200;
            button.height = 40;
        });
    }

    // Leitet Klicks an die korrekten Buttons weiter.
    handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        this.buttons.forEach((button) => {
            if (
                clickX > button.x &&
                clickX < button.x + button.width &&
                clickY > button.y &&
                clickY < button.y + button.height
            ) {
                button.action();
            }
        });
    }

    // Steurung anzeien ggf. ändern
    showControls(){
        console.log('Klick auf Steuerung');
    }

    // Spielanleitung
    showExplanation(){
        console.log('Klick auf Erklärung');
    }

    // hintergrund sound ein und ausschalten
    toggleSound(){
        console.log('Klick auf Musik');
    }  

    // nur zum testen
    showGameOver() {
        // Hier greifen wir auf den globalen screenManager zu und rufen dessen Methode auf.
        // Wir übergeben als Typ 'character' (für Testzwecke), du kannst hier auch 'endboss' übergeben, je nach Bedarf.
        if (typeof screenManager !== 'undefined') {
            screenManager.showGameOverScreen('character');
        } else {
            console.error("screenManager ist nicht definiert!");
        }
    }
}
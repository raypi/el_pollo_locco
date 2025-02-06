class StartScreen {
    
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
            { label: 'Musik e/ a', action: () => this.toggleSound() },
        ];
    }

    draw() {
        // Hintergrund zeichnen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas löschen
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);

        // Buttons zeichnen
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.buttons.forEach((button, index) => {
            const x = this.canvas.width / 2;
            const y = 200 + index * 60; // Vertikaler Abstand zwischen den Buttons
            this.ctx.fillText(button.label, x, y);
            button.x = x - 100; // Für Klickerkennung
            button.y = y - 30;
            button.width = 200;
            button.height = 40;
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
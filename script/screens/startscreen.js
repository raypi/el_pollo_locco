class StartScreen {
    
    constructor(game) {
        this.game = game; 
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.backgroundImage = new Image();
        this.backgroundImage.src = 'assets/img/9_intro_outro_screens/start/startscreen_1.png';
        this.buttons = [
            { label: 'Start', action: () => this.startGame() },
            { label: 'Steuerung', action: () => this.showControls() },
            { label: 'Erklärung', action: () => this.showExplanation() },
            { label: 'Erklärung', action: () => this.showExplanation() },
            { label: 'Sound', action: () => this.toggleSound() },
        ];
    }

    draw() {
        // Hintergrund zeichnen
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



}
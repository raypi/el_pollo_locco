class EndScreen {

    constructor() {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.startGameCallback = startGameCallback;
        this.backgroundImage = new Image();
        this.backgroundImage.src = 'assets/img/9_intro_outro_screens/game_over/game over.png';
        this.backgroundImage.onload = () => {
            this.draw(); // erstesst den Game Over screen 
        };
        this.buttons = [
            { label: 'Neues Spiel', action: this.startGameCallback },
            { label: 'Menü', action: () => this.showStartscreen() }
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
}

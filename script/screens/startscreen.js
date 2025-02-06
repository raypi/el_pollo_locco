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

}
class StartScreen {
    constructor(canvas, startGameCallback) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.startGameCallback = startGameCallback;
        this.musicOn = false;
        this.backgroundImage = new Image();
        this.backgroundImage.src = 'assets/img/9_intro_outro_screens/start/startscreen_1.png';

        // Buttons definieren
        this.buttons = [
            { label: 'Start', action: () => {
                this.removeEventListeners();
                this.startGameCallback();
            }},
            { label: 'Steuerung', action: () => this.showControls() },
            { label: 'Erklärung', action: () => this.showExplanation() },
            { label: 'Musik an', action: () => this.toggleSound() },
            { label: 'Impressum', action: () => this.showImpressum() },
        ];

        // Aktuell gehighlighteter Button (Index)
        this.hoveredButton = null;

        // Falls du den Startscreen sofort zeichnen willst, sobald das Bild fertig geladen ist
        this.backgroundImage.onload = () => {
            this.draw();
        };

        // Bound event handlers für einfaches Hinzufügen/Entfernen
        this.boundHandleClick = this.handleClick.bind(this);
        this.boundHandleMouseMove = this.handleMouseMove.bind(this);

        // Event Listener für Klick und Mousemove
        this.addEventListeners();
    }

    draw() {
        // Canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Hintergrundbild zeichnen
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);

        // Buttons zeichnen
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';

        this.buttons.forEach((button, index) => {
            // Position
            const x = this.canvas.width / 2;
            const y = 200 + index * 60;
            button.x = x - 100;
            button.y = y - 30;
            button.width = 200;
            button.height = 40;

            // Checken, ob dieser Button gerade gehighlightet werden soll
            if (this.hoveredButton === index) {
                // Transparenten Hintergrund zeichnen
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                this.ctx.fillRect(button.x, button.y, button.width, button.height);

                // Textfarbe
                this.ctx.fillStyle = 'yellow';
            } else {
                this.ctx.fillStyle = 'white';
            }
            
            this.ctx.fillText(button.label, x, y);
        });
    }

    // Klickverarbeitung
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

    // Hier ermitteln wir, ob der Mauszeiger über einem Button liegt
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Standard: kein Button gehighlighted
        this.hoveredButton = null;

        // Durch Buttons loopen und checken
        this.buttons.forEach((button, index) => {
            if (
                mouseX > button.x &&
                mouseX < button.x + button.width &&
                mouseY > button.y &&
                mouseY < button.y + button.height
            ) {
                this.hoveredButton = index;
            }
        });

        // Canvas neuzeichnen, damit der Hover-Effekt sichtbar wird
        this.draw();
    }

    showControls(){
        console.log('Klick auf Steuerung');
        // Event Listener entfernen, bevor zur Steuerungsseite navigiert wird
        this.removeEventListeners();
        screenManager.showControlsScreen();
    }

    showExplanation(){
        console.log('Klick auf Erklärung');
        // Event Listener entfernen, bevor zur Erklärungsseite navigiert wird
        this.removeEventListeners();
        screenManager.showExplanationScreen();
    }

    showImpressum() {
        // Event Listener entfernen, bevor zur Impressumseite navigiert wird
        this.removeEventListeners();
        screenManager.showImpressumScreen();
    }

    toggleSound() {
        console.log('toggleSound method called');
        try {
            console.log('Current musicOn state:', this.musicOn);
            console.log('Current button label:', this.buttons[3].label);
            
            if (this.musicOn) {
                // Musik aus
                console.log('Turning music off');
                AudioHub.stopOneSound(AudioHub.GAMEMUSIC);
                this.musicOn = false;
                this.buttons[3].label = 'Musik an';
            } else {
                // Musik an
                console.log('Turning music on');
                AudioHub.playOneSound(AudioHub.GAMEMUSIC);
                this.musicOn = true;
                this.buttons[3].label = 'Musik aus';
            }
            
            console.log('New musicOn state:', this.musicOn);
            console.log('New button label:', this.buttons[3].label);
            
            // Explicitly log all button labels before drawing
            this.buttons.forEach((button, index) => {
                console.log(`Button ${index} label: ${button.label}`);
            });
            
            this.draw(); // Label aktualisieren
            
            // Explicitly log all button labels after drawing
            console.log('After draw:');
            this.buttons.forEach((button, index) => {
                console.log(`Button ${index} label: ${button.label}`);
            });
        } catch (error) {
            console.error('Error in toggleSound:', error);
        }
    }

    // Methode zum Hinzufügen der Event Listener
    addEventListeners() {
        this.canvas.addEventListener('click', this.boundHandleClick);
        this.canvas.addEventListener('mousemove', this.boundHandleMouseMove);
    }

    // Methode zum Entfernen der Event Listener
    removeEventListeners() {
        this.canvas.removeEventListener('click', this.boundHandleClick);
        this.canvas.removeEventListener('mousemove', this.boundHandleMouseMove);
    }
}

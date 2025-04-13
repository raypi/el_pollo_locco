class StartScreen {
    constructor(canvas, startGameCallback) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.startGameCallback = startGameCallback;
        
        // Sicherstellen, dass die Musik gestoppt ist
        AudioHub.stopOneSound(AudioHub.GAMEMUSIC);
        
        // 1) Beim Erstellen des Screens aus localStorage lesen:
        const storedMusicOn = localStorage.getItem('musicOn');
        if (storedMusicOn === 'true') {
            this.musicOn = true;
        } else {
            this.musicOn = false;
        }

        this.backgroundImage = new Image();
        this.backgroundImage.src = 'assets/img/9_intro_outro_screens/start/startscreen_1.png';

        // 2) Buttons definieren; Label hängt davon ab, ob Musik an oder aus ist
        this.initButtons();

        // Im StartScreen wird keine Musik abgespielt, nur die Einstellung gespeichert

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

    // Initialisiert die Buttons mit den korrekten Labels
    initButtons() {
        this.buttons = [
            { label: 'Start', action: () => {
                this.removeEventListeners();
                // Musik entsprechend dem Status starten, wenn das Spiel beginnt
                if (this.musicOn) {
                    AudioHub.playOneSound(AudioHub.GAMEMUSIC);
                }
                this.startGameCallback();
            }},
            { label: 'Steuerung', action: () => this.showControls() },
            { label: 'Erklärung', action: () => this.showExplanation() },
            // Wenn Musik an ist (this.musicOn = true), zeige "Musik aus" als Option
            // Wenn Musik aus ist (this.musicOn = false), zeige "Musik an" als Option
            { label: this.musicOn ? 'Musik aus' : 'Musik an', action: () => this.toggleSound() },
            { label: 'Impressum', action: () => this.showImpressum() },
        ];
    }

    show(){
        // Sicherstellen, dass die Musik gestoppt ist
        AudioHub.stopOneSound(AudioHub.GAMEMUSIC);
        
        // Beim erneuten Anzeigen des Screens den Musikstatus aus localStorage lesen
        const storedMusicOn = localStorage.getItem('musicOn');
        if (storedMusicOn === 'true') {
            this.musicOn = true;
            // Musik wird NICHT automatisch abgespielt, sondern erst beim Spielstart
        } else {
            this.musicOn = false;
        }
        
        // Buttons neu initialisieren mit aktuellem Musikstatus
        this.buttons[3].label = this.musicOn ? 'Musik aus' : 'Musik an';
        
        // Sicherstellen, dass der Canvas-onclick-Handler entfernt wird
        this.canvas.onclick = null;
        
        // Event Listener hinzufügen
        this.addEventListeners();
        
        // Screen neu zeichnen
        this.draw();
        
        console.log('StartScreen show() - Musik Status:', this.musicOn);
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
            
            // Musik stoppen (falls sie läuft)
            AudioHub.stopOneSound(AudioHub.GAMEMUSIC);
            
            // Aktuellen Zustand umkehren
            this.musicOn = !this.musicOn;
            
            // Nur den Button-Text und localStorage aktualisieren
            // Die Musik wird erst beim Spielstart abgespielt
            if (this.musicOn) {
                console.log('Music setting: ON (will play when game starts)');
                this.buttons[3].label = 'Musik aus';
            } else {
                console.log('Music setting: OFF');
                this.buttons[3].label = 'Musik an';
            }
            
            // Neuen Wert in localStorage speichern
            localStorage.setItem('musicOn', this.musicOn);

            console.log('New musicOn state:', this.musicOn);
            console.log('New button label:', this.buttons[3].label);
            
            this.draw(); // Label aktualisieren
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

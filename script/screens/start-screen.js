class StartScreen {
    constructor(canvas, startGameCallback) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.startGameCallback = startGameCallback;
        
        // Sicherstellen, dass die Musik gestoppt ist
        AudioHub.stopOneSound(AudioHub.GAMEMUSIC);
        
        // 1) Beim Erstellen des Screens aus localStorage lesen:
        const storedMusicOn = localStorage.getItem('musicOn');
        this.musicOn = storedMusicOn === 'true';

        this.backgroundImage = new Image();
        this.backgroundImage.src = 'assets/img/9_intro_outro_screens/start/startscreen_1.png';

        // 2) Buttons definieren; Label hängt vom Musikstatus ab
        this.initButtons();

        // Aktuell gehighlighteter Button (Index)
        this.hoveredButton = null;

        // Falls du den Startscreen sofort zeichnen willst, sobald das Bild fertig geladen ist
        this.backgroundImage.onload = () => {
            this.draw();
        };

        // Bound event handlers für einfaches Hinzufügen/Entfernen
        this.boundHandleClick = this.handleClick.bind(this);
        this.boundHandleMouseMove = this.handleMouseMove.bind(this);
        this.boundHandleTouchStart = this.handleTouchStart.bind(this);
        this.boundHandleTouchMove = this.handleTouchMove.bind(this);

        // Event Listener für Klick-, Maus- und Touch-Events hinzufügen
        this.addEventListeners();
    }

    // Initialisiert die Buttons mit den korrekten Labels und Aktionen
    initButtons() {
        this.buttons = [
            { 
                label: 'Start', 
                action: () => {
                    this.removeEventListeners();
                    // Musik entsprechend dem Status starten, wenn das Spiel beginnt
                    if (this.musicOn) {
                        AudioHub.playOneSound(AudioHub.GAMEMUSIC);
                    }
                    this.startGameCallback();
                }
            },
            { label: 'Steuerung', action: () => this.showControls() },
            { label: 'Erklärung', action: () => this.showExplanation() },
            { label: this.musicOn ? 'Musik aus' : 'Musik an', action: () => this.toggleSound() },
            { label: 'Impressum', action: () => this.showImpressum() },
        ];
    }

    show(){
        // Sicherstellen, dass die Musik gestoppt ist
        AudioHub.stopOneSound(AudioHub.GAMEMUSIC);
        
        // Beim erneuten Anzeigen des Screens den Musikstatus aus localStorage lesen
        const storedMusicOn = localStorage.getItem('musicOn');
        this.musicOn = storedMusicOn === 'true';
        
        // Button-Label entsprechend aktualisieren
        this.buttons[3].label = this.musicOn ? 'Musik aus' : 'Musik an';
        
        // Sicherstellen, dass eventuelle vorherige Canvas-onclick Handler entfernt werden
        this.canvas.onclick = null;
        
        // Event Listener erneut hinzufügen
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
            // Position berechnen
            const x = this.canvas.width / 2;
            const y = 200 + index * 60;
            button.x = x - 100;
            button.y = y - 30;
            button.width = 200;
            button.height = 40;

            // Überprüfen, ob der Button gehighlighted werden soll
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

    // Klickverarbeitung (wird auch von Touch-Events über eine simulierte Event-Struktur verwendet)
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

    // Ermittelt, ob der Mauszeiger über einem Button liegt (wird auch bei Touch-Moves verwendet)
    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Standardmäßig: kein Button gehighlighted
        this.hoveredButton = null;

        // Über alle Buttons iterieren
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

        // Canvas neu zeichnen, damit der Hover-Effekt sichtbar wird
        this.draw();
    }

    // Touch-Start-Event: simuliere einen Klick
    handleTouchStart(event) {
        event.preventDefault(); // Verhindert zum Beispiel versehentliches Scrollen
        const touch = event.changedTouches[0];
        const simulatedEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY
        };
        this.handleClick(simulatedEvent);
    }

    // Touch-Move-Event: simuliere die Mausbewegung
    handleTouchMove(event) {
        event.preventDefault();
        const touch = event.changedTouches[0];
        const simulatedEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY
        };
        this.handleMouseMove(simulatedEvent);
    }

    // Navigationsmethoden zu den weiteren Screens
    showControls(){
        console.log('Klick auf Steuerung');
        this.removeEventListeners();
        screenManager.showControlsScreen();
    }

    showExplanation(){
        console.log('Klick auf Erklärung');
        this.removeEventListeners();
        screenManager.showExplanationScreen();
    }

    showImpressum() {
        this.removeEventListeners();
        screenManager.showImpressumScreen();
    }

    toggleSound() {
        console.log('toggleSound method called');
        try {
            // Musik stoppen (falls sie läuft)
            AudioHub.stopOneSound(AudioHub.GAMEMUSIC);
            
            // Aktuellen Zustand umkehren
            this.musicOn = !this.musicOn;
            
            // Button-Text und localStorage aktualisieren
            this.buttons[3].label = this.musicOn ? 'Musik aus' : 'Musik an';
            localStorage.setItem('musicOn', this.musicOn);

            this.draw(); // Aktualisiere die Anzeige
        } catch (error) {
            console.error('Error in toggleSound:', error);
        }
    }

    // Methode zum Hinzufügen der Event Listener (jetzt mit Touch-Events)
    addEventListeners() {
        this.canvas.addEventListener('click', this.boundHandleClick);
        this.canvas.addEventListener('mousemove', this.boundHandleMouseMove);
        this.canvas.addEventListener('touchstart', this.boundHandleTouchStart);
        this.canvas.addEventListener('touchmove', this.boundHandleTouchMove);
    }

    // Methode zum Entfernen der Event Listener (sowohl Mouse als auch Touch)
    removeEventListeners() {
        this.canvas.removeEventListener('click', this.boundHandleClick);
        this.canvas.removeEventListener('mousemove', this.boundHandleMouseMove);
        this.canvas.removeEventListener('touchstart', this.boundHandleTouchStart);
        this.canvas.removeEventListener('touchmove', this.boundHandleTouchMove);
    }
}

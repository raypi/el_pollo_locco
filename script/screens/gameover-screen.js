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
            { label: 'Menü', action: () => {
                // Musik komplett ausschalten, bevor zum Startscreen zurückgekehrt wird
                AudioHub.stopOneSound(AudioHub.GAMEMUSIC);
                this.exitGameCallback();
            }}
        ];
    }



     // Zeichnet den Game Over Screen.
     draw() {
        // Canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Zeichne einen halbtransparenten Hintergrund.
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Zeichne die Game Over Grafik mittig.
        const imgWidth = 300;
        const imgHeight = 100;
        const imgX = (this.canvas.width - imgWidth) / 2;
        const imgY = this.canvas.height / 3 - imgHeight / 2;
        this.ctx.drawImage(this.gameOverImage, imgX, imgY, imgWidth, imgHeight);
        // Zeichne die Buttons unterhalb der Grafik.
        this.ctx.font = '18px Sixtyfour, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.buttons.forEach((button, index) => {
            const buttonWidth = 200;
            const buttonHeight = 50;
            const x = (this.canvas.width - buttonWidth) / 2;
            const y = this.canvas.height / 2 + 100 + index * (buttonHeight + 20);
            // Zeichne das Rechteck für den Button.
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.fillRect(x, y, buttonWidth, buttonHeight);
            // Zeichne den Text.
            this.ctx.fillStyle = 'black';
            this.ctx.fillText(button.label, x + buttonWidth / 2, y + buttonHeight / 2 + 10);
            // Speichere die Buttonposition und -größe für die Klickerkennung.
            button.x = x;
            button.y = y;
            button.width = buttonWidth;
            button.height = buttonHeight;
        });
    }
    

    // Leitet Klicks an die Buttons weiter.
    handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        
        // Berechne die korrekten Klick-Koordinaten relativ zum Canvas
        // und berücksichtige dabei die Skalierung des Canvas
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        const rectWidth = rect.width;
        const rectHeight = rect.height;
        
        // Skalierungsfaktoren berechnen
        const scaleX = canvasWidth / rectWidth;
        const scaleY = canvasHeight / rectHeight;
        
        // Klick-Position relativ zum Canvas berechnen
        const clickX = (event.clientX - rect.left) * scaleX;
        const clickY = (event.clientY - rect.top) * scaleY;
        
        console.log('Click detected at:', clickX, clickY);
        
        this.buttons.forEach((button) => {
            if (
                clickX >= button.x &&
                clickX <= button.x + button.width &&
                clickY >= button.y &&
                clickY <= button.y + button.height
            ) {
                console.log('Button clicked:', button.label);
                button.action();
            }
        });
    }

    /**
     * Touch-Start-Event: simuliere einen Klick
     */
    handleTouchStart(event) {
        // Prevent default to avoid double-firing or scrolling
        event.preventDefault();
        
        const touch = event.changedTouches[0];
        const rect = this.canvas.getBoundingClientRect();
        
        // Berechne die korrekten Touch-Koordinaten relativ zum Canvas
        // und berücksichtige dabei die Skalierung des Canvas
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        const rectWidth = rect.width;
        const rectHeight = rect.height;
        
        // Skalierungsfaktoren berechnen
        const scaleX = canvasWidth / rectWidth;
        const scaleY = canvasHeight / rectHeight;
        
        // Touch-Position relativ zum Canvas berechnen
        const touchX = (touch.clientX - rect.left) * scaleX;
        const touchY = (touch.clientY - rect.top) * scaleY;
        
        console.log('Touch detected at:', touchX, touchY);
        
        // Prüfe direkt, ob ein Button getroffen wurde
        let buttonClicked = false;
        this.buttons.forEach((button, index) => {
            if (
                touchX >= button.x && 
                touchX <= button.x + button.width &&
                touchY >= button.y && 
                touchY <= button.y + button.height
            ) {
                console.log('Button touched:', button.label);
                buttonClicked = true;
                button.action();
            }
        });
        
        // Wenn kein Button direkt getroffen wurde, verwende die normale Klick-Verarbeitung
        if (!buttonClicked) {
            const simulatedEvent = {
                clientX: touch.clientX,
                clientY: touch.clientY
            };
            this.handleClick(simulatedEvent);
        }
    }

    /**
     * Touch-End-Event: für Geräte, die touchend besser verarbeiten als touchstart
     */
    handleTouchEnd(event) {
        // Prevent default to avoid double-firing
        event.preventDefault();
        
        const touch = event.changedTouches[0];
        const rect = this.canvas.getBoundingClientRect();
        
        // Berechne die korrekten Touch-Koordinaten relativ zum Canvas
        // und berücksichtige dabei die Skalierung des Canvas
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        const rectWidth = rect.width;
        const rectHeight = rect.height;
        
        // Skalierungsfaktoren berechnen
        const scaleX = canvasWidth / rectWidth;
        const scaleY = canvasHeight / rectHeight;
        
        // Touch-Position relativ zum Canvas berechnen
        const touchX = (touch.clientX - rect.left) * scaleX;
        const touchY = (touch.clientY - rect.top) * scaleY;
        
        console.log('Touch end detected at:', touchX, touchY);
        
        // Prüfe direkt, ob ein Button getroffen wurde
        let buttonClicked = false;
        this.buttons.forEach((button, index) => {
            if (
                touchX >= button.x && 
                touchX <= button.x + button.width &&
                touchY >= button.y && 
                touchY <= button.y + button.height
            ) {
                console.log('Button released:', button.label);
                buttonClicked = true;
                button.action();
            }
        });
        
        // Wenn kein Button direkt getroffen wurde, verwende die normale Klick-Verarbeitung
        if (!buttonClicked) {
            const simulatedEvent = {
                clientX: touch.clientX,
                clientY: touch.clientY
            };
            this.handleClick(simulatedEvent);
        }
    }

    // Methode zum Hinzufügen der Event Listener (mit Touch-Events)
    addEventListeners() {
        // Bound event handlers
        this.boundHandleClick = this.handleClick.bind(this);
        this.boundHandleTouchStart = this.handleTouchStart.bind(this);
        this.boundHandleTouchEnd = this.handleTouchEnd.bind(this);
        
        // Stelle sicher, dass das Canvas für Touch-Events bereit ist
        this.canvas.style.touchAction = 'none'; // Verhindert Browser-Gesten
        
        // Füge Event-Listener hinzu
        this.canvas.addEventListener('click', this.boundHandleClick);
        this.canvas.addEventListener('touchstart', this.boundHandleTouchStart, { passive: false });
        this.canvas.addEventListener('touchend', this.boundHandleTouchEnd, { passive: false });
        
        console.log('Event listeners added to GameOverScreen');
    }

    // Methode zum Entfernen von Event Listenern
    removeEventListeners() {
        // Entferne alle Event Listener
        if (this.boundHandleClick) {
            this.canvas.removeEventListener('click', this.boundHandleClick);
        }
        if (this.boundHandleTouchStart) {
            this.canvas.removeEventListener('touchstart', this.boundHandleTouchStart);
        }
        if (this.boundHandleTouchEnd) {
            this.canvas.removeEventListener('touchend', this.boundHandleTouchEnd);
        }
        
        // Entferne den onclick Handler vom Canvas (für Abwärtskompatibilität)
        this.canvas.onclick = null;
        
        console.log('Event listeners removed from GameOverScreen');
    }
}

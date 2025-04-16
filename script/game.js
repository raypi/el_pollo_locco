let canvas;
let world;
let keyboard = new Keyboard();
// let startScreen;
let screenManager; // Referenz auf Screen Manager

function init() {
    canvas = document.getElementById('canvas');
    // Erstelle den Screen Manager und übergebe den Canvas
    screenManager = new ScreenManager(canvas);
    // Zeige zunächst den Startscreen an
    screenManager.showStartScreen();
    // Event-Listener für Orientierungswechsel
    window.addEventListener("orientationchange", checkOrientation);
    window.addEventListener("resize", checkOrientation);
    // Füge Tastatur-Eventlistener hinzu
    window.addEventListener('keydown', keyboardKeyDown);
    window.addEventListener('keyup', keyboardKeyUp);
    
    // Starte periodische Orientierungsprüfung für mobile Geräte
    startOrientationCheck();
}

// Periodische Überprüfung der Orientierung für mobile Geräte
function startOrientationCheck() {
    // Verbesserte Geräteerkennung für alle Tablet-Größen
    const isMobileOrTabletDevice = (function() {
        // Prüfe auf Touch-Events
        const hasTouchEvents = 'ontouchstart' in window || 
                              navigator.maxTouchPoints > 0 || 
                              navigator.msMaxTouchPoints > 0;
        
        // Prüfe auf mobile User-Agent (erweitert für alle iPad-Modelle)
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        const isMobileUserAgent = mobileRegex.test(navigator.userAgent);
        
        // Prüfe auf iPad-spezifische User-Agent (für iPad Air, Pro, etc.)
        const isIPad = /iPad/i.test(navigator.userAgent) || 
                      (/Macintosh/i.test(navigator.userAgent) && hasTouchEvents);
        
        // Prüfe auf Bildschirmgröße (für Tablets)
        const isTabletSize = window.innerWidth <= 1366 && window.innerHeight <= 1024;
        
        // Zeige Controls an, wenn:
        // - Es ist ein bekanntes mobiles Gerät ODER
        // - Es ist ein iPad ODER
        // - Es hat Touch-Events UND ist in Tablet-Größe
        return isMobileUserAgent || isIPad || (hasTouchEvents && isTabletSize);
    })();
    
    if (isMobileOrTabletDevice) {
        console.log('Starte periodische Orientierungsprüfung für mobiles Gerät oder Tablet');
        // Prüfe alle 2 Sekunden die Orientierung
        setInterval(checkOrientation, 2000);
    }
}

function checkOrientation() {
    // Verwende die checkOrientation-Methode des ScreenManagers
    // Diese Methode kümmert sich um die korrekte Anzeige des entsprechenden Screens
    screenManager.checkOrientation();
}
  

//newGame
function newGame(){
    console.log('neues spiel')
    AudioHub.stopAllSounds();
    // alle prozesse stoppen clear all inverals und inhalt der init.
    if (world && world.stopGame) {
        world.stopGame();
      }
    startGame();
}


// später ändern in einen Bildschirm Manager um andere Ansichten zu realisieren wie Pause, Game Over...
function startGame() {
    console.log('Spiel wird gestartet!');
    level001 = createLevel001();
    world = new World(canvas, keyboard);
    showMobileControls();
}

function showMobileControls() {
    // Verbesserte Touch-Gerät-Erkennung für alle Tablet-Größen
    const shouldShowControls = (function() {
        // Prüfe auf Touch-Events
        const hasTouchEvents = 'ontouchstart' in window || 
                              navigator.maxTouchPoints > 0 || 
                              navigator.msMaxTouchPoints > 0;
        
        // Prüfe auf mobile User-Agent (erweitert für alle iPad-Modelle)
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        const isMobileUserAgent = mobileRegex.test(navigator.userAgent);
        
        // Prüfe auf iPad-spezifische User-Agent (für iPad Air, Pro, etc.)
        const isIPad = /iPad/i.test(navigator.userAgent) || 
                      (/Macintosh/i.test(navigator.userAgent) && hasTouchEvents);
        
        // Prüfe auf Bildschirmgröße (für Tablets)
        const isTabletSize = window.innerWidth <= 1366 && window.innerHeight <= 1024;
        
        console.log('Touch Events:', hasTouchEvents);
        console.log('Mobile User Agent:', isMobileUserAgent);
        console.log('Is iPad:', isIPad);
        console.log('Is Tablet Size:', isTabletSize);
        console.log('Screen Size:', window.innerWidth, 'x', window.innerHeight);
        
        // Zeige Controls an, wenn:
        // - Es ist ein bekanntes mobiles Gerät ODER
        // - Es ist ein iPad ODER
        // - Es hat Touch-Events UND ist in Tablet-Größe
        return isMobileUserAgent || isIPad || (hasTouchEvents && isTabletSize);
    })();
    
    if (shouldShowControls) {
        console.log('Mobile controls werden angezeigt');
        document.getElementById('mobile-controls').style.display = 'flex';
    } else {
        console.log('Mobile controls werden ausgeblendet');
        document.getElementById('mobile-controls').style.display = 'none';
    }
}

function hideMobileControls() {
    console.log('Mobile controls werden ausgeblendet (explizit)');
    document.getElementById('mobile-controls').style.display = 'none';
}




// Tastatur-Eventhandler
function keyboardKeyDown(event) {
    if (event.keyCode == 39) keyboard.RIGHT = true;
    if (event.keyCode == 37) keyboard.LEFT = true;
    if (event.keyCode == 38) keyboard.UP = true;
    if (event.keyCode == 40) keyboard.DOWN = true;
    if (event.keyCode == 32) keyboard.SPACE = true;
    if (event.keyCode == 77) keyboard.M = true;
    if (event.keyCode == 78) keyboard.N = true;
    // ggf Else Taste nicht belegt ton
}

function keyboardKeyUp(event) {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 32) keyboard.SPACE = false;
    if (event.keyCode == 77) keyboard.M = false;
    if (event.keyCode == 78) keyboard.N = false;
}

// Sobald das DOM geladen ist, wird init() aufgerufen.
window.addEventListener('load', init);

window.addEventListener('keyup', (event) => {

    if(event.keyCode == 39){
        keyboard.RIGHT = false;
    }

    if(event.keyCode == 37){
        keyboard.LEFT = false;
    }

    if(event.keyCode == 38){
        keyboard.UP = false;
    }

    if(event.keyCode == 40){
        keyboard.DOWN = false;
    }

    if(event.keyCode == 32){
        keyboard.SPACE = false;
    }

    if(event.keyCode == 77){
        keyboard.M = false;
    }

    if(event.keyCode == 78){
        keyboard.N = false;
    }
});

// Stelle sicher, dass das DOM vollständig geladen ist.
window.addEventListener('load', function() {
    // Hole die Buttons per ID
    const btnLeft = document.getElementById('btnLeft');
    const btnUp = document.getElementById('btnUp');
    const btnRight = document.getElementById('btnRight');
    const btnBottle = document.getElementById('btnBottle');

    // Für den linken Button
    btnLeft.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Verhindert unerwünschtes Scrollen
        keyboard.LEFT = true;
    });
    btnLeft.addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });

    // Für den Sprung-Button (oben)
    btnUp.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true; 
    });
    btnUp.addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    });

    // Für den rechten Button
    btnRight.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });
    btnRight.addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });

    // Für den Flaschen-Button (Werfen)
    btnBottle.addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.N = true; 
    });
    btnBottle.addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.N = false;
    });
});

// Aufgaben:
// Coins erstellen und einsammeln
// Flaschen erstellen und einsammeln als munition
// Flaschen nur werfen, wenn sie eingesammelt sind 
// Collision (drauf springen und besiegen können)
// Endgegner besiegen (energie anzeigen und 3 mal treffen oder drauf springen tötet ihn)
// Game Over Screen
// Full Screen Button für Vollbild Modus (pixel) Tipp: canvis Fullscreen
// Spielanleitung: welche Tasten welches Ziel
// Start Screen
// Musik und Sounds hinzufügen
// Favicon erstellen und einfügen

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
    
}

function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      // Gerät ist im Portraitmodus – zeige den OrientationScreen
      screenManager.showOrientationScreen();
    } else {
      // Gerät ist im Landscapemodus – zeige den StartScreen (oder den zuletzt genutzten Screen)
      screenManager.showStartScreen();
    }
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
        keyboard.UP = true;
    });
    btnUp.addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.UP = false;
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

});

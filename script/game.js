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
    // canvas = document.getElementById('canvas');
    // startScreen = new StartScreen(canvas, startGame);
    // startScreen.draw();
    // canvas.addEventListener('click', (event) => {
    //     startScreen.handleClick(event);
    // });
    
}


//*css*/`
function newGame(){
    console.log('neues spiel')
    // alle prozesse stoppen clear all inverals und inhalt der init.
}


// später ändern in einen Bildschirm Manager um andere Ansichten zu realisieren wie Pause, Game Over...
function startGame() {
    console.log('Spiel wird gestartet!');
    world = new World(canvas, keyboard);
}





window.addEventListener('keydown', (event) => {
    // console.log(event.keyCode);
    if(event.keyCode == 39){
        keyboard.RIGHT = true;
    }

    if(event.keyCode == 37){
        keyboard.LEFT = true;
    }

    if(event.keyCode == 38){
        keyboard.UP = true;
    }

    if(event.keyCode == 40){
        keyboard.DOWN = true;
    }

    if(event.keyCode == 32){
        keyboard.SPACE = true;
    }

    if(event.keyCode == 77){
        keyboard.M = true;
    }

    if(event.keyCode == 78){
        keyboard.N = true;
    }

    // Else für Warnton wegen falscher Taste, ggf. ausgabe in DIV
});


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
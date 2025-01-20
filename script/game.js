let canvas;
let world;

// function init() {
//     canvas = document.getElementById('canvas');
//     ctx = canvas.getContext('2d');
//     character.src = '../assets/img/2_character_pepe/2_walk/W-21.png';
//     ctx.drawImage(character, 20, 20, 50, 150);
// }

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    // // Warten, bis das Bild geladen ist
    // character.onload = function() {
    //     ctx.drawImage(character, 20, 20, 50, 150);
    // };

    // Warten, bis das Bild geladen ist
    // setTimeout(function () {
    //     ctx.drawImage(character, 20, 20, 50, 150);
    // }, 2000);
    
    console.log('My Character is: ', world.character);
    console.log('The enemies is: ', world.enemies);    
}
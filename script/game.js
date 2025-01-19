let canvas;
let ctx;
let character = new Image();

// function init() {
//     canvas = document.getElementById('canvas');
//     ctx = canvas.getContext('2d');
//     character.src = '../assets/img/2_character_pepe/2_walk/W-21.png';
//     ctx.drawImage(character, 20, 20, 50, 150);
// }

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    character.src = '../assets/img/2_character_pepe/2_walk/W-21.png';

    // Warten, bis das Bild geladen ist
    character.onload = function() {
        ctx.drawImage(character, 20, 20, 50, 150);
    };
}
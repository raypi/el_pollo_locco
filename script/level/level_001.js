// Zuerst definieren wir alle Elemente, die wir später für das Level brauchen

const coins = [];
const bottles = [];

const startXBottle = 200;
const startXCoin = 900;
const endX = 1800;
const gap = 100;

// Coins und Bottles abwechselnd platzieren
// for (let x = startXCoin; x <= endX; x += gap * 5) {
//     // Coins in einer Reihe
//     for (let i = 0; i < 5; i++) {
//         coins.push(new Coins());
//         coins[coins.length - 1].x = x + i * gap;
//         coins[coins.length - 1].y = 280; // Höhe der Coins
//     }

    // Bottles in einer Reihe
    // for (let i = 0; i < 5; i++) {
    //     let bottle = new Bottles();  // Neue Flasche erstellen
    //     bottle.x = startX + i * gap;  // Abstand von Flasche zu Flasche
    //     bottle.y = 280;   // Höhe der Flasche (kann angepasst werden)
    //     bottles.push(bottle);  // Flasche zum Array hinzufügen
    // }

    for (let i = 0; i < 5; i++) {
        let bottle = new Bottles();  // Neue Flasche erstellen
        bottle.x = startXBottle + i * gap;  // Abstand von Flasche zu Flasche
        bottle.y = 280;   // Höhe der Flasche (kann angepasst werden)
        bottles.push(bottle);  // Flasche zum Array hinzufügen
    }
 

// Jetzt definieren wir das Level-Objekt

const level001 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Cloud()
    ],
    [
        new BackgroundObject('assets/img/5_background/layers/air.png', -719),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/air.png', 719),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundObject('assets/img/5_background/layers/air.png', 1438),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 1438),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 1438),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 1438),
        new BackgroundObject('assets/img/5_background/layers/air.png', 2157),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 2157),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 2157),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 2157)
    ],
    coins, //einfügen der coins
    bottles // einfügen der bottles 
);
 
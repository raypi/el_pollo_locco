// Zuerst definieren wir alle Elemente, die wir später für das Level brauchen

 
// Jetzt definieren wir das Level-Objekt

function createLevel001() {
    return new Level(
        [
            new Chicken()
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
        [
            new Endboss((resultType) => {
                screenManager.showGameOverScreen(resultType);
            }),
        ],
        [
            new Coins(1200, 320),
            new Coins(1300, 250),
            new Coins(1400, 200),
            new Coins(1500, 250),
            new Coins(1600, 320),
        ],
        [
            new Bottles(400, 280),
            new Bottles(500, 280),
            new Bottles(600, 280),
            new Bottles(700, 280),
            new Bottles(800, 280),
        ],
        [
            // new SmalChicken(),
            // new SmalChicken(),
            // new SmalChicken(),
            // new SmalChicken(),
            // new SmalChicken(),
            // new SmalChicken()

        ]
    );
}

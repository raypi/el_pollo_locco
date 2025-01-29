class Level {
    enemies;
    clouds;
    endboss;
    backgroundObject;
    coins; // coins in level einfügen
    bottles; // bottles in das level einfügen
    level_end_x = 2255;



constructor(enemies, clouds, backgroundObject, endboss, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.endboss = endboss;
    this.backgroundObject = backgroundObject;
    this.coins = coins;
    this.bottles = bottles;
}
}
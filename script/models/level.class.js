class Level {
    enemies;
    clouds;
    endboss;
    backgroundObject;
    coins;
    bottles;
    smalChicken;
    level_end_x = 2255;



constructor(enemies, clouds, backgroundObject, endboss, coins, bottles, smalChicken) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.endboss = endboss;
    this.backgroundObject = backgroundObject;
    this.coins = coins;
    this.bottles = bottles;
    this.smalChicken = smalChicken;
}
}
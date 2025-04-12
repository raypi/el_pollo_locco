class Level {
    enemies;
    clouds;
    endboss;
    backgroundObject;
    coins;
    bottles;
    smalChicken;
    level_end_x = 2450;



constructor(enemies, clouds, backgroundObject, endboss, coins, bottles, smalChicken) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObject = backgroundObject;
    this.endboss = endboss;
    this.coins = coins;
    this.bottles = bottles;
    this.smalChicken = smalChicken;
}
}
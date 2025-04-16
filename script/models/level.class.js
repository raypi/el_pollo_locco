/**
 * Represents a game level.
 */
class Level {
    enemies;
    clouds;
    endboss;
    backgroundObject;
    coins;
    bottles;
    smalChicken;
    level_end_x = 2450;


 /**
   * Creates a new Level instance.
   * @param {Array} enemies - Array of enemy objects.
   * @param {Array} clouds - Array of cloud objects.
   * @param {Array} backgroundObject - Array of background objects.
   * @param {Array} endboss - Array of endboss objects.
   * @param {Array} coins - Array of coin objects.
   * @param {Array} bottles - Array of bottle objects.
   * @param {Array} smalChicken - Array of small chicken objects.
   */
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
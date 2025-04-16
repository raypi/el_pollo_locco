/**
 * Represents a coin that can be drawn on the canvas.
 * @extends DrawableObject
 */
class Coins extends DrawableObject {
/**
   * Array of coin image paths.
   * @type {string[]}
   */
    IMAGES_COINS = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ];

     /**
   * Creates an instance of Coins.
   * @param {number} x - The x-coordinate where the coin is placed.
   * @param {number} y - The y-coordinate where the coin is placed.
   */
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_COINS[0]);
        this.x = x;
        this.y = y;
    }
}

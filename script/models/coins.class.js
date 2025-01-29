class Coins extends DrawableObject {

    IMAGES_COINS = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_COINS[0]);
        this.x = x;
        this.y = y;
    }
}

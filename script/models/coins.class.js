class Coins extends DrawableObject {

    IMAGES_COINS = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_COINS[0]);
    }
}

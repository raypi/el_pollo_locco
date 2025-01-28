class StatusBar extends DrawableObject {
    // Neue Typ-Definition: Typ dieser StatusBar (Health, Coin, Bottle)
    type;

    IMAGES_HEALTH = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    IMAGES_COIN = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    IMAGES_BOTTLE = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    percentage = 100; // Standardwert

    constructor(type) {
        super();
        this.type = type; // Health, Coin oder Bottle
        this.x = 0;
        this.y = 0;
        this.width = 200;
        this.height = 50;

        // Lade die richtigen Bilder basierend auf dem Typ
        if (this.type === 'Health') {
            this.loadImages(this.IMAGES_HEALTH);
            this.setPercentage(100); // Standard für Health
        } else if (this.type === 'Coin') {
            this.loadImages(this.IMAGES_COIN);
            this.setPercentage(80); // Standard für Coins
        } else if (this.type === 'Bottle') {
            this.loadImages(this.IMAGES_BOTTLE);
            this.setPercentage(60); // Standard für Bottles
        }
    }

    setPercentage(percentage) {
        this.percentage = percentage;

        let path;
        if (this.type === 'Health') {
            path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        } else if (this.type === 'Coin') {
            path = this.IMAGES_COIN[this.resolveImageIndex()];
        } else if (this.type === 'Bottle') {
            path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        }

        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}

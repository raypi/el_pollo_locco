class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    constructor(imagaPath, x) {
        super().loadImage(imagaPath);
        this.y = 480 - this.height; // Gesammthöhe Canvas 480 - 400(höhe Grafik) = 80
        this.x = x;
    }
}
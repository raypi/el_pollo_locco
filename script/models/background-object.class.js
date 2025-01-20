class BackgroundObject extends MovableObject {
    width = 720;
    height = 400;
    constructor(imagaPath, x, y) {
        super().loadImage(imagaPath);
        this.y = y;
        this.x = x;
    }
}
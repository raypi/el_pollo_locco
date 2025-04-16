class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    constructor(imagaPath, x) {
        super().loadImage(imagaPath);
        this.y = 480 - this.height;
        this.x = x;
    }
}
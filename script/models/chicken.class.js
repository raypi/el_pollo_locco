class Chicken extends MovableObject {
    width = 60;
    height = 60;
    y = 365;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    // currentImage = 0;

    constructor(){
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() + 0.25;
        this.animate();
    }
   

    animate(){
        this.moveLeft();

        setInterval(() => {
            let index = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6 
            // i = 0, 1, 2, 3, 4, 5, nicht 6 sondern 0, 1, 2, ...    
            let path = this.IMAGES_WALKING[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);    
    }
}

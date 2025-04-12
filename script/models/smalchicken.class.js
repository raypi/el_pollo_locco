class SmalChicken extends MovableObject {
    width = 60;
    height = 60;
    y = 365;
    alive = true;
    state = "alive";

    
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    

    constructor(){
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random() * 500;
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

    //Bild wenn getötet 
    deadAnimation() {
        this.loadImage('assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        setTimeout(() => {
            // Entfernen nach Animation
            this.isDead = true; // Optionales Flag
        }, 1000); // Nach 1000 ms = 1s
    }
}
class SmalChicken extends MovableObject {
    width = 40;
    height = 40;
    y = 380;
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

        this.x = 500 + Math.random() * 2300;
        this.speed = 0.15 + Math.random() + 0.25;
        this.animate();
    }
   

    animate(){
        this.moveLeft();
        this.animationInterval = setInterval(() => {
            if (this.alive) {
                let index = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[index];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                clearInterval(this.animationInterval);
                this.loadImage(this.IMAGES_DEAD[0]);
            }
        }, 200);    
    }

    deadAnimation() {
        // Set chicken as dead
        this.alive = false;
        this.state = "dead";
                
        setTimeout(() => {
            this.isDead = true;
        }, 1000);
    }
}

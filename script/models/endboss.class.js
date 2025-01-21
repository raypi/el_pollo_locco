class Endboss extends MovableObject{
    width = 300;
    height = 300;
    y = 150;
    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    

    constructor(){
        super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() + 0.25;
        this.animate();
    }
   

    animate(){
        // this.moveLeft();

        setInterval(() => {
            let index = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6 
            // i = 0, 1, 2, 3, 4, 5, nicht 6 sondern 0, 1, 2, ...    
            let path = this.IMAGES_WALKING[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);    
    }
}
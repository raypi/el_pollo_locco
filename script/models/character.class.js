class Character extends MovableObject {
    
    height = 280;
    x = 100;
    y = 150;
    speed = 5;
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    // currentImage = 0;
    world;

    constructor(){
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate(){
        // Turbogang für Pepe
        
        setInterval(() => {
            // console.log(this.world.level.level_end_x);
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {

            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                
                    // walk animation
                    let index = this.currentImage % this.IMAGES_WALKING.length;
                    let path = this.IMAGES_WALKING[index];
                    this.img = this.imageCache[path];
                    this.currentImage++;
            }
    }, 100);    
    }

 
    // Funktion zum springen des Pepe
    jump(){
        
    } 

}
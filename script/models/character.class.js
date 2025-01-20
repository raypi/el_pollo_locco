class Character extends MovableObject {
    
    height = 280;
    x = 100;
    y = 150;
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    // currentImage = 0;

    constructor(){
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate(){
        setInterval(() => {
        let index = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6 
        // i = 0, 1, 2, 3, 4, 5, nicht 6 sondern 0, 1, 2, ...    
        let path = this.IMAGES_WALKING[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }, 250);    
    }

    jump(){
        
    } 

}
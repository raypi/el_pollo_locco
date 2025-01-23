class ThrowableObject extends MovableObject {

    constructor(){
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = 150;
        this.y = 300;
        this.height = 60;
        this.width = 50;
        this.trow(200, 300);
    }
   
    trow(x, y){
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
    }
}   
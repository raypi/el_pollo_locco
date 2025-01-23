class ThrowableObject extends MovableObject {

    constructor(){
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = 150;
        this.y = 300;
        this.height = 60;
        this.width = 50;
        this.trow(200, 300);
    }
   

    // fällt Aktuell nur bis 151px da in applyGravity() auf isAboveGrund() zurück gegriffen wird 
    // neue function oder if abfrgae mit was diese ausgeführt wird?
    trow(x, y){
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 50);
    }
}   
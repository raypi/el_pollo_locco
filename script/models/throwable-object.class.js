class ThrowableObject extends MovableObject {

    constructor(x, y){
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.trow();
    }
   

    // fällt Aktuell nur bis 151px da in applyGravity() auf isAboveGrund() zurück gegriffen wird 
    // neue function oder if abfrgae mit was diese ausgeführt wird?
    trow(){
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}   
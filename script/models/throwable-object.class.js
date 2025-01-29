class ThrowableObject extends MovableObject {

    constructor(x, y){
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        //this.trow();
    }
   

    // applyGravity() auf isAboveGrund() zurück gegriffen wird 
    trow(){
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }


    throwHigh() {
        this.speedY = 25; // geringere Höhe für bessere Sichtbarkeit
        this.applyGravity();
        setInterval(() => {
            this.x += 8; // Horizontale Geschwindigkeit
        }, 25);
    }


    throwHorizontal() {
        this.speedY = 5; // geringer Anstieg
        this.applyGravity();
        setInterval(() => {
            this.x += 15; // Schnellere horizontale Geschwindigkeit
        }, 25);
    }
}   
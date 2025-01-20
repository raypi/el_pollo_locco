class Cloud extends MovableObject {
    y = 20; // aussehalb danicht dynamisch sein soll 
    height = 250;
    width = 500;

    constructor(){
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
    }
}
class ThrowableObject extends MovableObject {
    static countBottle = 0;
    constructor(x, y) {
      super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
      this.loadImages(Bottles.IMAGES_BOTTLES_ROTATION);
      this.loadImages(Bottles.IMAGES_BOTTLES_SPLASH);
      this.x = x; this.y = y;
      this.height = 60; this.width = 50;
      this.rotationInterval = null; this.isThrown = false;
      this.speedY = 0;
    }
    throwGravity() {
      if (this.isThrown) {
        this.speedY += this.acceleration;
        this.y += this.speedY;
      }
    }
    throwHigh() {
      if (this.isThrown) return;
      this.isThrown = true; this.animateRotation();
      this.speedY = -18; this.speedX = 10;
      let moveInterval = setInterval(() => { this.x += this.speedX; this.throwGravity(); if (!this.isAboveGrund()) { clearInterval(moveInterval); this.splashBottle(); } }, 25);
    }
    throwHorizontal() {
      if (this.isThrown) return;
      this.isThrown = true; this.animateRotation();
      this.speedY = 0; this.speedX = 15;
      let moveInterval = setInterval(() => { this.x += this.speedX; this.throwGravity(); if (!this.isAboveGrund()) { clearInterval(moveInterval); this.splashBottle(); } }, 25);
    }
    animateRotation() {
      let i = 0;
      this.rotationInterval = setInterval(() => { this.loadImage(Bottles.IMAGES_BOTTLES_ROTATION[i]); i = (i + 1) % Bottles.IMAGES_BOTTLES_ROTATION.length; }, 100);
    }
    splashBottle() {
      clearInterval(this.rotationInterval);
      let i = 0;
      let splashInterval = setInterval(() => { this.loadImage(Bottles.IMAGES_BOTTLES_SPLASH[i]); i++; if (i >= Bottles.IMAGES_BOTTLES_SPLASH.length) { clearInterval(splashInterval); setTimeout(() => { this.removeFromWorld = true; }, 100); } }, 100);
    }
  }
  

// class ThrowableObject extends MovableObject {

//     static countBottle = 0;

//      constructor(x, y){
//         super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
//         this.loadImages(Bottles.IMAGES_BOTTLES_ROTATION);
//         this.loadImages(Bottles.IMAGES_BOTTLES_SPLASH);
//         this.x = x;
//         this.y = y;
//         this.height = 60;
//         this.width = 50;
//         this.rotationInterval = null;
//         this.isThrown = false;
//         this.speedY = 0;
//     }
   
//     // Die Methode, die nur für das Werfen und die Schwerkraft verantwortlich ist
//     throwGravity() {
//         // Die Schwerkraft wird nur angewendet, wenn das Objekt geworfen wurde
//         if (this.isThrown) {
//             this.speedY += this.acceleration; // Schwerkraft beschleunigt nach unten
//             this.y += this.speedY;            // Y-Position anpassen
//         }
//     }

//     // Methode für den Wurf (High)
//     throwHigh() {
//         if (this.isThrown) return;
//         this.isThrown = true;
//         this.animateRotation();
    
//         // Startgeschwindigkeit in Y und X-Richtung
//         this.speedY = -18;  // Negative Y-Geschwindigkeit für einen Bogen (nach oben)
//         this.speedX = 10;   // Konstante horizontale Geschwindigkeit
    
//         // Schwerkraftanwendung und Bewegung
//         let moveInterval = setInterval(() => {
//             this.x += this.speedX;    // Konstante horizontale Bewegung
//             this.throwGravity();       // Schwerkraft anwenden (verändert die Y-Position)
    
//             // Wenn die Flasche den Boden erreicht hat
//             if (!this.isAboveGrund()) {
//                 clearInterval(moveInterval);
//                 this.splashBottle();   // Flasche zerbrechen
//             }
//         }, 25);
//     }

//     // Methode für den horizontalen Wurf
//     throwHorizontal() {
//         if (this.isThrown) return;
//         this.isThrown = true;
//         this.animateRotation();
    
//         // Kaum vertikale Bewegung zu Beginn, Schwerkraft zieht später sanft nach unten
//         this.speedY = 0;  // Startet fast horizontal
//         this.speedX = 15; // Konstante horizontale Geschwindigkeit
    
//         // Schwerkraftanwendung und Bewegung
//         let moveInterval = setInterval(() => {
//             this.x += this.speedX;    // Horizontale Bewegung bleibt konstant
//             this.throwGravity();       // Schwerkraft wird angewendet, aber mit minimaler Wirkung auf die Y-Position
    
//             // Wenn die Flasche den Boden erreicht
//             if (!this.isAboveGrund()) {
//                 clearInterval(moveInterval);
//                 this.splashBottle();   // Flasche zerbrechen
//             }
//         }, 25);
//     }
    

//     // Rotation der Flasche animieren
//     animateRotation() {
//         let i = 0;
//         this.rotationInterval = setInterval(() => {
//             this.loadImage(Bottles.IMAGES_BOTTLES_ROTATION[i]);
//             i = (i + 1) % Bottles.IMAGES_BOTTLES_ROTATION.length;
//         }, 100);
//     }

//     // Splash-Animation (Zerbrechen der Flasche)
//     splashBottle() {
//         clearInterval(this.rotationInterval);
//             let i = 0;
//             let splashInterval = setInterval(() => {
//             this.loadImage(Bottles.IMAGES_BOTTLES_SPLASH[i]);
//             i++;
//         if (i >= Bottles.IMAGES_BOTTLES_SPLASH.length) {
//             clearInterval(splashInterval);

            
//             setTimeout(() => {
//                 // this.loadImage(''); 
//                 this.removeFromWorld = true; 
//             }, 100);
//         }
//     }, 100);

//     } 
// }

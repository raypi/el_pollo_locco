class MovableObject extends DrawableObject { // bewegbare Objekte
   
     currentImage = 0;
     speed = 0.15;
     otherDirection = false;
     speedY = 0;
     acceleration = 1; // Fallgeschwindigkeit in pixel pro durchlauf
     energy = 100;
     lasthit = 0;

     applyGravity(){
         setInterval(() => {
            if(this.isAboveGrund() || this.speedY > 0) {
               this.y -= this.speedY;
               this.speedY -= this.acceleration;
               // console.log('speedY:', this.speedY); // Ausgabe von speedY in der Konsole
            }
         }, 1000 / 25);
     }


     isAboveGrund() {
      if (this instanceof ThrowableObject) {
          return this.y < 400; // Bodenhöhe für die Flasche
      } else {
          return this.y < 151; // Standardhöhe für andere Objekte
      }
  }
      
   
   

   moveRight() { 
      this.x += this.speed;
      console.log('Moving right!');
   }


   moveLeft(){
      setInterval(() => {
          this.x -= this.speed;
      }, 1000 / 60);   
  }

  jump(){
   this.speedY = 22;
  }

  // kann zum beispiel Huhn eingeben und prüfen ob mein Character damit kollidiert  
  isColliding(mo) {
   return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height;
   } 

   hit() {
      this.energy -= 5; 
      if (this.energy < 0) {
         this.energy = 0;
      } else {
         this.lasthit = new Date().getTime(); // speiert Zeit in Zahlenform seid dem 01.01.1970 in Milisekunden
      }
   }

   isDead(){
      return this.energy == 0;

   }

   isHurt(){
      let timeDuration = new Date().getTime()- this.lasthit; // errechnet uns die Differenz in Milisekunden
      timeDuration = timeDuration / 1000; // rechnet die Differenz in sekunden um 
      //  
       return timeDuration < 1; // gibt true zurück
   }

   playAnimation(images) {
      let index = this.currentImage % images.length;    
                    let path = images[index];
                    this.img = this.imageCache[path];
                    this.currentImage++;
   }
}

// if (charachter.x + charachter.width > chicken.x &&
//    charachter.y +charachter.height > chicken.y &&
//    charachter.x < chicken.x &&
//    charachter.y < chicken.y + chicken.height
// )

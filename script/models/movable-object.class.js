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
          return this.y < 380; // Bodenhöhe für die Flasche
      } else {
          return this.y < 151; // Standardhöhe für andere Objekte
      }
  }
      
   
   

   moveRight() { 
      this.x += this.speed;
      // console.log('Moving right!');
   }


//    moveLeft(){
//       setInterval(() => {
//           this.x -= this.speed;
//       }, 1000 / 60);   
//   }

  moveLeft() {
   // Falls das Objekt einen state hat (z. B. Endboss) und nicht "alive" ist, tue nichts.
   if (this.state && this.state !== "alive") return;
   
   setInterval(() => {
     if (this.state && this.state !== "alive") return; // keine Bewegung, wenn nicht alive
     this.x -= this.speed;
   }, 1000 / 60);
 }


  jump(){
   AudioHub.stopOneSound(AudioHub.JUMP);
      AudioHub.playOneSound(AudioHub.JUMP);
   this.speedY = 22;
  }

isColliding(mo) {
   if (this instanceof Character) {
       return (
           this.x + 60 + this.width - 105 > mo.x &&
           this.y + this.height > mo.y &&
           this.x + 60 < mo.x + mo.width &&
           this.y + 130 < mo.y + mo.height
       );
   } else {
       return (
           this.x + this.width > mo.x &&
           this.y + this.height > mo.y &&
           this.x < mo.x + mo.width &&
           this.y < mo.y + mo.height
       );
   }
}


   // hit() {
   //    AudioHub.stopOneSound(AudioHub.HITCHARACTER);
   //    AudioHub.playOneSound(AudioHub.HITCHARACTER);
   //    this.energy -= 10; 
   //    if (this.energy < 0) {
   //       this.energy = 0;
   //    } else {
   //       this.lasthit = new Date().getTime(); // speiert Zeit in Zahlenform seid dem 01.01.1970 in Milisekunden
   //    }
   // }

   hit() {
      // Aktuelle Zeit holen
      let currentTime = new Date().getTime();
      // Prüfen, ob seit dem letzten Treffer mindestens 2 Sekunden vergangen sind
      if (currentTime - this.lasthit < 2000) {
         return; // Verlasse die Methode, wenn noch nicht 2 Sekunden vergangen sind
      }
      AudioHub.stopOneSound(AudioHub.HITCHARACTER);
      AudioHub.playOneSound(AudioHub.HITCHARACTER);
      this.energy -= 20;
      if (this.energy < 0) {
         this.energy = 0;
      }
      this.lasthit = currentTime;

      if (this.energy <= 20 && this instanceof Character) {
         this.dieCharacter();
      }
   }
   

   isDead(){
      return this.energy < 20;

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

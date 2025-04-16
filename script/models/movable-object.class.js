class MovableObject extends DrawableObject { 
   
     currentImage = 0;
     speed = 0.15;
     otherDirection = false;
     speedY = 0;
     acceleration = 1;
     energy = 100;
     lasthit = 0;

     applyGravity(){
         setInterval(() => {
            if(this.isAboveGrund() || this.speedY > 0) {
               this.y -= this.speedY;
               this.speedY -= this.acceleration;
            }
         }, 1000 / 25);
     }


     isAboveGrund() {
      if (this instanceof ThrowableObject) {
          return this.y < 380;
      } else {
          return this.y < 151; 
      }
  }
      
   moveRight() { 
      this.x += this.speed;
   }


  moveLeft() {
   if (this.state && this.state !== "alive") return;
   
   setInterval(() => {
     if (this.state && this.state !== "alive") return; 
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

   hit() {
      let currentTime = new Date().getTime();
      if (currentTime - this.lasthit < 2000) {
         return; 
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
      return this.energy <= 20;

   }

   isHurt(){
      let timeDuration = new Date().getTime()- this.lasthit; 
      timeDuration = timeDuration / 1000; 
       return timeDuration < 1; 
   }

   playAnimation(images) {
      let index = this.currentImage % images.length;    
                    let path = images[index];
                    this.img = this.imageCache[path];
                    this.currentImage++;
   }
}

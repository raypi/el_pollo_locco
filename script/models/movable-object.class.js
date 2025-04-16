/**
 * Base class for all movable objects in the game.
 * Extends DrawableObject with physics, collision detection, and animation capabilities.
 */
class MovableObject extends DrawableObject { 
   currentImage = 0;
   speed = 0.15;
   otherDirection = false;
   speedY = 0;
   acceleration = 1;
   energy = 100;
   lasthit = 0;

   /**
    * Applies gravity to the object, making it fall when above ground.
    */
   applyGravity(){
       setInterval(() => {
          if(this.isAboveGrund() || this.speedY > 0) {
             this.y -= this.speedY;
             this.speedY -= this.acceleration;
          }
       }, 1000 / 25);
   }

   /**
    * Checks if the object is above the ground.
    * @returns {boolean} True if the object is above ground, false otherwise.
    */
   isAboveGrund() {
    if (this instanceof ThrowableObject) {
        return this.y < 380;
    } else {
        return this.y < 151; 
    }
   }
      
   /**
    * Moves the object to the right.
    */
   moveRight() { 
      this.x += this.speed;
   }

   /**
    * Moves the object to the left if it's in the "alive" state.
    */
   moveLeft() {
     if (this.state && this.state !== "alive") return;
     
     setInterval(() => {
       if (this.state && this.state !== "alive") return; 
       this.x -= this.speed;
     }, 1000 / 60);
   }

   /**
    * Makes the object jump by setting a positive vertical speed.
    */
   jump(){
     AudioHub.stopOneSound(AudioHub.JUMP);
     AudioHub.playOneSound(AudioHub.JUMP);
     this.speedY = 22;
   }

   /**
    * Checks if this object is colliding with another movable object.
    * Uses different collision boxes for Character vs other objects.
    * @param {MovableObject} mo - The other movable object to check collision with.
    * @returns {boolean} True if objects are colliding, false otherwise.
    */
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

   /**
    * Reduces the object's energy when hit, with a cooldown period between hits.
    * Triggers death animation for Character if energy is critically low.
    */
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
   
   /**
    * Checks if the object is dead (energy <= 20).
    * @returns {boolean} True if the object is dead, false otherwise.
    */
   isDead(){
      return this.energy <= 20;
   }

   /**
    * Checks if the object was recently hit and is still in the hurt state.
    * @returns {boolean} True if the object is hurt, false otherwise.
    */
   isHurt(){
      let timeDuration = new Date().getTime()- this.lasthit; 
      timeDuration = timeDuration / 1000; 
      return timeDuration < 1; 
   }

   /**
    * Plays an animation by cycling through the provided images.
    * @param {Array} images - Array of image paths to animate through.
    */
   playAnimation(images) {
      let index = this.currentImage % images.length;    
      let path = images[index];
      this.img = this.imageCache[path];
      this.currentImage++;
   }
}

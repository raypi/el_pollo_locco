class MovableObject {
     x = 100;
     y = 280;
     img;
     height = 150;
     width = 100; 
     imageCache = {};
     currentImage = 0;
     speed = 0.15;
     otherDirection = false;
     speedY = 0;
     acceleration = 1; // Fallgeschwindigkeit in pixel pro durchlauf
     energy = 100;

     applyGravity(){
         setInterval(() => {
            if(this.isAboveGrund() || this.speedY > 0) {
               this.y -= this.speedY;
               this.speedY -= this.acceleration;
               console.log('speedY:', this.speedY); // Ausgabe von speedY in der Konsole
            }
         }, 1000 / 25);
     }


     isAboveGrund(){
      return this.y < 151;
     }

// loadImg('img(test.png')
   loadImage(path){
      this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
      this.img.src = path;
   }

   draw(ctx){
      ctx.drawImage(this.img, this.x, this.y,  this.width, this.height);
   }

   drawBox(ctx) {
      if(this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y,  this.width, this.height);
      ctx.stroke();
      }
   }

   loadImages(arr){
      arr.forEach((path) => {
         let img = new Image();
         img.src = path;
         this.imageCache[path] = img;
      });   
   }


   moveRight() { 
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
      }
   }

}

// if (charachter.x + charachter.width > chicken.x &&
//    charachter.y +charachter.height > chicken.y &&
//    charachter.x < chicken.x &&
//    charachter.y < chicken.y + chicken.height
// )

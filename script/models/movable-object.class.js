class MovableObject {
     x = 120;
     y = 400;
     img;
// loadImg('img(test.png')
   loadImage(path){
      this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
      this.img.src = path;
   }

   moveRight() { 
      console.log('Moving right!');
   }

   moveLeft(){
      console.log('Move left');
   }
}
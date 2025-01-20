class MovableObject {
     x = 100;
     y = 250;
     img;
     height = 150;
     width = 100; 

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
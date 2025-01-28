class World {
    
    character = new Character();
    level = level001;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new StatusBar();
    throwableObjects = [];

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
        this.character.keyboard = this.keyboard;
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects(){
        if (this.keyboard.M) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObjects.push(bottle);
        }
    }


    checkCollisions(){
        // prüft Kollisionen mit Gegenern 
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                // console.log('Kollision mit: ', enemy);
                this.character.hit();
                this.statusBar.setPercentageHealth(this.character.energy);
                console.log('Energie: ', this.character.energy);
            }
        });
    }

    updateCoinBar() {
        // zählen der coin beim einsammeln
        let newCoinValue = 100;  // coin = 100 oder als Zufallswert für Test: Math.random() * 100
        this.statusBar.setPercentageCoin(newCoinValue);
        console.log('Coins aktualisiert: ', newCoinValue);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObject);

        this.ctx.translate(-this.camera_x, 0);
        // Space for Fixed Anzeigen
        this.statusBar.y = 0;  
        this.addToMap(this.statusBar); 
        // Coin-Bar unter der Health-Bar
        this.coinBar.y = 40;  // Position der Coin-Bar unter der Health Bar
        this.addToMap(this.coinBar);
        // Cam Runs with Caracter 
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        

        this.ctx.translate(-this.camera_x, 0);
        
        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawBox(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
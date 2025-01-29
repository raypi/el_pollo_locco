class World {
    character = new Character();
    level = level001;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    // Jede StatusBar erhält einen eigenen Typ
    statusBar = new StatusBar('Health');
    coinBar = new StatusBar('Coin');
    bottleBar = new StatusBar('Bottle');

    throwableObjects = [];
    bottle = new Bottles();
    coins = new Coins();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        // D E B U G
        console.log('DG Constructor World, Coins:', this.level.coins);
        console.log('DG Constructor World, Bottles:', this.level.bottles);
    }

    setWorld() {
        this.character.world = this;
        this.character.keyboard = this.keyboard;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.collectingCoins();
            this.collectingBottles();
        }, 200);
    }

    checkThrowObjects() { // Flasche werfen 
        if (this.keyboard.M) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy); // Health aktualisieren
                console.log('Energie: ', this.character.energy);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObject);
    
        this.ctx.translate(-this.camera_x, 0);
    
        // Statusbars zeichnen
        this.statusBar.y = 0;
        this.addToMap(this.statusBar);
    
        this.coinBar.y = 40;
        this.addToMap(this.coinBar);
    
        this.bottleBar.y = 80;
        this.addToMap(this.bottleBar);
    
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
    
        
        
        // Coins und Bottles zeichnen
        this.addObjectsToMap(this.level.bottles);
        console.log('DG World Draw, Bottel:', this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        console.log('DG World Draw, Coins:', this.level.coins);
    
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
    
        this.ctx.translate(-this.camera_x, 0);
    
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
    

    // addObjectsToMap(objects) {
    //     objects.forEach(o => {
    //         this.addToMap(o);
    //     });
    // }


    addObjectsToMap(objects) {
        if (!objects || objects.length === 0) return; // Sicherheitsprüfung
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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    collectingCoins(){
        this.level.coins = this.level.coins.filter((coin) => {
            if (this.character.isColliding(coin)) {
                console.log('Coin eingesammelt!', coin);
                this.coinBar.setPercentage(this.coinBar.percentage + 10);
                return false; // Coin wird entfernt
            }
            return true; // Coin bleibt in der Welt
        });
    }

    collectingBottles() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                console.log('Bottle eingesammelt!', bottle);
                this.bottleBar.setPercentage(this.bottleBar.percentage + 10); // Beispiel: Flaschenanzeige aktualisieren
                return false; // Bottle wird entfernt
            }
            return true; // Bottle bleibt in der Welt
        });
    }    

}
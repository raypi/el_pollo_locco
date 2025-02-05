class World {
    character = new Character();
    level = level001;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    countOpponents = 0;

    // Jede StatusBar erhält einen eigenen Typ
    statusBar = new StatusBar('Health');
    coinBar = new StatusBar('Coin');
    bottleBar = new StatusBar('Bottle');
    endbossBar = new StatusBar('Endboss');

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
        // console.log('DG Constructor World, Coins:', this.level.coins);
        // console.log('DG Constructor World, Bottles:', this.level.bottles);
    }

    setWorld() {
        this.character.world = this;
        this.character.keyboard = this.keyboard;
    }

    run() {
        setInterval(() => {
            // this.checkCollisions();
            this.checkThrowObjects();
            this.collectingCoins();
            this.collectingBottles();
            //this.checkSmalChickenCollisions();
            // this.checkChickenCollisions();
            this.checkJumpChickenCollisions();
            //this.cCCollisions();
            this.chickenBottle()
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.M) {
            // Hoher Wurf
            if (ThrowableObject.countBottle > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                bottle.throwHigh();
                this.throwableObjects.push(bottle);
                ThrowableObject.countBottle--; // Flasche verbrauchen
                console.log(`Flasche geworfen! Verbleibende Flaschen: ${ThrowableObject.countBottle}`);
            } else {
                console.log('Keine Flaschen verfügbar, um zu werfen!');
            }
        }
    
        if (this.keyboard.N) {
            // Waagerechter Wurf
            if (ThrowableObject.countBottle > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                bottle.throwHorizontal();
                this.throwableObjects.push(bottle);
                ThrowableObject.countBottle--; // Flasche verbrauchen
                console.log(`Flasche geworfen! Verbleibende Flaschen: ${ThrowableObject.countBottle}`);
            } else {
                console.log('Keine Flaschen verfügbar, um zu werfen!');
            }
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
        
        this.level.enemies = this.level.enemies.filter((enemy) => !enemy.removeFromWorld);
        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.level.smalChicken);
        this.addObjectsToMap(this.level.endboss);
    
        
        
        // Coins und Bottles zeichnen
        this.addObjectsToMap(this.level.bottles);
        // console.log('DG World Draw, Bottel:', this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        // console.log('DG World Draw, Coins:', this.level.coins);
    
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
                this.coinBar.setPercentage(Math.min(this.coinBar.percentage + 10, 100));// Test
                return false; // Coin wird entfernt
            }
            return true; // Coin bleibt in der Welt
        });
    }

    collectingBottles() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                console.log('Fkasche eingesammelt', bottle);
                this.bottleBar.setPercentage(Math.min(this.bottleBar.percentage + 10, 100));
                
                // Erhöhe den Zähler der gesammelten Flaschen
                ThrowableObject.countBottle++;
                console.log('Flaschen:', ThrowableObject.countBottle);
    
                return false; // Bottle wird entfernt
            }
            return true; // Bottle bleibt in der Welt
        });
    }
    
    
    checkSmalChickenCollisions() {
        this.level.smalChicken.forEach((chicken) => {
            if (this.character.isColliding(chicken)) {
                // Prüfen, ob der Spieler von oben auf das kleine Huhn springt
                if (this.character.speedY < 0) { // Spieler fällt nach unten
                    this.countOpponents += 5; // Punkte buchen
                    console.log('[road]killed SmalChicken! Punkte: ', this.countOpponents);
                    chicken.removeFromWorld = true; // entfernen
                } else {
                    console.log('Schaden genommen von SmalChicken!');
                    this.character.hit(); // Schaden buchen
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
        // Entferne markierte kleine Hühner aus der Liste
        //this.level.smalChicken = this.level.smalChicken.filter((chicken) => !chicken.removeFromWorld);
    }
    
    checkChickenCollisions() {
        // Prüfen, ob der Charakter nicht springt
        if (this.character.speedY == 0) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    console.log('Spieler läuft gegen Huhn');
                    this.character.hit(); // Schaden buchen
                    this.statusBar.setPercentage(this.character.energy);
                }
            });
        }
    }


    checkJumpChickenCollisions() {
        this.level.enemies.forEach((enemy) => {
            // Aktionen nur ausführen, wenn beide Bedingungen erfüllt sind
            if (this.character.isColliding(enemy) && this.character.speedY < 0) {
                console.log('Spieler springt auf Huhn');
                console.log('PepeY:', this.character.y);
    
                // Zeige das Todesbild
                enemy.loadImage(enemy.IMAGES_DEATH[0]);
                
                // Verzögertes Entfernen des Huhns nach 1 Sekunde
                setTimeout(() => {
                    enemy.removeFromWorld = true;
                    console.log('Huhn entfernt');
                }, 1000);
            }
        });
    }
    
    
    chickenBottle() {
        // Gehe durch alle Hühner im Level
        this.level.enemies.forEach((enemy) => {
            // Prüfen, ob eine Flasche vorhanden ist und ob sie das Huhn trifft
            if (this.throwableObjects.length > 0) {
                let bottle = this.throwableObjects[0]; // Aktuelle Flasche
                if (bottle.isColliding(enemy)) {
                    console.log('Flasche trifft Huhn!');
                    
                    // Zeige das Todesbild des Huhns
                    enemy.loadImage(enemy.IMAGES_DEATH[0]);
    
                    // Entferne das Huhn nach 1 Sekunde
                    setTimeout(() => {
                        enemy.removeFromWorld = true;
                        console.log('Huhn entfernt');
                    }, 1000);
    
                    // Keine separate Entfernung der Flasche nötig, da splashBottle() sie bereits entfernt
                }
            }
        });
    }
    
    
    checkEndbossCollisions() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                console.log('Spieler läuft gegen Huhn');
                this.character.hit(); // Schaden buchen
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }


}



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
    endbossBar;

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
        this.contactBossBar = false;
        this.stopped = false; // Flag stopGame
        // mobile Steuerung
        this.controlLeftImg = new Image();
        this.controlLeftImg.src = 'assets/button/arrowleft.png';
        this.controlUpImg = new Image();
        this.controlUpImg.src = 'assets/button/arrowup.png';
        this.controlRightImg = new Image();
        this.controlRightImg.src = 'assets/button/arrowright.png';    
       
         
       
        // console.log('DG Constructor World, Coins:', this.level.coins);
        // console.log('DG Constructor World, Bottles:', this.level.bottles);
    }

    setWorld() {
        this.character.world = this;
        this.character.keyboard = this.keyboard;
        //  this.level.endboss[0].world = this;
        
    }

    run() {
        this.runIntervalId = setInterval(() => {
            // this.checkCollisions();
            this.checkThrowObjects();
            this.collectingCoins();
            this.collectingBottles();
            //this.checkSmalChickenCollisions();
            this.checkChickenCollisions();
            this.checkJumpChickenCollisions();
            this.chickenBottle();
            this.checkEndbossCollisions();
            this.endbossBottle();
            //this.smalChickenBottle();
            this.chickenBottle();
            //this.checkJumpSmalChicken();
            this.level.endboss.forEach(boss => boss.firstContact());
            this.checkSmalChicken();

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
        // Wenn die Welt gestoppt wurde (z. B. nach dem Tod des Endboss), breche die Zeichnung ab.
        if (this.stopped) return;
        
        // Canvas leeren
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // --- Hintergrund zeichnen (mit Kamera-Verschiebung) ---
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObject);
        // Kamera zurücksetzen
        this.ctx.translate(-this.camera_x, 0);
    
        // --- Statusbars und UI-Elemente (ohne Kamera-Verschiebung) ---
        this.statusBar.y = 0;
        this.addToMap(this.statusBar);
    
        this.coinBar.y = 40;
        this.addToMap(this.coinBar);
    
        this.bottleBar.y = 80;
        this.addToMap(this.bottleBar);
    
        // Endboss-Statusbar nur anzeigen, wenn der Kampf begonnen hat
        if (this.contactBossBar) {
            this.addToMap(this.endbossBar);
        }
    
        // --- Restliche Weltobjekte zeichnen (mit Kamera-Verschiebung) ---
        this.ctx.translate(this.camera_x, 0);
    
        this.addObjectsToMap(this.level.clouds);
    
        this.level.enemies = this.level.enemies.filter((enemy) => !enemy.removeFromWorld);
        this.addObjectsToMap(this.level.enemies);

        this.level.smalChicken = this.level.smalChicken.filter((chicken) => !chicken.removeFromWorld);
        this.addObjectsToMap(this.level.smalChicken);
    
        this.addObjectsToMap(this.level.smalChicken);
        this.addObjectsToMap(this.level.endboss);
    
        // Coins und Bottles zeichnen
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
    
        // Weitere Objekte und den Character zeichnen
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
    
        // Kamera-Verschiebung zurücksetzen
        this.ctx.translate(-this.camera_x, 0);

        // zeichnen der BTN für mobilgeräte
        if (window.innerWidth <= 900) {
            // Größe der Buttons
            const buttonWidth = 50;
            const buttonHeight = 50;
            // Abstand und Positionierung:
            const marginBottom = 20; // Abstand vom unteren Rand
            const centerX = this.canvas.width / 2;
            const bottomY = this.canvas.height - buttonHeight - marginBottom;
            const gap = 50; // Abstand zwischen Buttons
    
            // Positionen berechnen:
            const leftX = centerX - buttonWidth - gap;
            const upX = centerX - buttonWidth / 2;
            const rightX = centerX + gap;
    
            // Zeichne die Steuerungs-Buttons
            // Stelle sicher, dass die Images bereits geladen sind.
            this.ctx.drawImage(this.controlLeftImg, leftX, bottomY, buttonWidth, buttonHeight);
            this.ctx.drawImage(this.controlUpImg, upX, bottomY, buttonWidth, buttonHeight);
            this.ctx.drawImage(this.controlRightImg, rightX, bottomY, buttonWidth, buttonHeight);
        }
    
        // Animations-Loop fortsetzen
        requestAnimationFrame(() => {
            this.draw();
        });
    }
    
    
    stopGame() {
        this.stopped = true;
        cancelAnimationFrame(this.animationFrameId);
        clearInterval(this.runIntervalId);
    }
    

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
                AudioHub.stopOneSound(AudioHub.COINBARCOLLECT);
                AudioHub.playOneSound(AudioHub.COINBARCOLLECT);
                // console.log('Coin eingesammelt!', coin);
                this.coinBar.setPercentage(Math.min(this.coinBar.percentage + 10, 100));// Test
                return false; // Coin wird entfernt
            }
            return true; // Coin bleibt in der Welt
        });
    }

    collectingBottles() {
        this.level.bottles = this.level.bottles.filter((bottle) => {
            if (this.character.isColliding(bottle)) {
                AudioHub.stopOneSound(AudioHub.COINBARCOLLECT);
                AudioHub.playOneSound(AudioHub.COINBARCOLLECT);
                // console.log('Fkasche eingesammelt', bottle);
                this.bottleBar.setPercentage(Math.min(this.bottleBar.percentage + 20, 100));
                
                // Erhöhe den Zähler der gesammelten Flaschen
                ThrowableObject.countBottle++;
                // console.log('Flaschen:', ThrowableObject.countBottle);
    
                return false; // Bottle wird entfernt
            }
            return true; // Bottle bleibt in der Welt
        });
    }
    
    
    // checkSmalChickenCollisions() {
    //     // Prüfen, ob der Charakter nicht springt
    //     if (this.character.y == 150) {
    //         this.level.smalChicken.forEach((chicken) => {
    //             if (this.character.isColliding(chicken)) {
    //                 console.log('Spieler läuft gegen kleines Huhn');
    //                 this.character.hit(); // Schaden buchen
    //                 this.statusBar.setPercentage(this.character.energy);
    //             }
    //         });
    //     }
    // }
    


    // checkJumpSmalChicken() {
    //     // Iteriere durch alle kleinen Hühner im Level
    //     this.level.smalChicken.forEach((smalChicken) => {
    //         // Aktionen nur ausführen, wenn der Spieler mit dem kleinen Huhn kollidiert und über dem Huhn ist
    //         if (this.character.isColliding(smalChicken) && this.character.y < 151) {
    //             AudioHub.stopOneSound(AudioHub.CHICKENHIT);
    //             AudioHub.playOneSound(AudioHub.CHICKENHIT);
    
    //             console.log('Spieler springt auf kleines Huhn');
    //             console.log('PepeY:', this.character.y);
    
    //             // Zeige das Todesbild des kleinen Huhns (richtiger Property-Name: IMAGES_DEAD)
    //             smalChicken.loadImage(SmalChicken.IMAGES_DEAD[0]);
    
    //             // Verzögertes Entfernen des kleinen Huhns nach 1 Sekunde
    //             setTimeout(() => {
    //                 smalChicken.removeFromWorld = true;
    //                 console.log('Kleines Huhn entfernt');
    //             }, 1000);
    //         }
    //     });
    // }
    
    


    // smalChickenBottle() {
    //     // Gehe durch alle kleinen Hühner im Level
    //     this.level.smalChicken.forEach((chicken) => {
    //         // Prüfen, ob eine Flasche vorhanden ist und ob sie das kleine Huhn trifft
    //         if (this.throwableObjects.length > 0) {
    //             let bottle = this.throwableObjects[0]; // Aktuelle Flasche
    //             if (bottle.isColliding(chicken)) {
    //                 AudioHub.stopOneSound(AudioHub.CHICKENHIT);
    //                 AudioHub.playOneSound(AudioHub.CHICKENHIT);

    //                 console.log('Flasche trifft kleines Huhn!');
                    
    //                 // Zeige das Todesbild des kleinen Huhns
    //                 chicken.loadImage(SmalChicken.IMAGES_DEATH[0]);
    
    //                 // Entferne das kleine Huhn nach 1 Sekunde
    //                 setTimeout(() => {
    //                     chicken.removeFromWorld = true;
    //                     console.log('Kleines Huhn entfernt');
    //                 }, 1000);
    //             }
    //         }
    //     });
    // }

    checkSmalChicken() {
        this.level.smalChicken.forEach((smalChicken) => {
          // Fall 1: Spieler springt auf das kleine Huhn (also in der Luft, y < 151)
          if (this.character.isColliding(smalChicken) && this.character.y < 151) {
            AudioHub.stopOneSound(AudioHub.CHICKENHIT);
            AudioHub.playOneSound(AudioHub.CHICKENHIT);
            
            console.log('Spieler springt auf kleines Huhn');
            console.log('PepeY:', this.character.y);
            
            // Animation stoppen, falls ein Interval läuft
            if (smalChicken.animationInterval) {
              clearInterval(smalChicken.animationInterval);
            }
            
            // Rufe die Todesanimation auf (die sich um Bildwechsel und Flag-Setzung kümmert)
            smalChicken.deadAnimation();
            setTimeout(() => {
                smalChicken.removeFromWorld = true;
                console.log('Kleines Huhn entfernt');
              }, 1000);

            
           
      
          // Fall 2: Eine Flasche trifft das kleine Huhn
          } else if (this.throwableObjects.length > 0 &&
                     this.throwableObjects[0].isColliding(smalChicken)) {
            AudioHub.stopOneSound(AudioHub.CHICKENHIT);
            AudioHub.playOneSound(AudioHub.CHICKENHIT);
            
            console.log('Flasche trifft kleines Huhn!');
            
            if (smalChicken.animationInterval) {
              clearInterval(smalChicken.animationInterval);
            }
            
            smalChicken.deadAnimation();
            setTimeout(() => {
                smalChicken.removeFromWorld = true;
                console.log('Kleines Huhn entfernt');
              }, 1000);
            
      
          // Fall 3: Spieler läuft gegen das kleine Huhn (nicht springend)
          } else if (this.character.y === 151 && this.character.isColliding(smalChicken)) {
            console.log('Spieler läuft gegen kleines Huhn');
            this.character.hit(); // Schaden buchen
            this.statusBar.setPercentage(this.character.energy);
          }
        });
      }
      
      
      
    
    
    // checkChickenCollisions() {
    //     // Prüfen, ob der Charakter nicht springt
    //     if (this.character.y == 151) {
    //     // if (this.character.speedY === 0) {
    //     // if (Math.abs(this.character.speedY) < 0.01){    
    //         this.level.enemies.forEach((enemy) => {
    //             if (this.character.isColliding(enemy)) {
    //                 console.log('Spieler läuft gegen Huhn');
    //                 this.character.hit(); // Schaden buchen
    //                 this.statusBar.setPercentage(this.character.energy);
    //             }
    //         });
    //     }
    // }

    checkChickenCollisions() {
        // Prüfen, ob der Charakter nicht springt
        if (this.character.y == 151) {
            this.level.enemies.forEach((enemy) => {
                if (enemy.alive && this.character.isColliding(enemy)) {
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
            // if (this.character.isColliding(enemy) && this.character.y < 151) {
                if (this.character.isColliding(enemy) && this.character.y < 149 && this.character.speedY < 0) {
                AudioHub.stopOneSound(AudioHub.CHICKENHIT);
                AudioHub.playOneSound(AudioHub.CHICKENHIT);

                // console.log('Spieler springt auf Huhn');
                // console.log('PepeY:', this.character.y);
                // console.log('Vor kill: enemy.alive =', enemy.alive);
                enemy.alive = false;
                enemy.state = "dead";
                // console.log('Nach kill: enemy.alive =', enemy.alive);
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
                    AudioHub.stopOneSound(AudioHub.CHICKENHIT);
                    AudioHub.playOneSound(AudioHub.CHICKENHIT);

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
                console.log('Spieler läuft gegen Endboss!!!' );
                this.character.hit(); // Schaden buchen
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }
  
    
    endbossBottle() {
        // Filtere aktive Flaschen
        this.throwableObjects = this.throwableObjects.filter(bottle => {
            if (bottle.removeFromWorld) return false;

            // Prüfe Kollision mit Endboss
            for (let endboss of this.level.endboss) {
                if (bottle.isColliding(endboss)) {
                    AudioHub.stopOneSound(AudioHub.CHICKENHIT);
                    AudioHub.playOneSound(AudioHub.CHICKENHIT);

                    console.log('Flasche trifft Endboss!');
                    endboss.hitBoss();
                    return false; // Entferne die Flasche sofort
                }
            }
            return true; // Behalte die Flasche
        });
    }

}

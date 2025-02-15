class Endboss extends MovableObject {
    // Grundlegende Eigenschaften des Endgegners
    width = 300;
    height = 300;
    y = 150;
    energyBoss = 100;
    currentAnimationFrame = 0;
    contact = false;
    lasthitBoss = Date.now();
    state = "alive";
    lastAnimationTime = Date.now();
    deathX = null;
  
    // Bildsequenzen für verschiedene Animationen
    IMAGES_WALKING = [
      'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
      'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
      'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
      'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
      'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
      'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
      'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
      'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
      'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
      'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
      'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
      'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
      'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
      'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
      'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
      'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
      'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
  

    /**
     * @param {function} [gameOverCallback] - Optionaler Callback, der beim Abschluss der Todesanimation aufgerufen wird.
     * Er wird mit dem Parameter 'endboss' aufgerufen, um anzuzeigen, dass der Spieler den Boss besiegt hat.
     */


    constructor(gameOverCallback) {
      // Lade ein Startbild
      super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
      // Alle Bilder laden
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ALERT);
      this.loadImages(this.IMAGES_ATTACK);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DEAD);
  
      this.x = 2550; // Startposition
      this.speed = 0.15 + Math.random() + 0.25;

      // Speichere den Callback, falls vorhanden
      this.gameOverCallback = gameOverCallback;
  
      // Starte den normalen Animations-Loop
      this.startAnimation();
    }
  

    startAnimation() {
      this.animationInterval = setInterval(() => {
        // Wenn der Boss nicht mehr "alive" ist, starte die Todesanimation.
        if (this.state !== "alive") {
          clearInterval(this.animationInterval);
          // Berechne den Delay, damit die Todesanimation insgesamt 3000ms dauert.
          const frameCount = this.IMAGES_DEAD.length;
          const delay = 3000 / frameCount;
          let deathFrame = 0;
          let deathInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
            deathFrame++;
            if (deathFrame >= frameCount) {
              clearInterval(deathInterval);
              this.state = "finished";
              console.log("Game Over wird aufgerufen.");
              //world stoppen
              if (typeof world !== 'undefined' && world.stopGame) {
                world.stopGame();  // Stoppe die Welt (Animation, Intervals etc.)
              }
              if (this.gameOverCallback && typeof this.gameOverCallback === 'function') {
                this.gameOverCallback('endboss');
              }
            }
          }, delay);
          return;
        }
  
        // Wenn der Boss verwundet ist, spiele die Hurt-Animation;
        // ansonsten zyklisch zwischen Alert-, Attack- und Walking-Animation wechseln.
        if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else if ((this.currentAnimationFrame % 60) < 15) {
          this.playAnimation(this.IMAGES_ALERT);
        } else if ((this.currentAnimationFrame % 60) < 30) {
          this.playAnimation(this.IMAGES_ATTACK);
        } else {
          this.playAnimation(this.IMAGES_WALKING);
        }
        this.currentAnimationFrame++;
      }, 100);
    }
      
    
  
    hitBoss() {
      this.energyBoss -= 110;
      if (this.energyBoss < 0) this.energyBoss = 0;
      console.log("Hit Endboss", this.energyBoss);
      if (typeof world !== "undefined" && world.endbossBar) {
        world.endbossBar.setPercentage(this.energyBoss);
      }
      this.lasthitBoss = Date.now();
      if (this.energyBoss === 0) {
        this.dieBoss();
      }
    }
  
    // Diese Methode wird aufgerufen, wenn der Boss sterben soll.
    dieBoss() {
      this.state = "dead";
      // speichert Podition um boss bestzuhalten
      this.deathX = this.x;
    }
  
    // Bewegt den Boss nach links – aber nur, wenn er lebt.
    moveLeftBoss() {
      if (this.state !== "alive" || this.deathX !== null) return;
      this.x -= 0.5;
    }
  
    // Zeigt die Boss-Statusbar an, wenn der Spieler in Reichweite kommt.
    firstContact() {
      if (!this.contact && typeof world !== "undefined" && world.character.x > 2100) {
        console.log("CONTACT");
        this.contact = true;
        world.contactBossBar = true;
        world.endbossBar = new StatusBar("Endboss");
        world.endbossBar.x = 470;
        world.endbossBar.y = 20;
      }
    }
  
    isHurt() {
      // Der Boss gilt als "hurt", wenn seit dem letzten Treffer weniger als 1 Sekunde vergangen ist.
      return (Date.now() - this.lasthitBoss) / 1000 < 1;
    }
  }

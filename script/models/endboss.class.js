/**
 * Endboss-Klasse, die von MovableObject erbt
 * Verwaltet den Endgegner mit verschiedenen Zuständen (alive, dead) und Animationen
 */
class Endboss extends MovableObject {
    // Grundlegende Eigenschaften des Endgegners
    width = 300;
    height = 300;
    y = 150;
    energyBoss = 100;
    currentAnimationFrame = 0;
    contact = false;
  
    // Zeitstempel des letzten Treffers für die "hurt" Animation
    lasthitBoss = Date.now();
  
    // Zustandsverwaltung: Der Boss kann "alive" oder "dead" sein
    state = "alive";
  
    // Zeitstempel für Animationssteuerung
    lastAnimationTime = Date.now();
  
    // Position beim Tod wird gespeichert, damit der Boss an dieser Stelle bleibt
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
  
    constructor() {
      super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
      // Alle Bilder laden
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ALERT);
      this.loadImages(this.IMAGES_ATTACK);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DEAD);
  
      this.x = 2550; // Startposition
      this.speed = 0.15 + Math.random() + 0.25;
  
      // Starte den normalen Animations-Loop
      this.startAnimation();
    }
  
    
    startAnimation() {
      this.animationInterval = setInterval(() => {
        // Wenn der Boss tot ist, stoppe diesen Interval sofort
        if (this.state !== "alive") {
          clearInterval(this.animationInterval); // Stoppe zuerst den Interval
          
          // Fixiere die Position sofort
          if (this.deathX !== null) {
            this.x = this.deathX;
          }
          
          // Starte einen neuen Interval nur für die Todesanimation
          let deathFrame = 0;
          let deathInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
            deathFrame++;
            
            // Wenn die Animation einmal durchgelaufen ist
            if (deathFrame >= this.IMAGES_DEAD.length) {
              clearInterval(deathInterval);
              this.state = "finished";
              // Behalte das letzte Bild der Todesanimation
              this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
              console.log("starte Game Over screen");
              //showGameOver();
            }
          }, 200); // Langsamere Animation für dramatischeren Effekt
          
          return;
        }
        
        // Normale Animationen - werden nur ausgeführt wenn der Boss lebt
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
  
      // Wenn die Energie 0 erreicht, soll der Boss sterben
      if (this.energyBoss === 0) {
        this.dieBoss();
      }
    }
  
    // Diese Methode wird aufgerufen, wenn der Boss sterben soll.
    dieBoss() {
      this.state = "dead";
      // Optional: Hier kannst du auch die aktuelle Position speichern,
      // falls der Boss sich beim Sterben noch bewegen könnte.
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

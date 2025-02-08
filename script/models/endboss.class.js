class Endboss extends MovableObject {
    width = 300;
    height = 300;
    y = 150;
    energyBoss = 100;
    currentAnimationFrame = 0;
    contact = false;
  
    // Zeitpunkt des letzten Treffers
    lasthitBoss = Date.now();
  
    // Zustände: "alive", "dead", "finished"
    state = "alive";
  
    // Für Animationen
    lastAnimationTime = Date.now();
  
    // Speichert die aktuelle Position beim Tod
    deathX = null;
  
    // Bildarrays
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
      'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
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
  
    // Hier wird der Animations-Loop mit setInterval realisiert.
    startAnimation() {
      this.animationInterval = setInterval(() => {
        // Wenn der Endboss NICHT mehr "alive" ist...
        if (this.state !== "alive") {
          // ...spiele kontinuierlich die Tot-Animation ab:
          this.playAnimation(this.IMAGES_DEAD);
          // Falls der Game Over Timer noch nicht gestartet wurde, starte ihn:
          if (!this.deadTimerStarted) {
            this.deadTimerStarted = true;
            setTimeout(() => {
              clearInterval(this.animationInterval); // Stoppe den Animations-Loop
              console.log("Game Over wird aufgerufen.");
              showGameOver();
            }, 5000);
          }
        } else {
          // Boss lebt – normale Animationen:
          if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
          } else if ((this.currentAnimationFrame % 60) < 15) {
            this.playAnimation(this.IMAGES_ALERT);
          } else if ((this.currentAnimationFrame % 60) < 30) {
            this.playAnimation(this.IMAGES_ATTACK);
          } else {
            this.playAnimation(this.IMAGES_WALKING);
          }
          this.currentAnimationFrame++; // Frame-Zähler erhöhen
        }
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
      console.log("Der Boss ist tot :-(");
      this.state = "dead";
      // Optional: Hier kannst du auch die aktuelle Position speichern,
      // falls der Boss sich beim Sterben noch bewegen könnte.
      this.deathX = this.x;
    }
  
    // Bewegt den Boss nach links – aber nur, wenn er lebt.
    moveLeftBoss() {
      if (this.state !== "alive") return;
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
  
  



// class Endboss extends MovableObject {
//     width = 300;
//     height = 300;
//     y = 150;
//     energyBoss = 100;
//     currentAnimationFrame = 0;
//     contact = false;
  
//     // Zeitpunkt des letzten Treffers
//     lasthitBoss = Date.now();
  
//     // Zustände: "alive", "dead", "finished"
//     state = "alive";
//     deathTimer = 0; // zählt in Millisekunden, nachdem der Boss tot ist
//     deathX = null;  // speichert die Position beim Tod
  
//     // Für Animationen
//     lastAnimationTime = Date.now();
  
//     // Bildarrays
//     IMAGES_WALKING = [
//       'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
//       'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
//       'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
//       'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
//     ];
//     IMAGES_ALERT = [
//       'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
//     ];
//     IMAGES_ATTACK = [
//       'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
//     ];
//     IMAGES_HURT = [
//       'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
//       'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
//       'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
//     ];
//     IMAGES_DEAD = [
//       'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
//       'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
//       'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
//     ];
  
//     constructor() {
//       super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
//       // Alle Bilder laden
//       this.loadImages(this.IMAGES_WALKING);
//       this.loadImages(this.IMAGES_ALERT);
//       this.loadImages(this.IMAGES_ATTACK);
//       this.loadImages(this.IMAGES_HURT);
//       this.loadImages(this.IMAGES_DEAD);
  
//       this.x = 2550; // Startposition
//       this.speed = 0.15 + Math.random() + 0.25;
  
//       // Starte das Alive-Interval
//       this.startAliveInterval();
//     }
  
//     // Alive-Interval: führt alle Animationen und Bewegungen aus, solange der Boss lebt
//     startAliveInterval() {
//       this.aliveInterval = setInterval(() => {
//         // Falls der Boss sterben soll:
//         if (this.energyBoss <= 0) {
//           console.log("Endboss besiegt!");
//           // Wechsel in den Dead-Zustand:
//           this.state = "dead";
//           this.deathTimer = 0;
//           this.deathX = this.x; // Position fixieren
//           this.currentAnimationFrame = 0;
//           // Beende das Alive-Interval
//           clearInterval(this.aliveInterval);
//           // Starte das Dead-Interval
//           this.startDeadInterval();
//           return;
//         }
  
//         // Aktualisiere den Frame-Zähler alle 100ms:
//         const now = Date.now();
//         if (now - this.lastAnimationTime > 100) {
//           this.currentAnimationFrame++;
//           this.lastAnimationTime = now;
//         }
  
//         // Wähle die Animation basierend auf dem aktuellen Frame
//         if (this.isHurt()) {
//           this.playAnimation(this.IMAGES_HURT);
//         } else if ((this.currentAnimationFrame % 60) < 15) {
//           this.playAnimation(this.IMAGES_ALERT);
//         } else if ((this.currentAnimationFrame % 60) < 30) {
//           this.playAnimation(this.IMAGES_ATTACK);
//         } else {
//           this.playAnimation(this.IMAGES_WALKING);
//         }
  
//         // Bewege den Boss, sofern Kontakt besteht und er nicht hurt ist
//         if (this.contact && !this.isHurt()) {
//           this.moveLeftBoss();
//         }
  
//         // Zeige ggf. die Boss-Statusbar an
//         this.firstContact();
  
//       }, 100);
//     }
  
//     // Dead-Interval: Es wird nur noch die Tot-Animation abgespielt und der Boss bleibt an seiner Position
//     startDeadInterval() {
//       this.deadInterval = setInterval(() => {
//         // Position fixieren:
//         if (this.deathX !== null) {
//           this.x = this.deathX;
//         }
  
//         // Tot-Animation abspielen:
//         this.playAnimation(this.IMAGES_DEAD);
//         this.deathTimer += 100;
//         console.log("DeadAnimation wird abgespielt, Frame:", this.currentAnimationFrame);
  
//         // Nach 5 Sekunden (5000ms) den GameOver-Screen anzeigen und Dead-Interval beenden
//         if (this.deathTimer >= 5000) {
//           clearInterval(this.deadInterval);
//           this.state = "finished";
//           console.log("Game Over wird aufgerufen.");
//           showGameOver();
//         }
//       }, 100);
//     }
  
//     // Eigene Methode zur Bewegung des Bosses
//     moveLeftBoss() {
//       if (this.state !== "alive") return; // Nur im alive-Zustand bewegen
//       this.x -= 0.5;
//     }
  
//     // Erzeugt die Boss-Statusbar, wenn der Spieler in Reichweite kommt.
//     firstContact() {
//       if (!this.contact && typeof world !== "undefined" && world.character.x > 2100) {
//         console.log("CONTACT");
//         this.contact = true;
//         world.contactBossBar = true;
//         world.endbossBar = new StatusBar("Endboss");
//         world.endbossBar.x = 470;
//         world.endbossBar.y = 20;
//       }
//     }
  
//     hitBoss() {
//       this.energyBoss -= 110;
//       if (this.energyBoss < 0) this.energyBoss = 0;
//       console.log("Hit Endboss", this.energyBoss);
//       if (typeof world !== "undefined" && world.endbossBar) {
//         world.endbossBar.setPercentage(this.energyBoss);
//       }
//       this.lasthitBoss = Date.now();
//     }
  
//     isHurt() {
//       // Der Boss gilt als "hurt", wenn seit dem letzten Treffer weniger als 1 Sekunde vergangen ist
//       return (Date.now() - this.lasthitBoss) / 1000 < 1;
//     }
//   }
  



//   class Endboss extends MovableObject {
//     width = 300;
//     height = 300;
//     y = 150;
//     energyBoss = 100;
//     currentAnimationFrame = 0;
//     contact = false;
  
//     // Zeitpunkt des letzten Treffers
//     lasthitBoss = Date.now();
  
//     // Zustände: "alive", "dead", "finished"
//     state = "alive";
//     deathTimer = 0; // Millisekunden, zählt nach dem Tod
//     deathX = null;  // speichert die Position beim Tod
  
//     // Für Animationen
//     lastAnimationTime = Date.now();
  
//     // Bildarrays (wie bisher definiert)
//     IMAGES_WALKING = [
//       'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
//       'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
//       'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
//       'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
//     ];
//     IMAGES_ALERT = [
//       'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
//       'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
//     ];
//     IMAGES_ATTACK = [
//       'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
//       'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
//     ];
//     IMAGES_HURT = [
//       'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
//       'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
//       'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
//     ];
//     IMAGES_DEAD = [
//       'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
//       'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
//       'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
//     ];
  
//     constructor() {
//       super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
//       // Alle Bilder laden
//       this.loadImages(this.IMAGES_WALKING);
//       this.loadImages(this.IMAGES_ALERT);
//       this.loadImages(this.IMAGES_ATTACK);
//       this.loadImages(this.IMAGES_HURT);
//       this.loadImages(this.IMAGES_DEAD);
  
//       this.x = 2550; // Startposition
//       this.speed = 0.15 + Math.random() + 0.25;
  
//       // Starte den Animations-Loop
//       this.animateBoss();
//     }
  
//     animateBoss() {
//       // Dieser Loop läuft alle 100ms
//       setInterval(() => {
//         // Wenn der Boss "finished" ist, beenden wir den Loop
//         if (this.state === "finished") return;
  
//         // Zustand "alive"
//         if (this.state === "alive") {
//           // Prüfe, ob der Boss sterben soll
//           if (this.energyBoss <= 0) {
//             console.log("Endboss besiegt!");
//             this.state = "dead";
//             this.deathTimer = 0;
//             this.deathX = this.x; // Position fixieren
//             this.currentAnimationFrame = 0;
//             return;
//           }
  
//           // Normale Animationen (Beispiel: Wechsel zwischen Alert, Attack, Walking)
//           // Wir verwenden hier eine Zeitüberprüfung ähnlich wie beim Character
//           const now = Date.now();
//           if (now - this.lastAnimationTime > 100) {
//             this.currentAnimationFrame++;
//             this.lastAnimationTime = now;
//           }
  
//           // Wähle Animation basierend auf dem Frame-Zähler
//           if (this.isHurt()) {
//             this.playAnimation(this.IMAGES_HURT);
//           } else if ((this.currentAnimationFrame % 60) < 15) {
//             this.playAnimation(this.IMAGES_ALERT);
//           } else if ((this.currentAnimationFrame % 60) < 30) {
//             this.playAnimation(this.IMAGES_ATTACK);
//           } else {
//             this.playAnimation(this.IMAGES_WALKING);
//           }
  
//           // Bewege den Boss (sofern Kontakt besteht etc.)
//           if (this.contact && !this.isHurt()) {
//             this.moveLeftBoss();
//           }
  
//           // Hier kannst du auch die Logik einbauen, wann z. B. die Boss-Statusbar angezeigt wird.
//           this.firstContact();
  
//         // Zustand "dead"
//         } else if (this.state === "dead") {
//           // Fixiere die Position:
//           if (this.deathX !== null) {
//             this.x = this.deathX;
//           }
  
//           // Tot-Animation abspielen
//           this.playAnimation(this.IMAGES_DEAD);
  
//           // Timer für den "dead"-Zustand hochzählen
//           this.deathTimer += 100;
//           console.log("DeadAnimation wird abgespielt, Frame:", this.currentAnimationFrame);
  
//           // Nach 5 Sekunden (5000ms) den Zustand auf "finished" setzen und GameOver anzeigen
//           if (this.deathTimer >= 5000) {
//             this.state = "finished";
//             console.log("Game Over wird aufgerufen.");
//             showGameOver();
//           }
//         }
//       }, 100);
//     }
  
//     // Eigene Methode zur Bewegung des Bosses
//     moveLeftBoss() {
//       // Nur im "alive"-Zustand bewegen
//       if (this.state !== "alive") return;
//       // Beispielhafte Bewegung: leicht nach links
//       this.x -= 0.5;
//     }
  
//     // Erzeugt die Boss-Statusbar, wenn der Spieler in Reichweite kommt.
//     firstContact() {
//       if (!this.contact && typeof world !== "undefined" && world.character.x > 2100) {
//         console.log("CONTACT");
//         this.contact = true;
//         world.contactBossBar = true;
//         world.endbossBar = new StatusBar("Endboss");
//         world.endbossBar.x = 470;
//         world.endbossBar.y = 20;
//       }
//     }
  
//     hitBoss() {
//       this.energyBoss -= 110;
//       if (this.energyBoss < 0) this.energyBoss = 0;
//       console.log("Hit Endboss", this.energyBoss);
//       if (typeof world !== "undefined" && world.endbossBar) {
//         world.endbossBar.setPercentage(this.energyBoss);
//       }
//       this.lasthitBoss = Date.now();
//     }
  
//     isHurt() {
//       // Der Boss gilt als "hurt", wenn seit dem letzten Treffer weniger als 1 Sekunde vergangen ist
//       return (Date.now() - this.lasthitBoss) / 1000 < 1;
//     }
//   }
  
  
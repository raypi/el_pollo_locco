class Endboss extends MovableObject {
    width = 300;
    height = 300;
    y = 150;
    energyBoss = 100;
    currentAnimationFrame = 0;
    contact = false;
    gameOverTimeoutStarted = false;
    liveBoss = true;
    deathAnimationFinished = false;

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
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 2550; // Startposition
        this.speed = 0.15 + Math.random() + 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playEndboss();
        }, 200); // 200ms für Animationen

        setInterval(() => {
            // Falls Endboss schon in Kontakt ist, der Animationscounter groß genug ist und er weder tot noch verletzt ist:
            if (this.contact && this.currentAnimationFrame > 30 && !this.isDead() && !this.isHurt()) {
                this.moveLeft(); // Der Endboss bewegt sich nach links
            }
        }, 1000 / 120); // Update für Bewegungen
    }

    playEndboss() {
       // Falls der Endboss gerade stirbt (also noch lebendig, aber Energie 0 hat):
       if (this.energyBoss === 0 && this.liveBoss) {
        console.log('Endboss besiegt!');
        this.liveBoss = false;
        this.currentAnimationFrame = 0; // Reset für die Todesanimation, falls nötig
        // Starte den Timer, der nach 3 Sekunden den Game Over Screen zeigt
        if (!this.gameOverTimeoutStarted) {
            this.gameOverTimeoutStarted = true;
            setTimeout(() => {
                //showGameOver();  // Game-Over-Screen anzeigen
            }, 3000); // 3000ms = 3 Sekunden
        }
    }
    
    // Wenn der Endboss tot ist, spiele fortlaufend die DeadAnimation:
    if (!this.liveBoss) {
    this.DeadAnimation();
    return;
}
        
        // Normale Animationen, solange der Endboss noch lebt
        if (this.isHurt()) {
            this.hurtAnimation();
        } else if (this.currentAnimationFrame < 15) {
            this.alertAnimation();
            this.currentAnimationFrame += 4;
        } else if (this.currentAnimationFrame < 30) {
            this.attackAnimation();
        } else {
            this.walkAnimation();
        }
        
        if (world) {
            this.firstContact(); // Überprüft, ob der Charakter in der Nähe ist
            this.currentAnimationFrame++;
        }
    }

    walkAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    alertAnimation() {
        this.playAnimation(this.IMAGES_ALERT);
    }

    attackAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
    }

    hurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
    }

    DeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
    }

    firstContact() {
        if (!this.contact && world.character.x > 2100 && !world.contact) {
            console.log('CONTACT');
            this.currentAnimationFrame = 0;
            world.contactBossBar = true;
            this.contact = true;

            // Endboss-Statusbar erstellen und in der Welt speichern
            world.endbossBar = new StatusBar('Endboss');
            world.endbossBar.x = 470;
            world.endbossBar.y = 20;
        }
    }

    moveLeft() {
        this.x -= 1.5; 
    }

    hitBoss() {
        this.energyBoss -= 110;
        if (this.energyBoss < 0) {
            this.energyBoss = 0;
        }
        console.log('Hit Endboss', this.energyBoss);
        if (world && world.endbossBar) {
            world.endbossBar.setPercentage(this.energyBoss);
        }
    }
    
    isDead() {
        return this.energyBoss === 0;
    }
    
    isHurt() {
        let timeDuration = (new Date().getTime() - this.lasthit) / 1000; // Differenz in Sekunden
        return timeDuration < 1; // Gibt true zurück, wenn seit dem letzten Treffer weniger als 1 Sekunde vergangen ist
    }

    // Weitere Methoden (z.B. playDamageSound() oder playWalkSound()) ...
}

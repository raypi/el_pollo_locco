class Endboss extends MovableObject {
    width = 300;
    height = 300;
    y = 150;
    energy = 100;

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

    currentAnimationFrame = 0;
    contact = false;

    constructor() {
        super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        // this.level.endboss[0].world = this; 

        this.x = 2550; // Startposition
        this.speed = 0.15 + Math.random() + 0.25;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playEndboss();
        }, 200); // 200ms für Animationen
        setInterval(() => {
            if (this.contact && this.currentAnimationFrame > 30 && !this.isDead() && !this.isHurt()) {
                this.moveLeft(); // Der Endboss bewegt sich nach links
            }
        }, 1000 / 120); // Update für Bewegungen
    }

    playEndboss() {
        if (this.isDead()) {
            this.playDeadAnimation();
            //this.showGameWinScreen(); // Spielabschluss-Screen
        } else if (this.isHurt()) {
            this.playHurtAnimation();
        } else if (this.currentAnimationFrame < 15) {
            this.isAlert();
            this.currentAnimationFrame += 4;
        } else if (this.currentAnimationFrame < 30) {
            this.isAttack();
        } else {
            this.isWalk();
        }
        // this.firstContact(); // Überprüft, ob der Endboss mit etwas kollidiert
        // this.currentAnimationFrame++;
    }
    

    isWalk() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    isAlert() {
        this.playAnimation(this.IMAGES_ALERT);
    }

    isAttack() {
        this.playAnimation(this.IMAGES_ATTACK);
    }

    isHurt() {
        this.playAnimation(this.IMAGES_HURT);
    }

    isDead() {
        this.playAnimation(this.IMAGES_DEAD);
        //this.showWin(); // Spielabschluss
    }


    firstContact(){
        // console.log("world:", world);
        // console.log("world.character:", world?.character);
        if (world.character[0].x > 2250 && !this.contact) {
            // console.log("*** Erstkontakt Endboss ***");
            this.currentAnimationFrame = 0;
            this.hasFirstContact = true;
            //world.bossStatusBar.isVisible = true; Statusbar anzeigen von endboss 
        }
    }


    moveLeft() {
        this.x -= 1.5; 
    }

    hit() {
        this.energy = Math.max(0, this.energy - 20); // Schaden
        if (this.energy === 0) {
            this.die(); // Endboss besiegen
        }
    }

    die() {
        console.log('Endboss besiegt!');
        this.removeFromWorld = true;
    }

    // Weitere Methoden zum Schaden oder Animationen spielen (z.B. playDamageSound() oder playWalkSound())
}

// class Endboss extends MovableObject{
//     width = 300;
//     height = 300;
//     y = 150;
//     energy = 100;

//     IMAGES_WALKING = [
//         'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
//         'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
//         'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
//         'assets/img/4_enemie_boss_chicken/1_walk/G4.png' 
//     ];
  
//     IMAGES_ALERT = [
//         'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
//         'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
//         'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
//         'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
//         'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
//         'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
//         'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
//         'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
//     ];

//     IMAGES_ATTACK = [
//         'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
//         'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
//         'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
//         'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
//         'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
//         'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
//         'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
//         'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
//     ];

//     IMAGES_HURT = [
//         'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
//         'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
//         'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
//     ];
    
//     IMAGES_DEAD = [
//         'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
//         'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
//         'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
//     ];
//     currentAnimation = 0;
//     contact = false;

//     constructor(){
//         super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
//         this.loadImages(this.IMAGES_WALKING);
//         this.loadImages(this.IMAGES_ALERT);
//         this.loadImages(this.IMAGES_ATTACK);
//         this.loadImages(this.IMAGES_HURT);
//         this.loadImages(this.IMAGES_DEAD);

//         this.x = 2550; // + Math.random() * 500 zufällige Platzierung Aktuell startposition EB = 2550!
//         this.speed = 0.15 + Math.random() + 0.25;
//         this.animate();
//     }
   

    
//     animate() {
//         setInterval(() => {
//             this.playEndboss();
//         }, 100);
//     }

//     playEndboss() {
//         this.playAnimation(this.IMAGES_ALERT);
//         // if (this.isDead()) {
//         //     this.playDeadAnimation();
//         // } else if (this.isHurt()) {
//         //     this.playHurtAnimation();
//         // } else if (this.currentAnimation < 15) {
//         //     this.playAlertAnimation();
//         // } else if (this.currentAnimation < 30) {
//         //     this.playAttackAnimation();
//         // } else {
//         //     this.playWalkAnimation();
//         // }
//         // this.checkFirstContact();
//         // this.currentAnimationFrame++;
//     }

//     isWalk() {
//         this.playAnimation(this.IMAGES_WALKING);
//     }

//     isAlert() {
//         this.playAnimation(this.IMAGES_ALERT);
//     }

//     isAttack() {
//         this.playAnimation(this.IMAGES_ATTACK);
//     }

//     isHurt() {
//         this.playAnimation(this.IMAGES_HURT);
//     }

//     isDead() {
//         this.playAnimation(this.IMAGES_DEAD);
//         this.showWinScreen(); // Spielabschluss
//     }

//     moveLeft() {
//         this.x -= 1.0; 
//     }

//     hit() {
//         this.energy = Math.max(0, this.energy - 20);
//         if (this.energy === 0) {
//             this.die(); // Endboss besiegen
//         }
//     }

//     die() {
//         console.log('Endboss besiegt!');
//         this.removeFromWorld = true;
//     }
    
//     // Sound
//     // End Schirm wenn spiel zu ende 
// }
class Character extends MovableObject {
    
    height = 280;
    x = 100;
    y = 150; // standartwert 150
    speed = 5;
    lastMoveTime = Date.now();
    longIdle = false; 
    world;
    state = "alive"


    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONGIDLE = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];



    // currentImage = 0;
    world;

    constructor(gameOverCallback){
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        // this.animate();
        this.gameOverCallback = gameOverCallback; 
    }



    animate(){
        setInterval(() => {
            // console.log(this.world.level.level_end_x);
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.lastMoveTime = Date.now();
                this.longIdle = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.lastMoveTime = Date.now();
                this.longIdle = false;
            }
            if (this.world.keyboard.SPACE && !this.isAboveGrund()){
                this.jump();
                this.lastMoveTime = Date.now();
                this.longIdle = false;
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

    setInterval(() => {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGrund()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            // Wenn Bewegungstasten gedrückt werden, spiele die Walking Animation.
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                // Keine Bewegung: Sofort das Standbild zeigen, solange noch keine
                // längere Inaktivität vorliegt.
                const timeSinceLastMove = Date.now() - this.lastMoveTime;
                if (timeSinceLastMove < 3000) {
                    // Direkt das Standbild anzeigen.
                    this.loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
                } else {
                    // Nach 3 Sekunden Inaktivität: Idle Animation bzw. 
                    // nach 10 Sekunden: LongIdle Animation (wie in deiner checkIdle-Methode)
                    this.checkIdle();
                }
            }
        }
    }, 100);
    
    }


    // nach X sekunden idle nach y Sekunden longidle setzen
    checkIdle() {
        const now = Date.now();
        const timeSinceLastMove = now - this.lastMoveTime;
    
        if (timeSinceLastMove > 10000) { // nach 10s
            this.playAnimation(this.IMAGES_LONGIDLE);
            this.longIdle = true; // Zustand merken
        } else if (timeSinceLastMove > 3000 && !this.longIdle) { // nach 3s
            this.playAnimation(this.IMAGES_IDLE);
        }
    }     


dieCharacter() {
    this.state = "dead"; 
    console.log("Character is dead");
    
    // Todesanimation starten
    
    // Spiel beenden
    setTimeout(() => {
       if (typeof world !== "undefined" && world.stopGame) {
          world.stopGame();  // Stoppt Animationen, Intervals und weitere Spielprozesse
       }
       if (this.gameOverCallback && typeof this.gameOverCallback === 'function') {
        this.gameOverCallback('character');
    }
    }, 2000); 
 }
}
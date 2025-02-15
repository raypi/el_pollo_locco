class AudioHub {
   // grundsätzliche steuerung aller sounds im spiel

   // Audiodateien laden
   static CHICKENHIT = new Audio('assets/audio/ChickenSound.mp3'); //wenn chicken oder smal Chicken oder Endboss einen Hit bekommen
   static COINBARCOLLECT = new Audio('assets/audio/coinCollect.wav'); //wenn ein Coin oder eine Bottle eingesammelt wird
   static COINBARCOUNT = new Audio('assets/audio/coinCount.wav'); // wenn Coin oder Bottle der entsprechenden Bar hinzugefügt wird
   static DEATH = new Audio('assets/audio/death.wav'); // wenn Character oder Endboss sterben
   static ENDBOSSBATTLE = new Audio('assets/audio/enbossBattle.ogg');// wenn der Character so nah am endboss ist das dessen animation startet, spielt bis kampf beendet, schaltet normale hintergrundmusik aus
   static JUMP = new Audio('assets/audio/jump.wav'); // wenn der Character springt
   static GAMEMUSIC = new Audio('assets/audio/gamemusic.wav'); // hintergrundmusik für Game, soll später ein Start bildschilm ein und ausschaltbar sein


   // Array für alle audio Dateien
   static allSounds = [AudioHub.CHICKENHIT, AudioHub.COINBARCOLLECT, AudioHub.COINBARCOUNT, AudioHub.DEATH, AudioHub.ENDBOSSBATTLE , AudioHub.JUMP , AudioHub.GAMEMUSIC];
   
    // methode zum abspielen einzelner Sound
    static playOneSound(sound) { 
        sound.volume = 0.2;  // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
        sound.currentTime = 0;  // Startet ab einer bestimmten stelle ggf. im Array speichern und mit übergeben
        sound.play();  // Spielt das übergebene Sound-Objekt ab
    }

    // methode zum stoppen aller Sounds
    static stopAllSounds() {
        AudioHub.allSounds.forEach(sound => {
            sound.pause();  // Pausiert jedes Audio in der Liste
        });
        document.getElementById('volume').value = 0.2;  // Setzt den Sound-Slider wieder auf 0.2
    }

    // methode zum stoppen eines sounds
    static stopOneSound(sound) {
        sound.pause();  // Pausiert das übergebene Audio
        }

    // Anmerkung. ggf. kann man eine methode einfügen die die Lautstärke aller Sounds regelt
}

// hintergrundmusik permanent abspielen 
AudioHub.GAMEMUSIC.loop = true;

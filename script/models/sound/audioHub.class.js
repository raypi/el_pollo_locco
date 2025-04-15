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
   // sound als Plathalter weil ich noch nichts gefunden habe
   static HITCHARACTER = new Audio('assets/audio/alarm.wav'); // wenn der Character springt


   // Array für alle audio Dateien
   static allSounds = [AudioHub.CHICKENHIT, AudioHub.COINBARCOLLECT, AudioHub.COINBARCOUNT, AudioHub.DEATH, AudioHub.ENDBOSSBATTLE , AudioHub.JUMP , AudioHub.GAMEMUSIC, AudioHub.HITCHARACTER];
   
    // methode zum abspielen einzelner Sound
    static playOneSound(sound) { 
        // Prüfe, ob Sound aktiviert ist
        const soundOn = localStorage.getItem('musicOn') === 'true';
        if (!soundOn) {
            return; // Wenn Sound deaktiviert ist, spiele keinen Sound ab
        }
        
        sound.volume = 0.2;  // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
        sound.currentTime = 0;  // Startet ab einer bestimmten stelle ggf. im Array speichern und mit übergeben
        
        // Versuche den Sound abzuspielen und fange mögliche Fehler ab
        const playPromise = sound.play();
        
        // Wenn play() ein Promise zurückgibt (moderner Browser)
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // AbortError abfangen (tritt auf, wenn play() durch pause() unterbrochen wird)
                console.log('Audio play error:', error);
                // Wir könnten hier erneut versuchen, den Sound abzuspielen, aber das könnte zu einer Endlosschleife führen
            });
        }
    }

    // methode zum abspielen einzelner Sound mit Verzögerung (um AbortError zu vermeiden)
    static playSoundWithDelay(sound, delay = 50) {
        // Prüfe, ob Sound aktiviert ist
        const soundOn = localStorage.getItem('musicOn') === 'true';
        if (!soundOn) {
            return; // Wenn Sound deaktiviert ist, spiele keinen Sound ab
        }
        
        setTimeout(() => {
            AudioHub.playOneSound(sound);
        }, delay);
    }

    // methode zum stoppen aller Sounds
    static stopAllSounds() {
        AudioHub.allSounds.forEach(sound => {
            sound.pause();  // Pausiert jedes Audio in der Liste
        });
    }

    // methode zum stoppen eines sounds
    static stopOneSound(sound) {
        sound.pause();  // Pausiert das übergebene Audio
    }

    // Anmerkung. ggf. kann man eine methode einfügen die die Lautstärke aller Sounds regelt
}

// hintergrundmusik permanent abspielen 
AudioHub.GAMEMUSIC.loop = true;

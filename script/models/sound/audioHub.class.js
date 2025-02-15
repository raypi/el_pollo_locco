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
   
    // methode zum abspielen einzelner Sounds

    // methode zum stoppen aller Sounds

    // methode zum stoppen eines sounds

    // Anmerkung. ggf. kann man eine methode einfügen die die Lautstärke aller Sounds regelt
}
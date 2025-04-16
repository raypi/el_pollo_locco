/**
 * Manages all audio functionality in the game.
 * Provides static methods for playing and stopping sounds.
 */
class AudioHub {
   /**
    * Sound effect for when a chicken, small chicken, or endboss is hit.
    * @type {HTMLAudioElement}
    */
   static CHICKENHIT = new Audio('assets/audio/ChickenSound.mp3');
   
   /**
    * Sound effect for when a coin or bottle is collected.
    * @type {HTMLAudioElement}
    */
   static COINBARCOLLECT = new Audio('assets/audio/coinCollect.wav');
   
   /**
    * Sound effect for when a coin or bottle is added to the status bar.
    * @type {HTMLAudioElement}
    */
   static COINBARCOUNT = new Audio('assets/audio/coinCount.wav');
   
   /**
    * Sound effect for when the character or endboss dies.
    * @type {HTMLAudioElement}
    */
   static DEATH = new Audio('assets/audio/death.wav');
   
   /**
    * Sound effect for the endboss battle.
    * @type {HTMLAudioElement}
    */
   static ENDBOSSBATTLE = new Audio('assets/audio/enbossBattle.ogg');
   
   /**
    * Sound effect for when the character jumps.
    * @type {HTMLAudioElement}
    */
   static JUMP = new Audio('assets/audio/jump.wav');
   
   /**
    * Background music for the game.
    * @type {HTMLAudioElement}
    */
   static GAMEMUSIC = new Audio('assets/audio/gamemusic.wav');
   
   /**
    * Sound effect for when the character is hit.
    * @type {HTMLAudioElement}
    */
   static HITCHARACTER = new Audio('assets/audio/alarm.wav');

   /**
    * Array containing all sound effects used in the game.
    * @type {HTMLAudioElement[]}
    */
   static allSounds = [AudioHub.CHICKENHIT, AudioHub.COINBARCOLLECT, AudioHub.COINBARCOUNT, AudioHub.DEATH, AudioHub.ENDBOSSBATTLE, AudioHub.JUMP, AudioHub.GAMEMUSIC, AudioHub.HITCHARACTER];
   
   /**
    * Plays a single sound effect.
    * @param {HTMLAudioElement} sound - The sound to play.
    */
   static playOneSound(sound) { 
      const soundOn = localStorage.getItem('musicOn') === 'true';
      if (!soundOn) {
         return;
      }
      
      sound.volume = 0.2;
      sound.currentTime = 0;
      
      const playPromise = sound.play();
      
      if (playPromise !== undefined) {
         playPromise.catch(error => {
            // Handle AbortError silently
         });
      }
   }

   /**
    * Plays a sound effect with a delay to avoid AbortError.
    * @param {HTMLAudioElement} sound - The sound to play.
    * @param {number} [delay=50] - The delay in milliseconds before playing the sound.
    */
   static playSoundWithDelay(sound, delay = 50) {
      const soundOn = localStorage.getItem('musicOn') === 'true';
      if (!soundOn) {
         return;
      }
      
      setTimeout(() => {
         AudioHub.playOneSound(sound);
      }, delay);
   }

   /**
    * Stops all sounds currently playing.
    */
   static stopAllSounds() {
      AudioHub.allSounds.forEach(sound => {
         sound.pause();
      });
   }

   /**
    * Stops a specific sound from playing.
    * @param {HTMLAudioElement} sound - The sound to stop.
    */
   static stopOneSound(sound) {
      sound.pause();
   }
}

/**
 * Set background music to loop continuously.
 */
AudioHub.GAMEMUSIC.loop = true;

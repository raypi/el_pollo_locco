/**
 * Handles audio error sounds and provides methods for playing and stopping them.
 */
class AudioError {
    /**
     * Long error sound effect.
     * @type {HTMLAudioElement}
     */
    static LONG = new Audio('assets/audio/binary.mp3');

    /**
     * Plays a sound when it's ready.
     * Checks the readyState of the sound and plays it when ready.
     * @param {HTMLAudioElement} sound - The sound to play.
     */
    static playOneSound(sound) {
        setInterval(() => { 
            if (sound.readyState == 4) { 
                sound.volume = 0.5;
                sound.play(); 
            }
        }, 200);
    }

    /**
     * Stops a specific sound from playing.
     * @param {HTMLAudioElement} sound - The sound to stop.
     */
    static stopOneSound(sound) {
        sound.pause();
    }
}

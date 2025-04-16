class AudioError {
    static LONG = new Audio('assets/audio/binary.mp3');

    static playOneSound(sound) {
        setInterval(() => { 
            if (sound.readyState == 4) { 
                console.log("Sound ready"); 
                sound.volume = 0.5;
                sound.play(); 
            } else {
                console.log("Sound not ready"); 
            }
        }, 200);
    }

    static stopOneSound(sound) {
        sound.pause();
    }
}
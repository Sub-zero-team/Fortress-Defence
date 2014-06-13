var backgroundMusic = loadSound('audio/intro.mp3');
var levelMusic = loadSound('audio/level.mp3');
//var someSound = loadSound('audio/....mp3');

function toggleLevelMusic() {
    var music = document.getElementById('music');
    if (levelMusic.paused) {
        levelMusic.play();
        music.src = 'images/icons/sound-on.png';
    }
    else {
        //levelMusic.volume = 0.2;
        levelMusic.pause();
        music.src = 'images/icons/sound-off.png';
    }
}

function loadSound(url) {
    var audio = new Audio(url);
    audio.load();
    return audio;
}
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const playPauseIcon = document.getElementById('play-pause-icon');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const songs = [
    {
        title: "Lost in the City Lights",
        artist: "Cosmo Sheldrake",
        cover: "images/cover-1.png",
        file: "audio/forest-lullaby-110624.mp3"
    },
    {
        title: "Forest Lullaby",
        artist: "Lesfm",
        cover: "images/cover-2.png",
        file: "audio/lost-in-city-lights-145038.mp3"
    }
];

let songIndex = 0;

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.file;

    progress.value = 0;
    document.documentElement.style.setProperty('--progress-value', '0%');

    setTimeout(() => {
        progress.value = 0;
        document.documentElement.style.setProperty('--progress-value', '0%');
    }, 50);

    currentTimeEl.textContent = "00:00";
    durationEl.textContent = "00:00";
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playPauseIcon.src = "images/Pause_fill.svg";
    audio.play();
}

// Ajoutez cet écouteur d'événement après avoir défini les autres
audio.addEventListener('ended', nextSong);

function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0; // Recommence à la première chanson si c'était la dernière
    }

    loadSong(songs[songIndex]);
    playPauseIcon.src = "images/Pause_fill.svg";
    audio.play();
}


function playPauseSong() {
    if (audio.paused) {
        audio.play();
        playPauseIcon.src = "images/Pause_fill.svg";
    } else {
        audio.pause();
        playPauseIcon.src = "images/Play_fill.svg";
    }
}

function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;

    document.documentElement.style.setProperty('--progress-value', `${progressPercent}%`);

    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    currentTimeEl.textContent = `${minutes}:${seconds}`;

    if (duration) {
        let totalMinutes = Math.floor(duration / 60);
        let totalSeconds = Math.floor(duration % 60);
        if (totalSeconds < 10) {
            totalSeconds = `0${totalSeconds}`;
        }
        durationEl.textContent = `${totalMinutes}:${totalSeconds}`;
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

playPauseBtn.addEventListener('click', playPauseSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click', setProgress);

loadSong(songs[songIndex]);

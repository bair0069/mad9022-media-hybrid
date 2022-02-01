
let playerArea = document.getElementById('player-area')
let albumArt = document.getElementById('playing-song-art');
let artist = document.getElementById('artist')
let song = document.getElementById('song')
let progressBar = document.getElementById('progress-bar')
let playlist = document.getElementById('playlist')
let playlistSongs = document.getElementsByClassName('playlist-item')
let playSpan = document.getElementById('play-span')
let audio = document.getElementById('audio-player');
let currentTrack=0;


function showPlayBtn () { // display the play button
    playSpan.textContent='play_arrow';
}

function showPauseBtn() { // display the pause button
playSpan.textContent='pause';
}

function switchSong() {
    updateSongInfo()
    changeActiveTrack()
    stopAnimation()
    audio.play()
    audio.setAttribute('src',songList[currentTrack].src)
}


/*  - - - - - - - update song information and player information - - - - -  */

function changeActiveTrack () {     // add active to current track 
    playlistSongs[currentTrack].classList.add('active')
    console.log(playlistSongs)
    audio.setAttribute('src',playlistSongs[currentTrack].src)
    audio.load()
}

function removeActiveTrack () { // remove active from old current track
    playlistSongs[currentTrack].classList.remove('active')
}

function secondsToMinutes (time) {  // convert time to seconds and minutes
let minutes = Math.floor(time/60);
let seconds = Math.round((time-minutes*60));
let timeConverted= `${minutes}:${seconds.toString().padStart(2,'0')}`;
return timeConverted
}

function updateTime () {  // update the amount of time that has passed in the song
    let progress = document.getElementById('progress')
    let timeLeft = secondsToMinutes(audio.currentTime)
    progressBar.setAttribute('data-currentTime',(timeLeft))
    progress.setAttribute('value',audio.currentTime);
    progress.setAttribute('max',audio.duration)
}

function updateSongLength () { //update the length of the song when songs change
    progressBar.setAttribute('data-songLength',secondsToMinutes(audio.duration))
}

function updateSongInfo () { //update player background, song title, artist
    playerArea.style.background=`linear-gradient(rgba(0, 0, 0, 0.705), rgba(0, 0, 0, 0.774)),url("${songList[currentTrack].img}")`
    albumArt.setAttribute('src',songList[currentTrack].img);
    song.textContent=`${songList[currentTrack].title}`;
    artist.textContent=`${songList[currentTrack].artist}`
}


function stopAnimation () { // remove active class from albumArt
    albumArt.classList.remove('active')
}

function toggleAnimation () {  // remove or add active class to albumArt
    if(albumArt.classList.contains("active")){
    albumArt.classList.remove("active")
    }
    else{
    albumArt.classList.add("active")
    };
}

export {stopAnimation, toggleAnimation, updateSongInfo, updateSongLength, updateTime, removeActiveTrack, changeActiveTrack, switchSong, 
showPauseBtn, showPlayBtn}
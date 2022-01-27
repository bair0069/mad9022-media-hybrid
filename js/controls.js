'use strict'
import{songs as songList}from "./songs.js";

let playerArea = document.getElementById('player-area')
let albumArt = document.getElementById('playing-song-art');
let artist = document.getElementById('artist')
let song = document.getElementById('song')
let audio = document.getElementById('audio-player');
let playBtn = document.getElementById('btnPlay');
let pauseBtn = document.getElementById('btnPause');
let stopBtn = document.getElementById('btnStop');
let progressBar = document.getElementById('progress-bar')
let skip10Btn = document.getElementById('btnFwd10')
let back10Btn = document.getElementById('btnReplay10')
let nextSong = document.getElementById('btnSkipForward')
let previousSong= document.getElementById('btnSkipBack')
let playlist = document.getElementById('playlist')
let player = document.getElementById('player')
let playSpan = document.getElementById('play-span')
let currentTrack=0;

function switchSong() {
    updateSongInfo()
    stopAnimation()
    showPlayBtn()
    audio.play()
    audio.setAttribute('src',songList[currentTrack].src)
}

function showPlayBtn () {
    playSpan.textContent='play_arrow';
}

function showPauseBtn() {
playSpan.textContent='pause';
}

/* - - - - - - - - -TODO :: Fix album art background to stop repeating -- - - - - - - - - - -  */
/* - - - - - - - - -TODO :: Display active tracks -- - - - - - - - - - -  */


function updateSongInfo () {
    playerArea.style.background=`linear-gradient(rgba(0, 0, 0, 0.705), rgba(0, 0, 0, 0.774)),url("${songList[currentTrack].img}")`
    albumArt.setAttribute('src',songList[currentTrack].img);
    song.textContent=`${songList[currentTrack].title}`;
    artist.textContent=`${songList[currentTrack].artist}`
}

function stopAnimation () {
    albumArt.classList.remove('active')
}



playBtn.addEventListener('click',()=>{ // Play selected song remove play button and display pause button
    if(player.classList.contains('is-playing')){
        player.classList.remove('is-playing')
        showPlayBtn()
        audio.pause()
    }
    else{player.classList.add('is-playing')
    showPauseBtn()
    audio.play()}
})



stopBtn.addEventListener('click',()=>{ // Stop art spinning, remove pause, display play, reload audio
    showPlayBtn()
    albumArt.classList.remove("active")
    audio.currentTime=0;
    audio.pause()
})

skip10Btn.addEventListener('click',()=> audio.currentTime+=10)  // Skip forward 10 seconds 

back10Btn.addEventListener('click',()=> audio.currentTime-=10)  // Skip Backward 10 seconds

nextSong.addEventListener('click',() =>{ // Skip to next song
    if (currentTrack < songList.length){
    switchSong()
    removeActiveTrack(currentTrack)
    console.log(currentTrack)
    currentTrack+=1
    changeActiveTrack(currentTrack)
    console.log(currentTrack)

    }
    return currentTrack
})

previousSong.addEventListener('click',() =>{ // Go back a song
    if (currentTrack > 0){
        switchSong()
        removeActiveTrack(currentTrack)
        currentTrack-=1
        changeActiveTrack(currentTrack)
        audio.play()
        console.log(currentTrack)
    }
    else{}
})

function toggleAnimation () {
    if(albumArt.classList.contains("active")){
    albumArt.classList.remove("active")
    }
    else{
    albumArt.classList.add("active")
    };
}

function secondsToMinutes (time) {
let minutes = Math.floor(time/60);
let seconds = Math.round((time-minutes*60));
let timeConverted= `${minutes}:${seconds.toString().padStart(2,'0')}`;
return timeConverted
}

function updateTime () {
    let progress = document.getElementById('progress')
    let timeLeft = secondsToMinutes(audio.currentTime)
    progressBar.setAttribute('data-currentTime',(timeLeft))
    progress.setAttribute('value',audio.currentTime);
    progress.setAttribute('max',audio.duration)
}

function updateSongLength () {
    progressBar.setAttribute('data-songLength',secondsToMinutes(audio.duration))
}

function changeActiveTrack (currentTrack) {
    console.log(playlistSongs[currentTrack])
    playlistSongs[currentTrack].classList.add('active')
    audio.play()
}

function removeActiveTrack (currentTrack) {
    playlistSongs[currentTrack].classList.remove('active')
}


export {toggleAnimation, audio, updateTime, updateSongLength}

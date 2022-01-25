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
let currentTrack=0;

function switchSong() {
    updateSongInfo()
    stopAnimation()
    showPlayBtn()
    audio.setAttribute('src',songList[currentTrack].src)
}

function showPlayBtn () {
    pauseBtn.style.display='none'
    playBtn.style.display='unset'
}

/* - - - - - - - - -TODO :: Fix album art background to stop repeating -- - - - - - - - - - -  */
/* - - - - - - - - -TODO :: Display seconds properly -- - - - - - - - - - -  */
/* - - - - - - - - -TODO :: Display seconds properly -- - - - - - - - - - -  */


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
    playBtn.style.display='none'
    pauseBtn.style.display='inherit'
    audio.play()
})

pauseBtn.addEventListener('click',()=>{ // Pause selected song, display play, remove pause.
    showPlayBtn()
    audio.pause()
})

stopBtn.addEventListener('click',()=>{ // Stop art spinning, remove pause, display play, reload audio
    showPlayBtn()
    stopAnimation()
    audio.load()
})

skip10Btn.addEventListener('click',()=> audio.currentTime+=10)  // Skip forward 10 seconds 

back10Btn.addEventListener('click',()=> audio.currentTime-=10)  // Skip Backward 10 seconds

nextSong.addEventListener('click',() =>{ // Skip to next song
    if (currentTrack < songList.length){
    switchSong()
    currentTrack+=1
    console.log(currentTrack)

    }
})

previousSong.addEventListener('click',() =>{ // Go back a song
    if (currentTrack > 0){
        switchSong()
        currentTrack-=1
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
let timeConverted= `${minutes}:${seconds}`;
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



export {toggleAnimation, audio, updateTime, updateSongLength}

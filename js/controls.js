
'use strict'
import{songs as songList}from "./songs.js";

/* - - - - - - - - -TODO :: Fix album art background to stop repeating -- - - - - - - - - - -  */
/* - - - - - - - - -TODO :: Make Stop button stop art -- - - - - - - - - - -  */


let playerArea = document.getElementById('player-area')
let albumArt = document.getElementById('playing-song-art');
let artist = document.getElementById('artist')
let song = document.getElementById('song')
let audio = document.getElementById('audio-player');
let playPauseBtn = document.getElementById('btnPlay');
let stopBtn = document.getElementById('btnStop');
let progressBar = document.getElementById('progress-bar')
let skip10Btn = document.getElementById('btnFwd10')
let back10Btn = document.getElementById('btnReplay10')
let nextSong = document.getElementById('btnSkipForward')
let previousSong= document.getElementById('btnSkipBack')
let playlist = document.getElementById('playlist')
let playlistSongs = document.getElementsByClassName('playlist-item')
let player = document.getElementById('player')
let playSpan = document.getElementById('play-span')
let currentTrack=0;

playPauseBtn.addEventListener('click',()=>{ // Play selected song remove play button and display pause button
    if(player.classList.contains('is-playing')){
        player.classList.remove('is-playing')
        showPlayBtn()
        audio.pause()
    }
    else{player.classList.add('is-playing')
    showPauseBtn()
    changeActiveTrack()
    audio.play()}

})

stopBtn.addEventListener('click',()=>{ // Stop art spinning, remove pause, display play, reload audio
    audio.currentTime=0;
    audio.pause()
    showPlayBtn()
})

skip10Btn.addEventListener('click',()=> audio.currentTime+=10)  // Skip forward 10 seconds 

back10Btn.addEventListener('click',()=> audio.currentTime-=10)  // Skip Backward 10 seconds

nextSong.addEventListener('click',function songEnded(){ // Skip to next song
    if (currentTrack < songList.length){
    removeActiveTrack(currentTrack)
    switchSong()
    console.log(currentTrack)
    currentTrack+=1
    changeActiveTrack(currentTrack)
    console.log(currentTrack)

    }
    showPauseBtn()
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

/* - -- - - - - - - - - - Toggle play button - - - - - - - - - - -*/

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

//  - - - - - - - Toggle animations on or off - - - - - - - - - 

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

function createPlaylist(array) {
    playlist.textContent=""
    array.forEach((item)=>{
        let li = document.createElement('li')
        li.setAttribute('data-src',item.src);
        li.setAttribute('class', 'playlist-item')
        li.innerHTML = `<img src="${item.img}" alt="Cover art of ${item.title}"> <p>${item.title}</p> <p class="playlist-artist">${item.artist}</p>`
        playlist.append(li)
    })
}


export {toggleAnimation, stopAnimation, audio, updateTime, updateSongLength,createPlaylist}

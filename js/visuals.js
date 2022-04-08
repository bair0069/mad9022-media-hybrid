import {player} from './controls.js'
import{songs}from "./songs.js";

/* - - - - - - - - - - - - - - Global Variables - - - - - - - - - - - - - - */

let playlist = document.getElementById('playlist')
let playerArea = document.getElementById('player-area')
let albumArt = document.getElementById('playing-song-art');
let artist = document.getElementById('artist')
let song = document.getElementById('song')
let progressBar = document.getElementById('progress-bar')
let playlistSongs = document.getElementsByClassName('playlist-item')
let playSpan = document.getElementById('play-span')
let audio = document.getElementById('audio-player');



/* - - - - - - - - - - - - - - Visual Functions - - - - - - - - - - - - - - */

//  - - - - - Play/Pause display functions - - - - - -


function showPlayBtn () { // display the play button
    playSpan.textContent='play_arrow';
}

function showPauseBtn() { // display the pause button
playSpan.textContent='pause';
}

//  - - - - - Switch Song function - - - - - -

function switchSong(index) { // update active item, and play new song.
    player.classList.add('is-playing') // manually add 'is-playing' to player classlist
    removeActiveTrack() // remove the active class from the "old" track
    showPauseBtn() // display the pause button
    updateSongInfo(index)//update player background, song title, artist, and src
    stopAnimation() // stop animation playing on the player
    audio.play() // play the new song
}


/*  - - - - - - - update song information and player information - - - - -  */


function removeActiveTrack() {          // remove active from old current track
let oldTrack = document.querySelector('.playlist-item.active')
if(oldTrack){
    oldTrack.classList.remove('active')}
}

function secondsToMinutes (time) {      // convert time to seconds and minutes
let minutes = Math.floor(time/60); // divide seconds by 60
let seconds = Math.round((time-minutes*60)); // subtract minutes from (se)
let timeConverted= `${minutes}:${seconds.toString().padStart(2,'0')}`;
return timeConverted
}

function updateTime () {                // update the amount of time that has passed in the song
    let progress = document.getElementById('progress')
    let timeLeft = secondsToMinutes(audio.currentTime)
    progressBar.setAttribute('data-currentTime',(timeLeft))
    progress.setAttribute('value',audio.currentTime);
    progress.setAttribute('max',audio.duration)
}

function updateSongLength () {          //update the length of the song when songs change
    progressBar.setAttribute('data-songLength',secondsToMinutes(audio.duration))
}

function updateSongInfo (index) { //update player background, song title, artist
    playlistSongs[index].classList.add('active')    // add active class to playlist-item
    audio.setAttribute('src',songs[index].src)      // set audio.src to the new source
    playerArea.style.backgroundImage=`linear-gradient(rgba(0, 0, 0, 0.705), rgba(0, 0, 0, 0.774)),url("${songs[index].img}")`                           // change player background image
    albumArt.setAttribute('src',songs[index].img);  // change albumArt image in player
    song.textContent=`${songs[index].title}`;       // change displayed song title in player
    artist.textContent=`${songs[index].artist}`     // change displayed artist in player
}

//  - - - - - - - - - - - - - - Animation Controls - - - - - - - - - - - - -

function stopAnimation () { // remove active class from albumArt
    albumArt.classList.remove('active')
}

function toggleAnimation () {  // remove or add active class to albumArt
    if(albumArt.classList.contains("active")){
    albumArt.classList.remove("active")
    }
    else{
    albumArt.classList.add("active")
    }
}


export {stopAnimation, toggleAnimation, updateSongInfo, updateSongLength, updateTime, removeActiveTrack, switchSong, 
showPauseBtn, showPlayBtn, playlist}
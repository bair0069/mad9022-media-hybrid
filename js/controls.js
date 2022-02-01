
'use strict'
import{songs as songList}from "./songs.js";
import{stopAnimation, toggleAnimation, updateSongInfo, updateSongLength, updateTime, removeActiveTrack, changeActiveTrack, switchSong,showPauseBtn, showPlayBtn} from './visuals.js';


/* - - - - - - - - -TODO :: Fix album art background to stop repeating -- - - - - - - - - - -  */
/* - - - - - - - - -TODO :: Fix music playback -- - - - - - - - - - -  */
/* - - - - - - - - -TODO :: Fix album art background to stop repeating -- - - - - - - - - - -  */



let audio = document.getElementById('audio-player');
let playlist = document.getElementById('playlist')
let player = document.getElementById('player')
let controls = document.getElementById('controls')
let currentTrack=0 ;


/* - - - - - - - - - - - - - - Controls - - - - - - - - - - - - - - */

controls.addEventListener('click', (ev) => { // one event listener for all controls
    let target = ev.target;
    let btn = target.closest('button').getAttribute('id')
//"btnSkipBack""btnReplay10""btnPlay""btnStop""btnFwd10""btnSkipForward"
    switch (btn) {
        case "btnSkipBack" :
            previousSong()
        break;
        case "btnReplay10" :
            back10()
        break;
        case "btnPlay" :
            playPause()
        break;
        case "btnStop" :
            stopButton()
        break;
        case "btnFwd10" :
            skip10()
        break;
        case "btnSkipForward" :
            nextSong()
        break;
    default:break;
    }
})


function playPause () { // Play selected song remove play button and display pause button
    if(player.classList.contains('is-playing')){
        audio.pause()
        player.classList.remove('is-playing')
        showPlayBtn()
    }
    else{player.classList.add('is-playing')
    audio.play()}
    showPauseBtn()

}

function stopButton(){ // Stop art spinning, remove pause, display play, reload audio
    stopAnimation()
    audio.currentTime=0;
    audio.pause()
    showPlayBtn()
}

function skip10 () {audio.currentTime+=10}  // Skip forward 10 seconds 

function back10() {audio.currentTime-=10} // Skip Backward 10 seconds

function nextSong(){ // Skip to next song
    if (currentTrack < songList.length){
    removeActiveTrack()
    switchSong()
    console.log(currentTrack)
    currentTrack+=1
    changeActiveTrack()
    console.log(currentTrack)

    }
    showPauseBtn()
    return currentTrack
}

function previousSong(){ // Go back a song
    if (currentTrack > 0){
        switchSong()
        removeActiveTrack()
        currentTrack-=1
        changeActiveTrack()
        audio.play()
        console.log(currentTrack)
    }
    else{}
}



export {toggleAnimation, stopAnimation, audio, updateTime, updateSongLength,currentTrack}

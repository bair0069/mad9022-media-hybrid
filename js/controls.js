
'use strict'
import{stopAnimation, toggleAnimation, updateSongLength, updateTime, playlist,showPauseBtn, showPlayBtn, switchSong} from './visuals.js';
import{songs}from "./songs.js";
let songIndexes = songs.map((item) => {return item.title})
let audio = document.getElementById('audio-player');
let player = document.getElementById('player')
let controls = document.getElementById('controls')
let currentTrack = 0;
;


/* - - - - - - - - - - - - - - Controls - - - - - - - - - - - - - - */

window.addEventListener('keydown',(ev)=>{
    ev.preventDefault()
    let keyPushed = ev.key
})

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
        showPlayBtn()
        player.classList.remove('is-playing')
    }
    else{player.classList.add('is-playing')
    showPauseBtn()
    audio.play()}

}

function stopButton(){ // Stop art spinning, remove pause, display play, reload audio
    player.classList.remove('is-playing')
    audio.pause()
    stopAnimation()
    audio.currentTime=0;
    showPlayBtn()
}

function skip10 () {audio.currentTime+=10}  // Skip forward 10 seconds 

function back10() {audio.currentTime-=10} // Skip Backward 10 seconds

function previousSong(){
    if(currentTrack===0){}
    else{
        currentTrack-=1
        switchSong(currentTrack)
    }
    audio.currentTime=0;
    
}
function nextSong() {
    console.log(songIndexes.length)
            console.log(currentTrack)
            if(currentTrack===songIndexes.length-1){
                console.log('end of playlist')
                currentTrack=0
            }
            else{
            currentTrack +=1}
            audio.currentTime=0; // reset time when switching songs
            switchSong(currentTrack)
}

function createPlaylist(array) { // create song playlist in html from data in songs.js
    playlist.textContent=""
    array.forEach((item)=>{
        let li = document.createElement('li')
        li.setAttribute('data-src',item.src);
        li.setAttribute('class', 'playlist-item')
        li.setAttribute('data-title',item.title)
        li.innerHTML = `<img src="${item.img}" alt="Cover art of ${item.title}"> <p>${item.title}</p> <p class="playlist-artist">${item.artist}</p>`
        playlist.append(li)
    })
}

playlist.addEventListener('click',(ev)=>{ // add eventListener to playlist items.
    let target = ev.target;
    let song = target.closest('.playlist-item')
    let songTitle = song.getAttribute('data-title')
    currentTrack = songIndexes.indexOf(songTitle)
    switchSong(currentTrack)
})



export {toggleAnimation, stopAnimation, audio, updateTime,createPlaylist, updateSongLength,currentTrack, playPause,player}

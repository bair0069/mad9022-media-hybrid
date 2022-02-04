'use strict'
import{stopAnimation, toggleAnimation, updateSongLength, updateTime, playlist,showPauseBtn, showPlayBtn, switchSong} from './visuals.js';
import{songs}from "./songs.js";

/* - - - - - - - - - - - - - - Global Variables - - - - - - - - - - - - - - */

let songIndexes = songs.map((item) => {return item.title})
let audio = document.getElementById('audio-player');
let player = document.getElementById('player')
let controls = document.getElementById('controls')
let currentTrack = 0;

;


/* - - - - - - - - - - - - - - Event Listeners - - - - - - - - - - - - - - */

//  - - - - - - - -Keyboard key listeners- - - - - 

window.addEventListener('keydown',(ev)=>{ // listen for key presses in the window
    ev.preventDefault()
    let keyPushed = ev.key
    console.log(keyPushed)

    switch (keyPushed) {
        case 'Enter': stopButton()
        break;
        case ' ': playPause()
            break;
        case 'ArrowRight':
            nextSong()
            break;
        case 'ArrowLeft' :
            previousSong()
            break;
    }
})

//  - - - - - - - -Control button listeners- - - - - 

controls.addEventListener('click', (ev) => { // one event listener for all controls
    let target = ev.target;
    let btn = target.closest('button').getAttribute('id')
//"btnSkipBack""btnReplay10""btnPlay""btnStop""btnFwd10""btnSkipForward"
    switch (btn) {
        case "btnSkipBack" :
            previousSong()  // go back a song (defined on line 107)
        break;
        case "btnReplay10" : // Skip Backward 10 seconds
            back10()
        break;
        case "btnPlay" :    // Play selected song display pause or play depending on player classList
            playPause()     // (defined on line 83)
        break;
        case "btnStop" :    // 
            stopButton()    // Stop art spinning, remove pause, display play, set audio current time to 0
        break;              // (defined on line 95)
        case "btnFwd10" :
            skip10()        // Skip Forward 10 seconds
        break;
        case "btnSkipForward" :
            nextSong() // go forward a song (defined on line 116)
        break;
    default:break;
    }
})


//  - - - - - - - -Playlist Listeners- - - - -  


playlist.addEventListener('click',(ev)=>{ // add eventListener to playlist items.
    let target = ev.target;
    let song = target.closest('.playlist-item')
    let songTitle = song.getAttribute('data-title')
    currentTrack = songIndexes.indexOf(songTitle)
    switchSong(currentTrack)
})

//  - - - - - - - - - - - - - - Control Functions - - - - - - - - - - - - - - - - - - - -


function playPause () { // Play selected song display pause or play depending on player classList
    if(player.classList.contains('is-playing')){
        audio.pause()
        showPlayBtn()
        player.classList.remove('is-playing')
    }
    else{player.classList.add('is-playing')
    showPauseBtn()
    audio.play()}

}

function stopButton(){ // Stop art spinning, remove pause, display play, set audio current time to 0
    player.classList.remove('is-playing')
    audio.pause()
    stopAnimation()
    audio.currentTime=0;
    showPlayBtn()
}

function skip10 () {audio.currentTime+=10}  // Skip forward 10 seconds 

function back10() {audio.currentTime-=10} // Skip Backward 10 seconds

function previousSong(){ // go back a song.
    if(currentTrack===0){}
    else{
        currentTrack-=1
        switchSong(currentTrack)//update active item, and play new song (full comments in visuals.js line 32)
    }
    audio.currentTime=0;
    
}
function nextSong() { // go forward a song
    console.log(songIndexes.length)
            if(currentTrack===songIndexes.length-1){
                console.log('end of playlist')
                currentTrack=0
            }
            else{
            currentTrack +=1}
            audio.currentTime=0; // reset time when switching songs
            switchSong(currentTrack) //update active item, and play new song (full comments in visuals.js line 32)
}



//  - - - - - - - - - - - - - - - - - - - Playlist Creation - - - - - - - - - - - - 



function createPlaylist(array) { // create song playlist in html from data in songs.js
    playlist.textContent=""                         //clear playlist
    array.forEach((item)=>{                         // for each item in songs create an li
        let li = document.createElement('li')   
        li.setAttribute('data-src',item.src);       // store the song source for extraction later
        li.setAttribute('data-title',item.title)    // store the song title for extraction later
        li.setAttribute('class', 'playlist-item')   // add the playlist-item class to the li
        li.innerHTML = `<img src="${item.img}" alt="Cover art of ${item.title}"> <p>${item.title}</p> <p class="playlist-artist">${item.artist}</p>` 
        playlist.append(li)                         // put the li into the playlist
    })
}



export {toggleAnimation, stopAnimation, audio, updateTime,createPlaylist, updateSongLength,currentTrack, playPause,player,nextSong}

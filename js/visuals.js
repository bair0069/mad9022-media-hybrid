import{songs}from "./songs.js";
import {playPause} from './controls.js'

let playlist = document.getElementById('playlist')
let songIndexes = songs.map((item) => {return item.title})
let playerArea = document.getElementById('player-area')
let albumArt = document.getElementById('playing-song-art');
let artist = document.getElementById('artist')
let song = document.getElementById('song')
let progressBar = document.getElementById('progress-bar')
let playlistSongs = document.getElementsByClassName('playlist-item')
let playSpan = document.getElementById('play-span')
let audio = document.getElementById('audio-player');
let currentTrack="";

function showPlayBtn () { // display the play button
    playSpan.textContent='play_arrow';
}

function showPauseBtn() { // display the pause button
playSpan.textContent='pause';
}

function switchSong(index) {
    removeActiveTrack()
    playPause()
    updateSongInfo(index)
    
    stopAnimation()
    audio.setAttribute('src',songs[currentTrack].src)
    audio.play()
}


/*  - - - - - - - update song information and player information - - - - -  */

async function changeActiveTrack (index) {     // add active to current track 
    await audio.setAttribute('src',playlistSongs[index].src)
    playlistSongs[index].classList.add('active')
    playPause()
    
}

function removeActiveTrack() { // remove active from old current track
let oldTrack = document.querySelector('.playlist-item.active')
if(oldTrack){
    oldTrack.classList.remove('active')}
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

function updateSongInfo (index) { //update player background, song title, artist
    changeActiveTrack(index)
    playerArea.style.backgroundImage=`linear-gradient(rgba(0, 0, 0, 0.705), rgba(0, 0, 0, 0.774)),url("${songs[index].img}")`
    albumArt.setAttribute('src',songs[index].img);
    song.textContent=`${songs[index].title}`;
    artist.textContent=`${songs[index].artist}`
}


function stopAnimation () { // remove active class from albumArt
    player.classList.remove('is-playing')
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
        li.setAttribute('data-title',item.title)
        li.innerHTML = `<img src="${item.img}" alt="Cover art of ${item.title}"> <p>${item.title}</p> <p class="playlist-artist">${item.artist}</p>`
        playlist.append(li)
    })
}

playlist.addEventListener('click',(ev)=>{
    let target = ev.target;
    let song = target.closest('.playlist-item')
    let source = song.getAttribute('data-src')
    let songTitle = song.getAttribute('data-title')
    console.log(songIndexes)
    console.log(`'${songTitle}'`)
    console.log(songIndexes.indexOf(songTitle))
    
    

        console.log(song.getAttribute('data-src'))
        audio.setAttribute('src',source)
        currentTrack = songIndexes.indexOf(songTitle)
        switchSong(currentTrack)
        audio.play()

})


export {stopAnimation, toggleAnimation, updateSongInfo, updateSongLength, updateTime, removeActiveTrack, changeActiveTrack, switchSong, 
showPauseBtn, showPlayBtn, createPlaylist}
import {audio} from "./controls.js";
import {switchSong,removeActiveTrack, changeActiveTrack} from './visuals.js';
import {songs} from './songs.js';
let playingSong = 0
let playlist = document.getElementById('playlist')

let songIndexes = songs.map((item) => {return item.title})


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
    console.log(songIndexes)
    console.log(`'${song.getAttribute('data-title')}'`)
    console.log(songIndexes.indexOf(song.getAttribute('data-title')))
    
    
    if(song.classList.contains('active')){
        audio.currentTime=0;
        audio.play();
    }
    else{
        audio.setAttribute('src',song.getAttribute('data-src'))
        removeActiveTrack(playingSong)
        
        switchSong(playingSong)}


})
export {createPlaylist}
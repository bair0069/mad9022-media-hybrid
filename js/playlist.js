import { audio } from "./controls";

let playlist = document.getElementById('playlist')

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

playlist.addEventListener('click',(ev)=>{
    let target = ev.target;
    let song = target.closest('.playlist-item')
    
    
    if(song.classList.contains('active')){
        audio.src = song.getAttribute('src')
        audio.load();
        audio.play();
    }


})
export {createPlaylist}
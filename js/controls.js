let albumArt = document.getElementById('playing-song-art');
let audio = document.getElementById('audio-player');
let playBtn = document.getElementById('btnPlay');
let pauseBtn = document.getElementById('btnPause');
let stopBtn = document.getElementById('btnStop');
let progressBar = document.getElementById('progress-bar')



playBtn.addEventListener('click',()=>
    audio.play())
pauseBtn.addEventListener('click',()=>
    audio.pause())
stopBtn.addEventListener('click',()=>{
    audio.pause()
    audio.load()})

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

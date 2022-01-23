import {toggleAnimation, updateTime, updateSongLength, audio} from './controls.js';




audio.addEventListener('play', (ev)=>{
    console.log(audio.currentTime)
    toggleAnimation()
    updateSongLength()
})

audio.addEventListener('pause',toggleAnimation);

audio.addEventListener('durationchange',updateSongLength);

audio.addEventListener('timeupdate',updateTime);







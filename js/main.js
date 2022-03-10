import {createPlaylist,audio, currentTrack,nextSong} from './controls.js';
import{songs} from './songs.js';
import{stopAnimation, toggleAnimation, updateSongInfo, updateSongLength, updateTime,} from './visuals.js'




/* - - - - - - - - - - - - - - - ******* TODO:********* - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  
- - - - - - - - - - - Draggable progress bar   - - - - - - - - - - 
- - - - - - - - - - - Fix Volume Controls
*/
function playSong(){
    toggleAnimation()
    updateSongLength()
}

function init(){ // add event listeners to audio



createPlaylist(songs)  // load playlist
updateSongInfo(currentTrack) //update album art and song source


audio.addEventListener('play', playSong)

audio.addEventListener('pause',stopAnimation);

audio.addEventListener('durationchange',updateSongLength);

audio.addEventListener('timeupdate',updateTime);

audio.addEventListener('ended',nextSong);

}

document.addEventListener('DOMContentLoaded', init)




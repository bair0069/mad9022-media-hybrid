import {toggleAnimation, stopAnimation, updateTime, updateSongLength, createPlaylist,audio, currentTrack,nextSong} from './controls.js';
import{songs} from './songs.js';
import{ updateSongInfo} from './visuals.js'


/* - - - - - - - - - - - - - - - ******* TODO********* - - - - - - - - - - - - - - - - - - - - - - - - - */
/* 
- - - - - - - - - - -  Make pause work after skipping  - - - - - - - - - 
 - - - - - - - - - - - Draggable progress bar   - - - - - - - - - - 
 - - - - - - - - - - -  Custom Colour progress bar  - - - - - - - - - 
*/
function playSong(){ // add event listeners
    toggleAnimation()
    updateSongLength()
}

function init(){



createPlaylist(songs)  // load playlist
updateSongInfo(currentTrack) //update album art and song source


audio.addEventListener('play', playSong)

audio.addEventListener('pause',stopAnimation);

audio.addEventListener('durationchange',updateSongLength);

audio.addEventListener('timeupdate',updateTime);

audio.addEventListener('ended',nextSong);

}

document.addEventListener('DOMContentLoaded', init)




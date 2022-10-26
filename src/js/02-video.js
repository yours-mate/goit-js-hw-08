import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function timeUpdate(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}

const throttledTimeUpdate = throttle(timeUpdate, 1000);

player.on('timeupdate', throttledTimeUpdate);

localStorage.getItem('videoplayer-current-time')
  ? player.setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  : player.setCurrentTime(0);

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });

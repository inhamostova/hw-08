import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_KEY = 'videoplayer-current-time';

const time = localStorage.getItem(TIME_KEY) ?? 0;

const player = new Player('handstick', {
  id: 19231868,
  width: 640,
});

player
  .setCurrentTime(time)
  .then(function (seconds) {
    console.log(time);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(
          'the time was less than 0 or greater than the video’s duration'
        );
        break;

      default:
        // some other error occurred
        break;
    }
  });

player.on(
  'timeupdate',
  throttle(function ({ seconds, duration }) {
    if (seconds === duration) {
      localStorage.setItem(TIME_KEY, 0);
      return;
    }
    localStorage.setItem(TIME_KEY, seconds);
  }, 1000)
);

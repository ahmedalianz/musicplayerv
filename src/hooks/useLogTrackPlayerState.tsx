import {Event, useTrackPlayerEvents} from 'react-native-track-player';

const events = [
  Event.PlaybackError,
  Event.PlaybackState,
  Event.PlaybackActiveTrackChanged,
];
const useLogTrackPlayerState = () => {
  useTrackPlayerEvents(events, async event => {
    if (event.type === Event.PlaybackError) {
      console.warn('PlaybackError', event);
    }
    if (event.type === Event.PlaybackState) {
      console.log('PlaybackState', event);
    }
    if (event.type === Event.PlaybackActiveTrackChanged) {
      console.log('PlaybackActiveTrackChanged', event);
    }
  });
};

export default useLogTrackPlayerState;

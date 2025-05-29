import {
  useIsStoreHydrated,
  useTracks,
  useTracksActions,
} from '@/store/selectors';
import {useEffect, useRef} from 'react';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
  });
  await TrackPlayer.setVolume(0.3);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};
const useSetupTrackPlayer = ({onLoad}: {onLoad?: () => void}) => {
  const {fetchDeviceTracks} = useTracksActions();
  const _hasHydrated = useIsStoreHydrated();
  const tracks = useTracks();
  const isInitialized = useRef(false);
  useEffect(() => {
    setupPlayer()
      .then(() => {
        isInitialized.current = true;
        onLoad?.();
      })
      .then(() => {
        if (_hasHydrated) {
          if (!tracks?.length) {
            fetchDeviceTracks();
          }
        }
      })
      .catch(err => {
        isInitialized.current = false;
        console.error(err);
      });
  }, []);
};

export default useSetupTrackPlayer;

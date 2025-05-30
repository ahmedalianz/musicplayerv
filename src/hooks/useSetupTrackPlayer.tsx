import {
  useIsStoreHydrated,
  useTracks,
  useTracksActions,
} from '@/store/selectors';
import {useEffect, useRef, useState} from 'react';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
  });
  await TrackPlayer.setVolume(0.3);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};
const useSetupTrackPlayer = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const {fetchDeviceTracks} = useTracksActions();
  const _hasHydrated = useIsStoreHydrated();
  const tracks = useTracks();
  const isInitialized = useRef(false);
  useEffect(() => {
    setupPlayer()
      .then(() => {
        setProgress(0.3);
        isInitialized.current = true;
      })
      .then(() => {
        setProgress(0.6);
        if (_hasHydrated) {
          if (!tracks?.length) {
            fetchDeviceTracks().then(() => setProgress(0.9));
          }
          TrackPlayer.add(tracks.slice(0, 10));
          setProgress(1);
        }
      })
      .catch(err => {
        isInitialized.current = false;
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [_hasHydrated, tracks, fetchDeviceTracks]);
  return {progress, loading};
};

export default useSetupTrackPlayer;

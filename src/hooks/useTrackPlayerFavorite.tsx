import {useCallback, useState} from 'react';
import TrackPlayer, {Track, useActiveTrack} from 'react-native-track-player';

const useTrackPlayerFavorite = () => {
  const activeTrack = useActiveTrack();
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = useCallback(async () => {
    if (!activeTrack) return;

    setIsFavorite(!isFavorite);
  }, []);

  return {isFavorite, toggleFavorite};
};
export default useTrackPlayerFavorite;

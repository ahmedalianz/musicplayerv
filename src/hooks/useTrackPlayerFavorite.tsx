import {useCallback, useState} from 'react';
import {useActiveTrack} from 'react-native-track-player';

const useTrackPlayerFavorite = () => {
  const activeTrack = useActiveTrack();
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = useCallback(async () => {
    if (!activeTrack) {
      return;
    }

    setIsFavorite(!isFavorite);
  }, [activeTrack, isFavorite]);

  return {isFavorite, toggleFavorite};
};
export default useTrackPlayerFavorite;

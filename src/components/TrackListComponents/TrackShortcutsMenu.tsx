import {useFavoriteActions, useQueue} from '@/store/selectors';
import {InScreenNavigation} from '@/types/Navigation.types';
import {TrackV} from '@/types/TracksList.types';
import {useNavigation} from '@react-navigation/native';
import {PropsWithChildren} from 'react';
import {View} from 'react-native';
import TrackPlayer from 'react-native-track-player';

type TrackShortcutsMenuProps = PropsWithChildren<{track: TrackV}>;

const TrackShortcutsMenu = ({track, children}: TrackShortcutsMenuProps) => {
  const navigation = useNavigation<InScreenNavigation>();

  const isFavorite = track.rating === 1;

  const {toggleTrackFavorite} = useFavoriteActions();
  const activeQueueId = useQueue();

  const handlePressAction = async (id: string) => {
    switch (id) {
      case 'add-to-favorites':
        toggleTrackFavorite(track);
        if (activeQueueId?.startsWith('Favorites')) {
          await TrackPlayer.add(track);
        }
        break;

      case 'remove-from-favorites':
        toggleTrackFavorite(track);
        if (activeQueueId?.startsWith('Favorites')) {
          const queue = await TrackPlayer.getQueue();
          const trackToRemove = queue.findIndex(
            queueTrack => queueTrack.url === track.url,
          );
          if (trackToRemove !== -1) {
            await TrackPlayer.remove(trackToRemove);
          }
        }
        break;

      case 'add-to-playlist':
        navigation.navigate('AddToPlaylist', {trackUrl: track.url});

        break;

      default:
        console.warn(`Unknown menu action ${id}`);
        break;
    }
  };

  return (
    <View></View>
    // <MenuView
    //   onPressAction={({nativeEvent: {event}}) => handlePressAction(event)}
    //   actions={[
    //     {
    //       id: isFavorite ? 'remove-from-favorites' : 'add-to-favorites',
    //       title: isFavorite ? 'Remove from favorites' : 'Add to favorites',
    //     },
    //     {
    //       id: 'add-to-playlist',
    //       title: 'Add to playlist',
    //     },
    //   ]}>
    //   {children}
    // </MenuView>
  );
};

export default TrackShortcutsMenu;

import {TracksList} from '@/components';
import {Styles} from '@/constants';
import {useFavorites} from '@/store/selectors';
import {trackTitleFilter} from '@/utils/filters';
import {generateTracksListId} from '@/utils/formats';
import React, {useMemo, useState} from 'react';
import {View} from 'react-native';

const Favorites = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const favorites = useFavorites();
  const filteredTracks = useMemo(() => {
    if (!searchQuery) {
      return favorites;
    }
    return favorites.filter(trackTitleFilter(searchQuery));
  }, [searchQuery, favorites]);
  return (
    <View style={Styles.container}>
      <TracksList
        {...{searchQuery, setSearchQuery}}
        tracks={filteredTracks}
        id={generateTracksListId('Favorites', searchQuery)}
        title="Favorites"
        hideQueueControls={false}
      />
    </View>
  );
};

export default Favorites;

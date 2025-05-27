import {TracksList} from '@/components';
import {Styles} from '@/constants';
import {trackTitleFilter} from '@/utils/filters';
import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {useFavorites} from '@/store/useLibraryStore';

const Favorites = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {favorites} = useFavorites();
  const filteredTracks = useMemo(() => {
    if (!searchQuery) return favorites;
    return favorites.filter(trackTitleFilter(searchQuery));
  }, [searchQuery]);
  return (
    <View style={Styles.container}>
      <TracksList {...{searchQuery, setSearchQuery, filteredTracks}} />
    </View>
  );
};

export default Favorites;

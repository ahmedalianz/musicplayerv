import {TracksList} from '@/components';
import {Styles} from '@/constants';
import {trackTitleFilter} from '@/utils/filters';
import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {useTracks} from '@/store/useLibraryStore';

const Songs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const library = useTracks();
  const filteredTracks = useMemo(() => {
    if (!searchQuery) return library;

    return library.filter(trackTitleFilter(searchQuery));
  }, [searchQuery]);
  return (
    <View style={Styles.container}>
      <TracksList {...{searchQuery, setSearchQuery, filteredTracks}} />
    </View>
  );
};

export default Songs;

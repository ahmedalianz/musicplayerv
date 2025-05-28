import {TracksList} from '@/components';
import {Styles} from '@/constants';
import {trackTitleFilter} from '@/utils/filters';
import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {useTracks} from '@/store/selectors';
const Songs = () => {
  const {tracks} = useTracks();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredTracks = useMemo(() => {
    if (!searchQuery) return tracks;

    return tracks.filter(trackTitleFilter(searchQuery));
  }, [searchQuery]);
  return (
    <View style={Styles.container}>
      <TracksList {...{searchQuery, setSearchQuery, filteredTracks}} />
    </View>
  );
};

export default Songs;

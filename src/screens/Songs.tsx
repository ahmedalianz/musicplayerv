import {TracksList} from '@/components';
import {Styles} from '@/constants';
import {useTracks} from '@/store/selectors';
import {trackTitleFilter} from '@/utils/filters';
import {generateTracksListId} from '@/utils/formats';
import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
const Songs = () => {
  const tracks = useTracks();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredTracks = useMemo(() => {
    if (!searchQuery) return tracks;
    return tracks.filter(trackTitleFilter(searchQuery));
  }, [searchQuery]);

  return (
    <View style={Styles.container}>
      <TracksList
        {...{searchQuery, setSearchQuery}}
        tracks={filteredTracks}
        id={generateTracksListId('Songs', searchQuery)}
        title="Songs"
      />
    </View>
  );
};

export default Songs;

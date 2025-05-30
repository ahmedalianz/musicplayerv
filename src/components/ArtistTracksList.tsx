import {Artist} from '@/types/Artist.types';
import {trackTitleFilter} from '@/utils/filters';
import {generateTracksListId} from '@/utils/formats';
import React, {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import ArtistHeader from './ArtistHeader';
import TracksList from './TracksList';

const ArtistTracksList = ({artist}: {artist: Artist}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtistTracks = useMemo(() => {
    return artist.tracks.filter(trackTitleFilter(searchQuery));
  }, [artist.tracks, searchQuery]);

  return (
    <TracksList
      {...{searchQuery, setSearchQuery}}
      id={generateTracksListId(artist.name, searchQuery)}
      hideQueueControls
      AdditionalListHeader={() => (
        <ArtistHeader
          artist={artist}
          filteredArtistTracks={filteredArtistTracks}
          search={searchQuery}
        />
      )}
      tracks={filteredArtistTracks}
      title=""
      headerCustomStyle={styles.artistHeader}
    />
  );
};

const styles = StyleSheet.create({
  artistHeader: {marginTop: 0, paddingTop: 10},
});
export default ArtistTracksList;

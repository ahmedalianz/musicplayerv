import {trackTitleFilter} from '@/utils/filters';
import {generateTracksListId} from '@/utils/formats';
import {useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import TracksList from './TracksList';
import {Playlist} from '@/types/TracksList.types';
import ArtistHeader from './ArtistHeader';
import {Images} from '@/constants';
import React from 'react';

const PlaylistTracksList = ({playlist}: {playlist: Playlist}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaylistTracks = useMemo(() => {
    return playlist.tracks.filter(trackTitleFilter(searchQuery));
  }, [playlist.tracks, searchQuery]);

  return (
    <TracksList
      {...{searchQuery, setSearchQuery}}
      id={generateTracksListId(playlist.name, searchQuery)}
      hideQueueControls
      AdditionalListHeader={() => (
        <ArtistHeader
          artist={playlist}
          filteredArtistTracks={filteredPlaylistTracks}
          search={searchQuery}
          imageStyles={{width: '100%', borderRadius: 0}}
          artworkPreview={playlist?.artworkPreview ?? Images.unknownTrack}
        />
      )}
      tracks={filteredPlaylistTracks}
      title=""
      headerCustomStyle={styles.playlistHeader}
    />
  );
};

const styles = StyleSheet.create({
  playlistHeader: {marginTop: 0, paddingTop: 10},
});
export default PlaylistTracksList;

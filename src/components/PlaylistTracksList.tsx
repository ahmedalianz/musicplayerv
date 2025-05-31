import {Playlist} from '@/types/TracksList.types';
import {trackTitleFilter} from '@/utils/filters';
import {generateTracksListId} from '@/utils/formats';
import {useCallback, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import PlaylistHeader from './PlaylistHeader';
import TracksList from './TracksList';

const PlaylistTracksList = ({playlist}: {playlist: Playlist}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaylistTracks = useMemo(() => {
    return playlist.tracks.filter(trackTitleFilter(searchQuery));
  }, [playlist.tracks, searchQuery]);
  const AdditionalListHeader = useCallback(
    () => (
      <PlaylistHeader
        playlist={playlist}
        filteredPlaylistTracks={filteredPlaylistTracks}
        search={searchQuery}
      />
    ),
    [playlist, filteredPlaylistTracks, searchQuery]
  );
  return (
    <TracksList
      {...{searchQuery, setSearchQuery}}
      id={generateTracksListId(playlist.playListName, searchQuery)}
      hideQueueControls
      AdditionalListHeader={AdditionalListHeader}
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

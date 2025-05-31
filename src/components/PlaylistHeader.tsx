import {FontSize, Images, Styles} from '@/constants';
import {Playlist, TrackV} from '@/types/TracksList.types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {QueueControls} from './TrackListComponents';

const PlaylistHeader = ({
  playlist,
  filteredPlaylistTracks,
  search,
}: {
  playlist: Playlist;
  filteredPlaylistTracks: TrackV[];
  search: string;
}) => {
  return (
    <View>
      <View style={styles.artworkImageContainer}>
        <FastImage
          key={playlist?.artworkPreview ?? Images.unknownTrack}
          source={{
            uri: playlist?.artworkPreview ?? Images.unknownTrack,
            priority: FastImage.priority.high,
          }}
          style={styles.playlistImage}
        />
      </View>

      <Text numberOfLines={1} style={styles.playlistNameText}>
        {playlist.playListName}
      </Text>

      {search.length === 0 && (
        <QueueControls tracks={filteredPlaylistTracks} style={styles.pv24} />
      )}
    </View>
  );
};

export default PlaylistHeader;

const styles = StyleSheet.create({
  artworkImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 200,
  },
  playlistImage: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },
  playlistNameText: {
    ...Styles.text,
    marginTop: 22,
    textAlign: 'center',
    fontSize: FontSize.lg,
    fontWeight: '800',
  },
  pv24: {paddingVertical: 24},
});

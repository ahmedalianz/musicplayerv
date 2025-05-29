import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {QueueControls} from './TrackListComponents';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {FontSize, Images, Styles} from '@/constants';
import {Artist} from '@/types/Artist.types';
import {Track} from 'react-native-track-player';

const ArtistHeader = ({
  artist,
  filteredArtistTracks,
  search,
  artworkPreview,
  imageStyles,
}: {
  artist: Artist;
  filteredArtistTracks: Track[];
  search: string;
  artworkPreview?: string;
  imageStyles?: ImageStyle;
}) => {
  return (
    <View>
      <View style={styles.artworkImageContainer}>
        <FastImage
          source={{
            uri: artworkPreview ?? Images.unknownArtist,
            priority: FastImage.priority.high,
          }}
          style={[styles.artistImage, imageStyles]}
        />
      </View>

      <Text numberOfLines={1} style={styles.artistNameText}>
        {artist.name}
      </Text>

      {search.length === 0 && (
        <QueueControls
          tracks={filteredArtistTracks}
          style={{paddingVertical: 24}}
        />
      )}
    </View>
  );
};

export default ArtistHeader;

const styles = StyleSheet.create({
  artistHeader: {marginTop: 0, paddingTop: 10},
  artworkImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 200,
  },
  artistImage: {
    width: '60%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 128,
  },
  artistNameText: {
    ...Styles.text,
    marginTop: 22,
    textAlign: 'center',
    fontSize: FontSize.lg,
    fontWeight: '800',
  },
});

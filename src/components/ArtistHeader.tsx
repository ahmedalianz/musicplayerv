import {FontSize, Images, Styles} from '@/constants';
import {Artist} from '@/types/Artist.types';
import {TrackV} from '@/types/TracksList.types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {QueueControls} from './TrackListComponents';

const ArtistHeader = ({
  artist,
  filteredArtistTracks,
  search,
  artworkPreview,
  imageStyles,
}: {
  artist: Artist;
  filteredArtistTracks: TrackV[];
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

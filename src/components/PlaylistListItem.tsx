import {Colors, Styles} from '@/constants';
import {InScreenNavigation} from '@/types/Navigation.types';
import {Playlist} from '@/types/TracksList.types';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
type PlaylistListItemProps = {
  playlist: Playlist;
};

const PlaylistListItem = ({playlist}: PlaylistListItemProps) => {
  const navigation = useNavigation<InScreenNavigation>();
  const handlePlaylistPress = () => {
    navigation.navigate('Playlist', {playlistName: playlist.playListName});
  };
  return (
    <TouchableHighlight activeOpacity={0.8} onPress={handlePlaylistPress}>
      <View style={styles.playlistItemContainer}>
        <View>
          <FastImage
            source={{
              uri: playlist.artworkPreview,
              priority: FastImage.priority.normal,
            }}
            style={styles.playlistArtworkImage}
          />
        </View>

        <View style={styles.playlistContainer}>
          <Text numberOfLines={1} style={styles.playlistNameText}>
            {playlist.playListName}
          </Text>

          <Icon
            name="chevron-forward"
            size={16}
            color={Colors.icon}
            style={styles.fainted}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  playlistItemContainer: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
    paddingRight: 90,
  },
  playlistArtworkImage: {
    borderRadius: 8,
    width: 70,
    height: 70,
  },
  playlistNameText: {
    ...Styles.text,
    fontSize: 17,
    fontWeight: '600',
    maxWidth: '80%',
  },
  playlistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  fainted: {opacity: 0.5},
});
export default PlaylistListItem;

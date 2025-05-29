import {View, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {Images, Styles} from '@/constants';

interface ListEmptyProps {
  message: string;
  imageUri: string;
  accessibilityLabel?: string;
}

const ListEmptyComponent: React.FC<ListEmptyProps> = ({
  message,
  imageUri,
  accessibilityLabel = 'Empty List Illustration',
}) => (
  <View>
    <Text style={Styles.emptyContentText}>{message}</Text>
    <FastImage
      source={{uri: imageUri, priority: FastImage.priority.normal}}
      style={Styles.emptyContentImage}
      accessibilityLabel={accessibilityLabel}
      resizeMode={FastImage.resizeMode.contain}
    />
  </View>
);

export const ListEmptySongsComponent = () => (
  <ListEmptyComponent
    message="No songs found"
    imageUri={Images.unknownTrack}
    accessibilityLabel="No songs illustration"
  />
);

export const ListEmptyArtistComponent = () => (
  <ListEmptyComponent
    message="No artists found"
    imageUri={Images.unknownArtist}
    accessibilityLabel="No artists illustration"
  />
);
export const ListEmptyPlaylistComponent = () => (
  <ListEmptyComponent
    message="No playlists found"
    imageUri={Images.unknownTrack}
    accessibilityLabel="No playlists illustration"
  />
);

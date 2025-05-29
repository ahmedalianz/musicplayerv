import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {Images, Styles} from '@/constants';
import {Artist} from '@/types/Artist.types';
import {useNavigation} from '@react-navigation/native';
import {InScreenNavigation} from '@/types/Navigation.types';

const ArtistAvatar = ({artist}: {artist: Artist}) => {
  const navigation = useNavigation<InScreenNavigation>();
  const handleNavigateToArtist = () => {
    navigation.navigate('Artist', {artistName: artist.name});
  };
  return (
    <TouchableHighlight activeOpacity={0.8} onPress={handleNavigateToArtist}>
      <View style={styles.artistItemContainer}>
        <View>
          <FastImage
            source={{
              uri: Images.unknownArtist,
              priority: FastImage.priority.normal,
            }}
            style={styles.artistImage}
          />
        </View>

        <View style={{width: '100%'}}>
          <Text numberOfLines={1} style={styles.artistNameText}>
            {artist?.name}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ArtistAvatar;

const styles = StyleSheet.create({
  artistItemContainer: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
  },
  artistImage: {
    borderRadius: 32,
    width: 40,
    height: 40,
  },
  artistNameText: {
    ...Styles.text,
    fontSize: 17,
    maxWidth: '80%',
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Styles} from '@/constants';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useArtists} from '@/store/selectors';
import {ArtistTracksList} from '@/components';
import {InScreenNavigation} from '@/types/Navigation.types';

const Artist = () => {
  const artists = useArtists();
  const route = useRoute<RouteProp<{params: {artistName: string}}>>();
  const navigation = useNavigation<InScreenNavigation>();
  const artist = artists.find(
    artist => artist.name === route?.params?.artistName,
  );

  if (!artist) {
    navigation.goBack();

    return;
  }
  return (
    <View style={Styles.container}>
      <ArtistTracksList artist={artist} />
    </View>
  );
};

export default Artist;

const styles = StyleSheet.create({});

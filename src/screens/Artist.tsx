import {ArtistTracksList} from '@/components';
import {Styles} from '@/constants';
import {useArtists} from '@/store/selectors';
import {InScreenNavigation} from '@/types/Navigation.types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';

const Artist = () => {
  const artists = useArtists();
  const route = useRoute<RouteProp<{params: {artistName: string}}>>();
  const navigation = useNavigation<InScreenNavigation>();
  const artist = artists.find(ar => ar.name === route?.params?.artistName);

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

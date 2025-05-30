import {PlaylistTracksList} from '@/components';
import {Styles} from '@/constants';
import {usePlaylists} from '@/store/selectors';
import {InScreenNavigation} from '@/types/Navigation.types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';

const Playlist = () => {
  const playlists = usePlaylists();
  const route = useRoute<RouteProp<{params: {playlistName: string}}>>();
  const navigation = useNavigation<InScreenNavigation>();
  const playlist = playlists.find(
    pl => pl.playListName === route?.params?.playlistName
  );

  if (!playlist) {
    navigation.goBack();
    return;
  }
  return (
    <View style={Styles.container}>
      <PlaylistTracksList playlist={playlist} />
    </View>
  );
};

export default Playlist;

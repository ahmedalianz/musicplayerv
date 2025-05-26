import {TracksList} from '@/components';
import {Styles} from '@/constants';
import React from 'react';
import {View} from 'react-native';

const Favorites = () => {
  return (
    <View style={Styles.container}>
      <TracksList scrollEnabled={false} />
    </View>
  );
};

export default Favorites;

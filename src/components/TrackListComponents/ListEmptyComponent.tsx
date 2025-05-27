import {View, Text} from 'react-native';
import React from 'react';
import {Images, Styles} from '@/constants';
import FastImage from 'react-native-fast-image';

const ListEmptyComponent = () => (
  <View>
    <Text style={Styles.emptyContentText}>No songs found</Text>
    <FastImage
      source={{
        uri: Images.unknownTrack,
        priority: FastImage.priority.normal,
      }}
      style={Styles.emptyContentImage}
    />
  </View>
);

export default ListEmptyComponent;

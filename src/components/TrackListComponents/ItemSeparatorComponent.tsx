import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Styles} from '@/constants';

const ItemSeparatorComponent = () => {
  return <View style={[Styles.itemSeparator, styles.separator]} />;
};
const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    marginStart: 60,
  },
});

export default ItemSeparatorComponent;

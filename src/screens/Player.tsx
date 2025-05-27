import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Styles} from '@/constants';
import {DismissPlayer} from '@/components';

const Player = () => {
  return (
    <View style={styles.overlayContainer}>
      <DismissPlayer />
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  overlayContainer: {
    ...Styles.container,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

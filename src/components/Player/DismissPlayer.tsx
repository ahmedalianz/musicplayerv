import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '@/constants';

const DismissPlayer = () => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.container, {top: top + 8}]}>
      <View accessible={false} style={styles.indicator} />
    </View>
  );
};

export default DismissPlayer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 50,
    height: 8,
    borderRadius: 8,
    backgroundColor: Colors.text,
    opacity: 0.7,
  },
});

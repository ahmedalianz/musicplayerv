import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors} from './src/constants';

const Splash = ({progress}: {progress: number}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.text}>
        Loading music library {Math.round(progress * 100)}%
      </Text>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  text: {marginTop: 16, color: Colors.text},
});

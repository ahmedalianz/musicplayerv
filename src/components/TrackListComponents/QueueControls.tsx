import {Colors, Styles} from '@/constants';
import {QueueControlsProps} from '@/types/TracksList.types';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
const QueueControls = ({tracks, style, ...viewProps}: QueueControlsProps) => {
  const handlePlay = async () => {
    await TrackPlayer.setQueue(tracks);
    await TrackPlayer.play();
  };

  const handleShufflePlay = async () => {
    const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);

    await TrackPlayer.setQueue(shuffledTracks);
    await TrackPlayer.play();
  };

  return (
    <View style={[{flexDirection: 'row', columnGap: 16}, style]} {...viewProps}>
      {/* Play button */}
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={handlePlay}
          activeOpacity={0.8}
          style={styles.button}>
          <Ionicons name="play" size={22} color={Colors.primary} />

          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>

      {/* Shuffle button */}
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={handleShufflePlay}
          activeOpacity={0.8}
          style={styles.button}>
          <Ionicons name={'shuffle-sharp'} size={24} color={Colors.primary} />

          <Text style={styles.buttonText}>Shuffle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: Colors.lighterBackground,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
  },
  buttonText: {
    ...Styles.text,
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default QueueControls;

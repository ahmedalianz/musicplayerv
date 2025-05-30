import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Slider} from 'react-native-awesome-slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {useSharedValue} from 'react-native-reanimated';
import {Colors, FontSize, Styles} from '@/constants';
import {formatSecondsToMinutes} from '@/utils/formats';

const PlayerProgressbar = ({style}: any) => {
  const {duration, position} = useProgress();
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  const isSliding = useSharedValue(false);
  const elapsedTime = formatSecondsToMinutes(position);
  const remainingTime = formatSecondsToMinutes(duration - position);
  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }
  return (
    <View style={style}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        onSlidingComplete={async value => {
          if (!isSliding.value) {
            return;
          }
          isSliding.value = false;
          await TrackPlayer.seekTo(value * duration);
        }}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async value => {
          if (isSliding.value) {
            return;
          }
          await TrackPlayer.seekTo(value * duration);
        }}
        renderBubble={() => null}
        thumbWidth={0}
        containerStyle={Styles.slider}
        theme={{
          minimumTrackTintColor: Colors.minimumTrackTintColor,
          maximumTrackTintColor: Colors.maximumTrackTintColor,
        }}
      />
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{elapsedTime}</Text>
        <Text style={styles.timeText}>-{remainingTime}</Text>
      </View>
    </View>
  );
};

export default PlayerProgressbar;

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 20,
  },
  timeText: {
    ...Styles.text,
    color: Colors.text,
    opacity: 0.75,
    fontSize: FontSize.xs,
    letterSpacing: 0.7,
    fontWeight: '500',
  },
});

import {Colors} from '@/constants';
import {
  PlayerButtonProps,
  PlayerControlsProps,
  SkipButtonProps,
} from '@/types/PlayerControls.types';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {useIsPlaying} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';

export const PlayPauseButton = ({style, iconSize}: PlayerButtonProps) => {
  const {playing} = useIsPlaying();
  return (
    <View style={[{height: iconSize}, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}>
        <Icon
          name={playing ? 'pause' : 'play'}
          size={iconSize}
          color={Colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};
export const SkipButton = ({type, iconSize = 30}: SkipButtonProps) => {
  const iconName = type === 'next' ? 'play-forward' : 'play-back';
  const onPress = () => {
    if (type === 'next') {
      TrackPlayer.skipToNext();
    } else {
      TrackPlayer.skipToPrevious();
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Icon name={iconName} size={iconSize} color={Colors.text} />
    </TouchableOpacity>
  );
};
export const PlayerControls = ({style}: PlayerControlsProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <SkipButton type="previous" iconSize={30} />

        <PlayPauseButton iconSize={30} />

        <SkipButton type="next" iconSize={30} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

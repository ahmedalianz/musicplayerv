import {Colors} from '@/constants';
import {PlayerButtonProps, SkipButtonProps} from '@/types/PlayerControls.types';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
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

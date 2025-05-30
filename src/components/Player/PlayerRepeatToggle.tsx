import {Colors} from '@/constants';
import {useTrackPlayerRepeat} from '@/hooks';
import React from 'react';
import {View, ViewStyle} from 'react-native';
import {RepeatMode} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const repeatOrder: Record<string, RepeatMode> = {
  Off: RepeatMode.Off,
  Track: RepeatMode.Track,
  Queue: RepeatMode.Queue,
};
const repeatIcon: Record<string, string> = {
  0: 'repeat-off',
  1: 'repeat-once',
  2: 'repeat',
};
const PlayerRepeatToggle = ({
  style,
  size,
}: {
  style: ViewStyle;
  size: number;
}) => {
  const {repeatMode, changeRepeatMode} = useTrackPlayerRepeat();
  const toggleRepeatMode = () => {
    if (repeatMode === repeatOrder.Off) {
      changeRepeatMode(repeatOrder.Track);
    } else if (repeatMode === repeatOrder.Track) {
      changeRepeatMode(repeatOrder.Queue);
    } else if (repeatMode === repeatOrder.Queue) {
      changeRepeatMode(repeatOrder.Off);
    }
  };
  return (
    <View style={style}>
      <Icon
        name={repeatIcon[repeatMode || repeatOrder.Off]}
        size={size}
        color={Colors.icon}
        style={style}
        onPress={toggleRepeatMode}
      />
    </View>
  );
};

export default PlayerRepeatToggle;

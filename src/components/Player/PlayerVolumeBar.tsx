import {Colors, Styles} from '@/constants';
import {useTrackPlayerVolume} from '@/hooks';
import React from 'react';
import {View} from 'react-native';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
const PlayerVolumeBar = ({style}: any) => {
  const {volume, updateVolume} = useTrackPlayerVolume();

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);
  progress.value = volume ?? 0;
  return (
    <View style={style}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="volume-low"
          size={20}
          color={Colors.icon}
          style={{opacity: 0.8}}
        />

        <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10}}>
          <Slider
            progress={progress}
            minimumValue={min}
            containerStyle={Styles.slider}
            onValueChange={value => {
              updateVolume(value);
            }}
            renderBubble={() => null}
            theme={{
              maximumTrackTintColor: Colors.maximumTrackTintColor,
              minimumTrackTintColor: Colors.minimumTrackTintColor,
            }}
            thumbWidth={0}
            maximumValue={max}
          />
        </View>

        <Icon
          name="volume-high"
          size={20}
          color={Colors.icon}
          style={{opacity: 0.8}}
        />
      </View>
    </View>
  );
};

export default PlayerVolumeBar;

import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useEffect} from 'react';
import {MovingTextProps} from '@/types/PlayerControls.types';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const MovingText = ({
  style,
  text,
  animationThreshold = 20,
}: MovingTextProps) => {
  const translateX = useSharedValue(0);
  const textWidth = (text?.length || 0) * 3;
  const animatedText = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));
  const shouldAnimate = Number(text?.length || 0) >= animationThreshold;
  useEffect(() => {
    if (shouldAnimate) {
      translateX.value = withDelay(
        1000,
        withRepeat(
          withTiming(-textWidth, {duration: 5000, easing: Easing.linear}),
          -1,
          true,
        ),
      );
    }
    return () => {
      cancelAnimation(translateX);
      translateX.value = 0;
    };
  }, [text, textWidth, translateX, shouldAnimate, animationThreshold]);
  return (
    <View style={style}>
      <Animated.Text
        numberOfLines={1}
        style={[
          shouldAnimate && {width: 999, paddingLeft: 16},
          animatedText,
          style,
        ]}>
        {text}
      </Animated.Text>
    </View>
  );
};

export default MovingText;

const styles = StyleSheet.create({});

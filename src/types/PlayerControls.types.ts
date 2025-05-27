import {ViewStyle} from 'react-native';

export type PlayerControlsProps = {
  style?: ViewStyle;
};
export type MovingTextProps = {
  style?: ViewStyle;
  text?: string;
  animationThreshold?: number;
};
export type PlayerButtonProps = {
  style?: ViewStyle;
  iconSize: number;
};
type SkipButtonType = 'next' | 'previous';

export interface SkipButtonProps extends PlayerButtonProps {
  type: SkipButtonType;
}

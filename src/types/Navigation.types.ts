import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type ScreenNavigation = NativeStackNavigationProp<ParamListBase>;
export type InScreenNavigation = NavigationProp<ParamListBase>;

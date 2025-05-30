import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, FontSize} from './src/constants';
import {
  AddToPlaylist,
  Artist,
  Artists,
  Favorites,
  MusicPlayer,
  Playlist,
  Playlists,
  Songs,
} from './src/screens';
import {FloatingPlayer} from './src/components';
import {Platform, StyleSheet} from 'react-native';
import {useActiveTrack} from 'react-native-track-player';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const getTabBarIcon = (focused: boolean, name: string) => (
  <Icon color={focused ? Colors.primary : Colors.text} name={name} size={24} />
);
const Layout = () => {
  const options = {
    tabBarActiveTintColor: Colors.primary,
    headerShown: false,
    tabBarInactiveTintColor: Colors.text,
    tabBarLabelStyle: {
      fontWeight: '500' as '500',
      fontSize: FontSize.xs,
    },
    headerTintColor: Colors.text,
    headerShadowVisible: false,
    headerStyle: {backgroundColor: Colors.background},
  };
  const active = useActiveTrack();
  return (
    <>
      <Tab.Navigator
        initialRouteName="Songs"
        screenOptions={{
          ...options,
          tabBarStyle: {
            position: 'absolute',
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
            backgroundColor: '#000',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: FontSize.xlg,
          },
        }}>
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({focused}) => getTabBarIcon(focused, 'heart'),
          }}
        />
        <Tab.Screen
          name="Playlists"
          component={Playlists}
          options={{
            tabBarIcon: ({focused}) => getTabBarIcon(focused, 'list'),
          }}
        />
        <Tab.Screen
          name="Songs"
          component={Songs}
          options={{
            tabBarIcon: ({focused}) => getTabBarIcon(focused, 'musical-notes'),
          }}
        />
        <Tab.Screen
          name="Artists"
          component={Artists}
          options={{
            tabBarIcon: ({focused}) => getTabBarIcon(focused, 'people'),
          }}
        />
      </Tab.Navigator>
      {active && <FloatingPlayer style={styles.floatingPlayer} />}
    </>
  );
};
const RootLayout = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Layout" component={Layout} />
    <Stack.Screen name="Artist" component={Artist} />
    <Stack.Screen name="Playlist" component={Playlist} />
    <Stack.Screen
      name="AddToPlaylist"
      component={AddToPlaylist}
      options={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'vertical',
        presentation: 'modal',
        ...Platform.select({
          ios: {
            animationDuration: 400,
          },
          android: {
            animation: 'slide_from_bottom',
            animationDuration: 250,
            // Android-specific configs:
            cardOverlayEnabled: true,
            cardShadowEnabled: true,
          },
        }),
      }}
    />
    <Stack.Screen
      name="MusicPlayer"
      component={MusicPlayer}
      options={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'vertical',
        ...Platform.select({
          ios: {
            presentation: 'card',
            animationDuration: 400,
          },
          android: {
            presentation: 'card',
            animation: 'slide_from_bottom',
            animationDuration: 250,
            // Android-specific configs:
            cardOverlayEnabled: true,
            cardShadowEnabled: true,
          },
        }),
      }}
    />
  </Stack.Navigator>
);

export default RootLayout;
const styles = StyleSheet.create({
  floatingPlayer: {bottom: 78, position: 'absolute', left: 8, right: 8},
});

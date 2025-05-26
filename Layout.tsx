import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, FontSize} from './src/constants';
import {Artists, Favorites, Playlists, Songs} from './src/screens';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (focused: boolean, name: string) => (
  <Icon color={focused ? Colors.primary : Colors.text} name={name} size={24} />
);

const Layout = () => {
  const options = {
    tabBarActiveTintColor: Colors.primary,
    tabBarInactiveTintColor: Colors.text,
    tabBarLabelStyle: {
      fontWeight: '500' as '500',
      fontSize: FontSize.xs,
    },
  };

  return (
    <Tab.Navigator
      screenOptions={{
        ...options,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          backgroundColor: '#000',
        },
        headerTintColor: Colors.text,
        headerShadowVisible: false,
        headerStyle: {backgroundColor: Colors.background},
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
          tabBarIcon: ({focused}) => getTabBarIcon(focused, 'musical-notes'),
        }}
      />
      <Tab.Screen
        name="Songs"
        component={Songs}
        options={{
          tabBarIcon: ({focused}) => getTabBarIcon(focused, 'musical-note'),
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
  );
};

export default Layout;

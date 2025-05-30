import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootLayout from './Layout';
import Splash from './Splash';
import {Styles} from './src/constants';
import useSetupTrackPlayer from './src/hooks/useSetupTrackPlayer';
import React from 'react';
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const {loading, progress} = useSetupTrackPlayer();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={Styles.flexed}>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          {loading ? <Splash progress={progress} /> : <RootLayout />}
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;

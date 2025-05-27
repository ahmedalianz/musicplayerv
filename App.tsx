import {NavigationContainer} from '@react-navigation/native';
import {JSX, useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import RootLayout from './Layout';
import {useSetupTrackPlayer} from './src/hooks';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);
  useSetupTrackPlayer({onLoad: () => setLoading(false)});
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootLayout />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;

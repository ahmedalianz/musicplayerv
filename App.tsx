import {NavigationContainer} from '@react-navigation/native';
import {JSX, useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import RootLayout from './Layout';
import {useSetupTrackPlayer} from './src/hooks';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);
  useSetupTrackPlayer({onLoad: () => setLoading(false)});
  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootLayout />
    </NavigationContainer>
  );
}

export default App;

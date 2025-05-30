import {NavigationContainer} from '@react-navigation/native';
import {JSX, useState} from 'react';
import {StatusBar, View, useColorScheme} from 'react-native';
import RootLayout from './Layout';
import {useSetupTrackPlayer} from './src/hooks';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LoaderKit from 'react-native-loader-kit';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);

  useSetupTrackPlayer({onLoad: () => setLoading(false)});
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LoaderKit
                size={100}
                color="#fff"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                type="circle"
              />
            </View>
          ) : (
            <RootLayout />
          )}
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;

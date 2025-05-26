import {NavigationContainer} from '@react-navigation/native';
import React, {JSX} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import Layout from './Layout';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Layout />
    </NavigationContainer>
  );
}

export default App;

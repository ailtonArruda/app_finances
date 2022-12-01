import React, { useCallback, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import * as SplashScreen from 'expo-splash-screen';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme';
import { Register } from './src/screens/Register';


//SplashScreen.preventAutoHideAsync();

export default function App() {

  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    return null;
  }

  return (
    
      <ThemeProvider theme={theme}>
        <Register />
      </ThemeProvider>

  );
}
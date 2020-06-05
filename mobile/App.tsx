/**
 * @file: App.tsx
 * @author: Paulo Alves
 * @description: responsável pelo ponto de entrada da aplicação mobile.
 * @version 1.0.1 (04/06/2020)
 */

import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';

import Routes from './src/routes';

/**
 * Realiza o carregamento de elementos na aplicação. 
 * @function
 * @name App
 */
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}


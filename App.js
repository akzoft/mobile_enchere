import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './src/libs/navigations/RootNavigation'
import { Provider } from 'react-redux';
import { Store } from './src/libs';


const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={Store}><RootNavigation /></Provider>
  )
}

export default App

const styles = StyleSheet.create({})
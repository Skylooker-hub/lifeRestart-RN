import React, { useLayoutEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './store';
import Navigation from './pages/Navigation';
import life from './lifeInitial';
import localStorage from './SyncStorage';

const Stack = createNativeStackNavigator();

export default function App() {


  useLayoutEffect(() => {
    (async () => {
      await localStorage.init();
    })()
  }, [])

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

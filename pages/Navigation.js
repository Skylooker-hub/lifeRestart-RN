import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './Home/HomeTabs';
import PlayScreen from './Play/PlayScreen';
import Statistics from './Achievement/Statistics';
import Achievement from './Achievement/Achievement';
import { toggleDark } from '../reducers/config/configSlice';
import localStorage from '../SyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const MyDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    info: '#87ceeb',
    error: '#ed1c24',
    success: '#90ee90',
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    info: '#87ceeb',
    error: '#ed1c24',
    success: '#90ee90',
  },
};

export default function Navigation() {

  const isDark = useSelector((state) => state.config.isDark);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      dispatch(toggleDark(theme === 'dark'));
    })()
  }, [])

  return (
    <NavigationContainer theme={isDark ? MyDarkTheme : MyDefaultTheme}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ animation: 'slide_from_right' }}>
        <Stack.Screen name="Home" component={HomeTabs} options={{ header: () => null }} />
        <Stack.Screen name="Play" component={PlayScreen} options={{ header: () => null }} />
        <Stack.Screen name="Statistics" component={Statistics} options={{ title: "统计" }} />
        <Stack.Screen name="Achievement" component={Achievement} options={{ title: "成就" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

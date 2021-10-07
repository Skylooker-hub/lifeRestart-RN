import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './Profile/ProfileScreen';
import PlayIndexScreen from './Play/PlayIndexScreen';
import profileChosed from '../../resource/images/profile_chose.png';
import profileUnchosed from '../../resource/images/profile_unchose.png';
import playChosed from '../../resource/images/play_chose.png';
import playUnchosed from '../../resource/images/play_unchose.png';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create(
  {
    icon: { height: 30, width: 30 }
  }
);

export default function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName="PlayIndex" screenOptions={{ header: () => null }}>
      <Tab.Screen
        name="PlayIndex"
        component={PlayIndexScreen}
        options={{
          title: '开玩',
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Image source={playChosed} resizeMode="contain" style={styles.icon} />;
            }
            return <Image source={playUnchosed} resizeMode="contain" style={styles.icon} />;

          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '我的',
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Image source={profileChosed} resizeMode="contain" style={styles.icon} />;
            }
            return <Image source={profileUnchosed} resizeMode="contain" style={styles.icon} />;

          }
        }}
      />
    </Tab.Navigator>
  );
}

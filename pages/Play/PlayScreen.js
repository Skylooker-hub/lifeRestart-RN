import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChooseTalent from './ChooseTalent';
import ChooseProperty from './ChooseProperty';
import Trajectory from './Trajectory';
import Summary from './Summary';

const Stack = createNativeStackNavigator();

export default function PlayScreen() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="ChooseTalent" component={ChooseTalent} options={{ title: '天赋抽卡' }} />
      <Stack.Screen name="ChooseProperty" component={ChooseProperty} options={{ title: '初始属性调整' }} />
      <Stack.Screen name="Trajectory" component={Trajectory} options={{ header: () => null }} />
      <Stack.Screen name="Summary" component={Summary} options={{ title: '人生总结' }} />
    </Stack.Navigator>
  );
}

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getRate, getGrade } from '../../liferestart/functions/addition';
import Box from './Components/Box';
import { useTheme } from '@react-navigation/native';
import life from '../../lifeInitial';

const formatRate = (type, value) => {
  const rate = getRate(type, value);
  let color = Object.keys(rate)[0];
  switch (parseInt(color)) {
    case 0: color = '白色'; break;
    case 1: color = '蓝色'; break;
    case 2: color = '紫色'; break;
    case 3: color = '橙色'; break;
    default: break;
  }
  let r = Object.values(rate)[0];
  switch (parseInt(r)) {
    case 1: r = '不变'; break;
    case 2: r = '翻倍'; break;
    case 3: r = '三倍'; break;
    case 4: r = '四倍'; break;
    case 5: r = '五倍'; break;
    case 6: r = '六倍'; break;
    default: break;
  }
  return `抽到${color}概率${r}`;
}

export default function Statistics() {

  const [times, setTimes] = useState(null);

  const [achievement, setAchievement] = useState(null);

  const [talentRate, setTalentRate] = useState(null);

  const [eventRate, setEventRate] = useState(null);

  const theme = useTheme();

  useEffect(() => {
    const { times, achievement, talentRate, eventRate } = life.getTotal();
    setTimes(times);
    setAchievement(achievement);
    setTalentRate(talentRate);
    setEventRate(eventRate);
  }, [])

  return (
    <View>
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          <Box title={`已重开${times}次`} description={formatRate('times', times)} grade={getGrade('times', times)} />
          <Box title={`成就达成${achievement}个`} description={formatRate('achievement', achievement)} grade={getGrade('achievement', achievement)} />
          <Box title="事件收集率" description={`${Math.floor(eventRate * 100)}%`} grade={getGrade('eventRate', eventRate)} />
          <Box title="天赋收集率" description={`${Math.floor(talentRate * 100)}%`} grade={getGrade('talentRate', talentRate)} />
        </View>
      </View>
    </View>
  )
}

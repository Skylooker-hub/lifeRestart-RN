import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Box from './Components/Box';
import life from '../../lifeInitial';

export default function Achievement() {

  const [achievementsData, setAchievementData] = useState([]);

  useEffect(() => {
    setAchievementData(life.getAchievements());
  }, [])

  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {
          achievementsData.map(({
            id, name, description, hide,
            grade, isAchieved
          }) => {
            if (hide && !isAchieved) name = description = '???';
            return (
              <Box key={id} title={name} description={description} grade={grade} isMask={!isAchieved} />
            )
          })
        }
      </View>
    </ScrollView>
  )
}
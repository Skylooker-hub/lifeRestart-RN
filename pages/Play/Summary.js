import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import life from '../../lifeInitial';
import { summary } from '../../liferestart/functions/summary';
import { useTheme } from '@react-navigation/native';

export default function Summary({ route, navigation }) {

  const theme = useTheme();

  const [talents, setTalents] = useState([]);

  const [selectedTalent, setSelectedTalent] = useState(null);

  useEffect(() => {
    setTalents(JSON.parse(route.params.talents));
  }, [])

  const summaryValue = useCallback((type) => {
    const summaryData = life.getSummary();
    const value = summaryData[type];
    const { judge, grade } = summary(type, value);
    return { grade, value: `${value} ${judge}` };
  }, [])

  const getTalentBoxColor = useCallback((grade) => {
    grade = Number(grade);
    const colors = {
      0: theme.colors.card,
      1: '#6495ed',
      2: '#b362e7',
      3: '#ff7f4d',
    };
    return colors[grade];
  }, []);

  const style = StyleSheet.create({
    box: {
      alignItems: "center",
      margin: 20,
      borderColor: theme.colors.border,
      borderWidth: 2,
      // borderRadius: 10,
      backgroundColor: theme.colors.card,
    },
    text: {
      color: theme.colors.text,
      paddingVertical: 10,
      fontSize: 18,
    },
    summaryBox: {
      borderColor: theme.colors.border,
      width: '100%',
      borderBottomWidth: 2,
      alignItems: "center",
    },
    head: {
      alignItems: "center",
      marginBottom: 20
    },
    button: {
      borderWidth: 1,
      alignItems: 'center',
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    buttonText: {
      color: theme.colors.text,
      fontSize: 24,
    },
    talentBox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 36,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
      borderWidth: 2,
      marginVertical: 10,
      marginHorizontal: 10,
    },
    talentText: {
      fontSize: 16,
      color: theme.colors.text
    }
  })

  return (
    <ScrollView>
      <View style={style.box}>
        <View style={
          [
            style.summaryBox,
            {
              backgroundColor: getTalentBoxColor(summaryValue('CHR').grade)
            }
          ]
        }>
          <Text
            style={
              [
                style.text,
                {
                  color: summaryValue('CHR').grade > 0 ? "#fff" : theme.colors.text,
                }
              ]
            }
          >颜值：{summaryValue('CHR').value}</Text>
        </View>
        <View style={
          [
            style.summaryBox,
            {
              backgroundColor: getTalentBoxColor(summaryValue('INT').grade)
            }
          ]
        }>
          <Text
            style={
              [
                style.text,
                {
                  color: summaryValue('INT').grade > 0 ? "#fff" : theme.colors.text,
                }
              ]
            }
          >智力：{summaryValue('INT').value}</Text>
        </View>
        <View style={
          [
            style.summaryBox,
            {
              backgroundColor: getTalentBoxColor(summaryValue('STR').grade)
            }
          ]
        }>
          <Text
            style={
              [
                style.text,
                {
                  color: summaryValue('STR').grade > 0 ? "#fff" : theme.colors.text,
                }
              ]
            }
          >体质：{summaryValue('STR').value}</Text>
        </View>
        <View style={
          [
            style.summaryBox,
            {
              backgroundColor: getTalentBoxColor(summaryValue('MNY').grade)
            }
          ]
        }>
          <Text
            style={
              [
                style.text,
                {
                  color: summaryValue('MNY').grade > 0 ? "#fff" : theme.colors.text,
                }
              ]
            }
          >家境：{summaryValue('MNY').value}</Text>
        </View>
        <View style={
          [
            style.summaryBox,
            {
              backgroundColor: getTalentBoxColor(summaryValue('SPR').grade)
            }
          ]
        }>
          <Text
            style={
              [
                style.text,
                {
                  color: summaryValue('SPR').grade > 0 ? "#fff" : theme.colors.text,
                }
              ]
            }
          >快乐：{summaryValue('SPR').value}</Text>
        </View>
        <View style={
          [
            style.summaryBox,
            {
              backgroundColor: getTalentBoxColor(summaryValue('AGE').grade)
            }
          ]
        }>
          <Text
            style={
              [
                style.text,
                {
                  color: summaryValue('AGE').grade > 0 ? "#fff" : theme.colors.text,
                }
              ]
            }
          >享年：{summaryValue('AGE').value}</Text>
        </View>
        <View style={
          [
            style.summaryBox,
            {
              backgroundColor: getTalentBoxColor(summaryValue('SUM').grade),
              borderBottomWidth: 0,
            }
          ]
        }>
          <Text
            style={
              [
                style.text,
                {
                  color: summaryValue('SUM').grade > 0 ? "#fff" : theme.colors.text,
                }
              ]
            }
          >总评：{summaryValue('SUM').value}</Text>
        </View>
      </View>

      <View style={style.head}>
        <Text style={[style.text, { fontSize: 20 }]}>天赋，你可以选一个，下辈子还能抽到</Text>
      </View>

      {
        talents.map((item) => (
          <TouchableWithoutFeedback
            key={item.id}
            onPress={() => {
              if (selectedTalent === item.id) {
                setSelectedTalent(null);
                return;
              }
              setSelectedTalent(item.id);
            }}
          >
            <View style={[style.talentBox, { backgroundColor: getTalentBoxColor(item.grade), borderColor: selectedTalent === item.id ? '#0e0' : theme.colors.border }]}>
              <Text style={style.talentText}>
                {item.name}
                （
                {item.description}
                ）
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))
      }

      <TouchableHighlight
        style={{ marginTop: 10, marginHorizontal: 10 }}
        activeOpacity={0.6}
        underlayColor="#ff7878"
        onPress={() => {
          life.talentExtend(selectedTalent);
          navigation.navigate('Home', { screen: 'PlayIndexScreen' });
        }}
      >
        <View style={style.button}>
          <Text style={style.buttonText}> 再次重开 </Text>
        </View>
      </TouchableHighlight>

    </ScrollView>
  )
}

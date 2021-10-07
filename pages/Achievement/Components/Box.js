import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Box({ title, description, grade = 0, isMask = false }) {

  const theme = useTheme();

  const getBoxColor = (grade) => {
    grade = Number(grade);
    const colors = {
      0: theme.colors.card,
      1: '#6495ed',
      2: '#b362e7',
      3: '#ff7f4d',
    };
    return colors[grade];
  };

  const style = StyleSheet.create({
    box: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      width: 180,
      height: 100,
      marginVertical: 5,
      backgroundColor: getBoxColor(grade),
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    text: {
      color: grade === 0 ? theme.colors.text : "#fff",
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
    },
    mask: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 180,
      height: 100,
      backgroundColor: "#000",
      opacity: isMask ? 0.5 : 0,
    }
  })

  return (
    <View style={style.box}>
      <Text style={[style.title, style.text]}>{title}</Text>
      <Text style={[style.text]}>{description}</Text>
      <View style={style.mask}></View>
    </View>
  )
}

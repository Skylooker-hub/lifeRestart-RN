import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function PropertyBox({ name, value }) {

  const theme = useTheme();

  const style = StyleSheet.create({
    box: {
      borderColor: theme.colors.border,
      borderWidth: 1,
      alignItems: 'center',
      borderRadius: 3
    },
    name: {
      backgroundColor: theme.colors.card,
      padding: 5,
      paddingHorizontal: 10,
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
    textColor: {
      color: theme.colors.text
    }
  });

  return (
    <View style={style.box}>
      <View style={style.name}>
        <Text style={style.textColor}>{name}</Text>
      </View>
      <Text style={style.textColor}>
        {value}
      </Text>
    </View>
  );
}

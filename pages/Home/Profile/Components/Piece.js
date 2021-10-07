import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Piece({ title, children, noBottomBorder, onPress, pressDisabled }) {

  const theme = useTheme();

  const style = StyleSheet.create({
    box: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      justifyContent: 'space-between',
      borderColor: theme.colors.border,
      borderTopWidth: 1,
      borderBottomWidth: noBottomBorder ? 0 : 1,
      backgroundColor: theme.colors.card
    }
  })

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#ff7878"
      disabled={pressDisabled}
      onPress={onPress}
    >
      <View style={style.box}>
        <Text style={{ color: theme.colors.text, fontSize: 18 }}>{title}</Text>
        <View>
          {children}
        </View>
      </View>
    </TouchableHighlight>
  )
}

Piece.defaultProps = {
  noBottomBorder: false,
  onPress: () => { },
  pressDisabled: true,
}

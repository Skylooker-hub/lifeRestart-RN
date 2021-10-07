import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
  View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, TextInput, Image
} from 'react-native';
import { useSelector } from 'react-redux';
import addDark from '../../../resource/images/add_dark.png';
import addDefault from '../../../resource/images/add_default.png';
import reduceDark from '../../../resource/images/reduce_dark.png';
import reduceDefault from '../../../resource/images/reduce_default.png';

export default function PointCounter({
  name, value, maxValue, minValue, onChange, restPoint
}) {

  const theme = useTheme();

  const isDark = useSelector((state) => state.config.isDark);

  const style = StyleSheet.create({
    mainbox: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    textColor: {
      color: theme.colors.text
    },
    textSize: {
      fontSize: 28
    },
    textInput: { marginHorizontal: 10, width: 30, textAlign: 'center' }
  });

  return (
    <View style={style.mainbox}>
      <Text style={[style.textColor, style.textSize, { marginRight: 100 }]}>{name}</Text>
      <View>
        <TouchableWithoutFeedback
          onPress={
            () => {
              if (value > minValue) {
                onChange(value - 1);
              }
            }
          }
        >
          <View>
            <Image source={isDark ? reduceDark : reduceDefault} resizeMode="contain" style={{ height: 36, width: 36 }} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <TextInput
        keyboardType="number-pad"
        style={[style.textColor, style.textSize, style.textInput]}
        value={String(value)}
        onChangeText={(text) => {
          const newValue = parseInt(text);
          if (Number.isNaN(newValue)) {
            onChange(0);
            return;
          }
          if (newValue < minValue) {
            onChange(0);
            return;
          }
          if (newValue > maxValue && (restPoint > maxValue || restPoint === maxValue)) {
            onChange(maxValue);
            return;
          }
          if (newValue < value) {
            onChange(newValue);
            return;
          }
          if (restPoint < newValue) {
            onChange(value + restPoint);
            return;
          }
          onChange(newValue);
        }}
      />
      <View>
        <TouchableWithoutFeedback
          onPress={
            () => {
              if (restPoint === 0) { return; }
              if (value < maxValue) {
                onChange(value + 1);
              }
            }
          }
        >
          <View>
            <Image source={isDark ? addDark : addDefault} resizeMode="contain" style={{ height: 36, width: 36 }} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Linking from 'expo-linking';

export default function About() {

  const theme = useTheme();

  const style = StyleSheet.create({
    text: {
      color: theme.colors.text,
      fontSize: 20,
      marginBottom: 10,
    },
    link: {
      color: "#4630eb"
    }
  })

  return (
    <ScrollView style={{ paddingTop: 20, paddingHorizontal: 10 }}>
      <Text style={style.text}>
        App 内游戏逻辑取自 开源项目
        <TouchableWithoutFeedback
          onPress={
            () => {
              Linking.openURL("https://github.com/VickScarlet/lifeRestart");
            }
          }
        >
          <Text style={[style.text, style.link]}>VickScarlet/lifeRestart</Text>
        </TouchableWithoutFeedback>
      </Text>
      <Text style={style.text}>
        <TouchableWithoutFeedback
          onPress={
            () => {
              Linking.openURL("https://liferestart.syaro.io/view/");
            }
          }
        >
          <Text style={[style.text, style.link]}>网页游戏地址</Text>
        </TouchableWithoutFeedback>
      </Text>
      <Text style={style.text}>
        <TouchableWithoutFeedback
          onPress={
            () => {
              Linking.openURL("https://github.com/HuangChenglee/lifeRestart-RN");
            }
          }
        >
          <Text style={[style.text, style.link]}>App源码开源地址</Text>
        </TouchableWithoutFeedback>
      </Text>
      <Text style={style.text}>
        感谢游玩！
      </Text>
    </ScrollView>
  )
}

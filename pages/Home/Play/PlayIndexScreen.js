import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import {
  Text, StyleSheet, View, TouchableHighlight
} from 'react-native';
import life from '../../../lifeInitial';

export default function PlayIndexScreen({ navigation }) {

  const theme = useTheme();

  const style = StyleSheet.create({
    textColor: {
      color: theme.colors.text
    },
    view: {
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainView: {
      alignItems: 'center',
    },
    title: {
      fontSize: 46,
      fontWeight: 'bold',
    },
    button: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    buttonText: {
      color: theme.colors.text,
      fontSize: 24,
    }
  });

  return (
    <SafeAreaView>
      <View style={style.view}>
        <View style={style.mainView}>
          <Text style={[style.textColor, style.title]}> 人生重开模拟器 </Text>
        </View>
        <View>
          <Text style={style.textColor}> 这垃圾人生一秒也不想呆了 </Text>
        </View>
        <TouchableHighlight
          style={{ marginTop: 50 }}
          activeOpacity={0.6}
          underlayColor="#ff7878"
          onPress={() => {
            life.times ++;
					  navigation.navigate('Play', { screen: 'ChooseTalent' });
          }}
        >
          <View style={style.button}>
            <Text style={style.buttonText}> 立即重开 </Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

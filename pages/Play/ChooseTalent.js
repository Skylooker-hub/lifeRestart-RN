import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, TouchableHighlight, View, Text, ScrollView, TouchableWithoutFeedback
} from 'react-native';
import { useSelector } from 'react-redux';
import { Toast } from 'react-native-ui-lib';
import life from '../../lifeInitial';

export default function ChooseTalent({ navigation }) {

  const theme = useTheme();

  const isDark = useSelector((state) => state.config.isDark);

  const [toastMessage, setToastMessage] = useState('');

  const [isToastShow, setIsToastShow] = useState(false);

  const [isListShow, setIsListShow] = useState(false);

  const [talentList, setTalentList] = useState([]);

  const [selectedList, setSelectedList] = useState([]);

  const dismissToast = () => {
    setIsToastShow(false);
  };

  const talentRandom = () => {
    setTalentList(life.talentRandom());
  };

  const getTalentBoxColor = (grade) => {
    grade = Number(grade);
    const colors = {
      0: theme.colors.card,
      1: '#6495ed',
      2: '#b362e7',
      3: '#ff7f4d',
    };
    return colors[grade];
  };

  const isSelected = (id) => selectedList.includes(id);

  const style = StyleSheet.create({
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
  });

  return (
    <>
      <Toast
        visible={isToastShow}
        position="top"
        backgroundColor={theme.colors.info}
        message={toastMessage}
        onDismiss={dismissToast}
        autoDismiss={3000}
        showDismiss
        showLoader
      />
      {
        isListShow
          ? (
            <ScrollView
              style={{ minHeight: '100%' }}
            >
              {
                talentList.map((item) => (
                  <TouchableWithoutFeedback
                    key={item.id}
                    onPress={() => {
                      const newSelectedList = [...selectedList];
                      if (isSelected(item.id)) {
                        const index = newSelectedList.indexOf(item.id);
                        newSelectedList.splice(index, 1);
                        setSelectedList(newSelectedList);
                        return;
                      }
                      if (selectedList.length === 3) {
                        setIsToastShow(true);
                        setToastMessage('只能选3个天赋！');
                        return;
                      }
                      if (life.exclusive(selectedList, item.id) !== null) {
                        setIsToastShow(true);
                        setToastMessage(`与已选择的天赋【${item.name}】冲突`);
                        return;
                      }
                      newSelectedList.push(item.id);
                      setSelectedList(newSelectedList);
                    }}
                  >
                    <View style={[style.talentBox, { backgroundColor: getTalentBoxColor(item.grade), borderColor: isSelected(item.id) ? '#0e0' : theme.colors.border }]}>
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
                style={{ marginTop: 50, marginHorizontal: 10 }}
                activeOpacity={0.6}
                underlayColor="#ff7878"
                onPress={() => {
                  if (selectedList.length < 3) {
                    setIsToastShow(true);
                    setToastMessage('请选择3个天赋！');
                    return;
                  }
                  const list = talentList.filter((item) => {
                    return selectedList.includes(item.id);
                  });
                  const point = life.getTalentAllocationAddition(selectedList) + 20;
                  navigation.replace('ChooseProperty', { talents: JSON.stringify(list), point });
                }}
              >
                <View style={style.button}>
                  <Text style={style.buttonText}> 开始新人生 </Text>
                </View>
              </TouchableHighlight>
            </ScrollView>
          )
          : (
            <View style={{ minHeight: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#ff7878"
                style={{ justifyContent: 'center' }}
                onPress={() => {
                  setIsListShow(true);
                  talentRandom();
                }}
              >
                <View style={style.button}>
                  <Text style={style.buttonText}> 十连抽！ </Text>
                </View>
              </TouchableHighlight>
            </View>
          )
      }
    </>
  );
}

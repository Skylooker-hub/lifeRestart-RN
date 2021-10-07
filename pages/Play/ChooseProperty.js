import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  View, Text, ScrollView, StyleSheet, TouchableWithoutFeedback, TextInput, TouchableHighlight
} from 'react-native';
import { Toast } from 'react-native-ui-lib';
import PointCounter from './Components/PointCounter';
import life from '../../lifeInitial';

export default function ChooseProperty({ route, navigation }) {

  const [talents, setTalents] = useState([]);

  const [point, setPoint] = useState(20);

  const [toastMessage, setToastMessage] = useState('');

  const [isToastShow, setIsToastShow] = useState(false);

  const [CHR, setCHR] = useState(0); // 颜值

  const [INT, setINT] = useState(0); // 智力 intelligence INT

  const [STR, setSTR] = useState(0); // 体质 strength STR

  const [MNY, setMNY] = useState(0); // 家境 money MNY

  const theme = useTheme();

  useEffect(() => {
    setTalents(JSON.parse(route.params.talents));
    setPoint(route.params.point);
  }, [route]);

  const dismissToast = () => {
    setIsToastShow(false);
  };

  const style = StyleSheet.create({
    textColor: {
      color: theme.colors.text
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
  });

  const pointSum = () => {
    return CHR + INT + STR + MNY;
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

  const randomPoint = () => {
    let t = point;
    const arr = [10, 10, 10, 10];
    while (t > 0) {
      const sub = Math.round(Math.random() * (Math.min(t, 10) - 1)) + 1;
      while (true) {
        const select = Math.floor(Math.random() * 4) % 4;
        if (arr[select] - sub < 0) continue;
        arr[select] -= sub;
        t -= sub;
        break;
      }
    }
    setCHR(10 - arr[0]);
    setINT(10 - arr[1]);
    setSTR(10 - arr[2]);
    setMNY(10 - arr[3]);
  };

  return (
    <ScrollView>
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
      <Text style={[style.textColor, { fontSize: 20, textAlign: 'center', marginBottom: 50 }]}>
        可用属性点：
        {point - pointSum()}
      </Text>
      <PointCounter name="颜值" value={CHR} maxValue={10} minValue={0} restPoint={point - pointSum()} onChange={(value) => setCHR(value)} />
      <PointCounter name="智力" value={INT} maxValue={10} minValue={0} restPoint={point - pointSum()} onChange={(value) => setINT(value)} />
      <PointCounter name="体质" value={STR} maxValue={10} minValue={0} restPoint={point - pointSum()} onChange={(value) => setSTR(value)} />
      <PointCounter name="家境" value={MNY} maxValue={10} minValue={0} restPoint={point - pointSum()} onChange={(value) => setMNY(value)} />

      <Text style={[style.textColor, { fontSize: 30, textAlign: 'center', marginVertical: 30 }]}>
        已选天赋
      </Text>
      {
        talents.map((item) => (
          <View key={item.id} style={[style.talentBox, { backgroundColor: getTalentBoxColor(item.grade) }]}>
            <Text style={style.talentText}>
              {item.name}
              （
              {item.description}
              ）
            </Text>
          </View>
        ))
      }

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#ff7878"
          style={{ justifyContent: 'center', marginHorizontal: 10 }}
          onPress={() => {
            randomPoint();
          }}
        >
          <View style={style.button}>
            <Text style={style.buttonText}> 随机分配 </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#ff7878"
          style={{ justifyContent: 'center', marginHorizontal: 10 }}
          onPress={() => {
            if ((point - pointSum()) > 0) {
              setToastMessage(`你还有${point - pointSum()}属性点没有分配完！`);
              setIsToastShow(true);
              return;
            }
            if ((point - pointSum()) !== 0) {
              setToastMessage('属性点应为0！');
              setIsToastShow(true);
              return;
            }
            const contents = life.restart({
              CHR,
              INT,
              STR,
              MNY,
              SPR: 5,
              TLT: talents.map(({ id }) => id),
            });
            navigation.replace('Trajectory', { contents: JSON.stringify(contents), talents: JSON.stringify(talents) });
          }}
        >
          <View style={style.button}>
            <Text style={style.buttonText}> 开启新人生 </Text>
          </View>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

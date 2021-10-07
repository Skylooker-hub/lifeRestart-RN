import React, {
  useEffect, useState, useCallback, useRef, useReducer
} from 'react';
import {
  View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, FlatList
} from 'react-native';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import { Toast } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import life from '../../lifeInitial';
import { $$off, $$on } from '../../liferestart/index';
import PropertyBox from './Components/PropertyBox';

const go = () => {
  const trajectory = life.next();
  const { age, content, isEnd } = trajectory;
  const detail = `${age}岁：${content.map(
    ({
      type, description, grade, name, postEvent
    }) => {
      switch (type) {
        case 'TLT':
          return `天赋【${name}】发动：${description}`;
        case 'EVT':
          return description + (postEvent ? `\n${postEvent}` : '');
      }
    }
  )}`
  return { detail, isEnd };
}

const getProperty = () => {
  const { CHR, INT, STR, MNY, SPR } = life.getLastRecord();
  return { CHR, INT, STR, MNY, SPR };
}

const initialState = { lifeList: [], isEnd: false };

const reducer = (state, action) => {
  switch (action.type) {
    case 'end':
      return { ...state, isEnd: true };
    case 'update':
      const newList = [...state.lifeList];
      newList.push(action.payload);
      return { ...state, lifeList: newList };
    case 'reset':
      return { ...initialState };
    default:
      throw new Error();
  }
}

export default function Trajectory({ route, navigation }) {

  // const [lifeList, setLifeList] = useState([]);
  // const [isEnd, setIsEnd] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [CHR, setCHR] = useState(null); // 颜值

  const [INT, setINT] = useState(null); // 智力 intelligence INT

  const [STR, setSTR] = useState(null); // 体质 strength STR

  const [MNY, setMNY] = useState(null); // 家境 money MNY

  const [SPR, setSPR] = useState(null); // 快乐

  const [achievement, setAchievement] = useState('');

  const [isToastShow, setIsToastShow] = useState(false);

  const [isAuto, setIsAuto] = useState(false);

  const theme = useTheme();

  const listRef = useRef();

  const timer = useRef(null);

  useEffect(() => {
    const contents = JSON.parse(route.params.contents);
    if (contents.length > 0) {
      contents.forEach(({ source, target }) => {
        dispatch({ type: 'update', payload: `天赋【${source.name}】发动：替换为天赋【${target.name}】` })
      });
      goLife();
    }
  }, [goLife, route]);

  const onAchievement = useCallback(({ name }) => {
    setAchievement(`解锁成就【${name}】`);
    setIsToastShow(true);
  }, []);

  useEffect(() => {
    $$on('achievement', onAchievement);
    return () => {
      $$off('achievement', onAchievement);
    };
  }, [onAchievement]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (timer.current) {
          clearInterval(timer.current);
          timer.current = null;
        }
      }
    }, [])
  )

  useEffect(() => {
    if (state.isEnd) {
      clearInterval(timer.current);
      timer.current = null;
      setIsAuto(false);
    }
  }, [state])

  const dismissToast = () => {
    setIsToastShow(false);
  };

  const goLife = useCallback(() => {
    const { detail, isEnd } = go();
    dispatch({ type: 'update', payload: detail });
    if (isEnd) {
      dispatch({ type: 'end' });
    }
    const { CHR, INT, STR, MNY, SPR } = getProperty();
    setCHR(CHR);
    setINT(INT);
    setSTR(STR);
    setMNY(MNY);
    setSPR(SPR);
  }, []);

  const autoPlay = useCallback(() => {
    if (isAuto) {
      setIsAuto(false);
      clearInterval(timer.current);
      timer.current = null;
      return;
    }
    setIsAuto(true);
    timer.current = setInterval(() => {
      goLife();
    }, 500);
  }, [goLife, isAuto])

  const style = StyleSheet.create({
    listBox: {
      height: 500, borderColor: theme.colors.border, borderWidth: 2, margin: 10
    },
    recordBox: {
      justifyContent: 'center',
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
      borderWidth: 2,
      marginVertical: 10,
      marginHorizontal: 10,
    },
    recordText: {
      fontSize: 16,
      color: theme.colors.text
    },
    button: {
      borderWidth: 1,
      alignItems: 'center',
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
      paddingVertical: 10,
    },
    buttonText: {
      color: theme.colors.text,
      fontSize: 24,
    },
  });

  const renderItem = ({ item }) => (
    <View style={style.recordBox}>
      <Text style={style.recordText}>
        {item}
      </Text>
    </View>
  );

  return (
    <>
      <SafeAreaView>
        <View>
          <Toast
            visible={isToastShow}
            position="top"
            backgroundColor={theme.colors.success}
            message={achievement}
            onDismiss={dismissToast}
            autoDismiss={3000}
            showDismiss
            showLoader
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <PropertyBox name="颜值" value={CHR} />
          <PropertyBox name="智力" value={INT} />
          <PropertyBox name="体质" value={STR} />
          <PropertyBox name="家境" value={MNY} />
          <PropertyBox name="快乐" value={SPR} />
        </View>

        <FlatList
          style={style.listBox}
          ref={listRef}
          onContentSizeChange={() => listRef.current.scrollToEnd()}
          data={state.lifeList}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />

        {
          state.isEnd ?
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#ff7878"
              style={{ margin: 10 }}
              onPress={() => {
                navigation.navigate('Summary', { talents: route.params.talents })
              }}
            >
              <View style={style.button}>
                <Text style={style.buttonText}> 人生总结 </Text>
              </View>
            </TouchableHighlight> :
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#ff7878"
                style={{ flex: 1, margin: 10 }}
                onPress={() => {
                  if (isAuto) {
                    setIsAuto(false);
                    clearInterval(timer.current);
                    timer.current = null;
                  }
                  if (!state.isEnd) {
                    goLife();
                  }
                }}
              >
                <View style={style.button}>
                  <Text style={style.buttonText}> 手动点击 </Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#ff7878"
                style={{ flex: 1, margin: 10 }}
                onPress={autoPlay}
              >
                <View style={[style.button, { backgroundColor: isAuto ? "#ff7878" : theme.colors.card }]}>
                  <Text style={style.buttonText}> 自动播放 </Text>
                </View>
              </TouchableHighlight>
            </View>
        }

      </SafeAreaView>
    </>
  );
}

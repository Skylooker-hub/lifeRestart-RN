import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { Switch, Colors, Toast } from 'react-native-ui-lib';
import { useTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDark } from '../../../reducers/config/configSlice';
import localStorage from '../../../SyncStorage';
import * as FileSystem from 'expo-file-system';
import { getDocumentAsync } from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import ar_default from '../../../resource/images/arrow-right_default.png';
import ar_dark from '../../../resource/images/arrow-right_dark.png';
import Piece from './Components/Piece';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reloadAsync } from 'expo-updates';

const { StorageAccessFramework } = FileSystem

export default function ProfileScreen({ navigation }) {

  const isDark = useSelector((state) => state.config.isDark);


  const [isToastShow, setIsToastShow] = useState(false);

  const [toastMessage, setToastMessage] = useState('');

  const [fileName, setFileName] = useState('lr_save_data');

  const theme = useTheme();

  const dispatch = useDispatch();

  const toggleSwitch = () => {
    localStorage.setItem('theme', isDark ? "light" : "dark");
    dispatch(toggleDark(!isDark));
  }

  const dismissToast = () => {
    setIsToastShow(false);
  }

  const style = StyleSheet.create({
    text: {
      color: theme.colors.text,
      marginBottom: 10,
    },
    roundedDialog: {
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      padding: 20
    }
  })

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <SafeAreaView>
        <View>
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
        </View>
        <Piece title="深色模式" noBottomBorder>
          <Switch
            width={60}
            height={26}
            thumbSize={30}
            onColor={Colors.blue40}
            offColor={Colors.grey40}
            value={isDark}
            onValueChange={toggleSwitch}
          />
        </Piece>
        <Piece title="统计" noBottomBorder pressDisabled={false} onPress={() => { navigation.navigate('Statistics') }}>
          <Image source={isDark ? ar_dark : ar_default} style={{ height: 26, width: 26 }} />
        </Piece>
        <Piece title="成就" noBottomBorder pressDisabled={false} onPress={() => { navigation.navigate('Achievement') }}>
          <Image source={isDark ? ar_dark : ar_default} style={{ height: 26, width: 26 }} />
        </Piece>
        <Piece
          title="导入数据"
          noBottomBorder
          pressDisabled={false}
          onPress={
            async () => {
              const res = await getDocumentAsync({ type: 'application/json', copyToCacheDirectory: false });
              if (res.type === 'cancel') {
                return;
              }
              const json = await FileSystem.readAsStringAsync(res.uri);
              const data = JSON.parse(json);
              await AsyncStorage.clear();
              for (const key in data) {
                await AsyncStorage.setItem(key, data[key]);
              }
              await reloadAsync();
            }
          }
        >
          <Image source={isDark ? ar_dark : ar_default} style={{ height: 26, width: 26 }} />
        </Piece>
        <Piece
          title="分享数据"
          noBottomBorder
          pressDisabled={false}
          onPress={
            async () => {
              const data = {};
              Object
                .keys(localStorage.cache)
                .filter(v => v.substr(0, 4) != 'goog')
                .forEach(key => data[key] = localStorage.getItem(key));
              const uri = FileSystem.cacheDirectory + '/' + fileName + '.json';
              await FileSystem.writeAsStringAsync(uri, JSON.stringify(data));
              Sharing.shareAsync(uri);
            }
          }
        >
          <Image source={isDark ? ar_dark : ar_default} style={{ height: 26, width: 26 }} />
        </Piece>
        <Piece
          title="关于"
          pressDisabled={false}
          onPress={
            () => {
              navigation.navigate('About');
            }
          }
        >
          <Image source={isDark ? ar_dark : ar_default} style={{ height: 26, width: 26 }} />
        </Piece>
      </SafeAreaView>
    </>
  );
}

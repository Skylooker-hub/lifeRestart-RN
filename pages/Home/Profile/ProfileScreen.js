import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { Switch, Colors, Dialog, Button, TextField, Toast } from 'react-native-ui-lib';
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

  // const [showDialog, setShowDialog] = useState(false);

  const [isToastShow, setIsToastShow] = useState(false);

  const [toastMessage, setToastMessage] = useState('');

  const [fileName, setFileName] = useState('lr_save_data');

  const theme = useTheme();

  const dispatch = useDispatch();

  const toggleSwitch = () => {
    localStorage.setItem('theme', isDark ? "light" : "dark");
    dispatch(toggleDark(!isDark));
  }

  // const hideDialog = () => {
  //   setShowDialog(false);
  // }

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
        {/* <Dialog
          useSafeArea
          containerStyle={style.roundedDialog}
          visible={showDialog}
          onDismiss={hideDialog}
          ignoreBackgroundPress={false}
        >
          <View>
            <View style={{ alignItems: 'flex-end' }}>
              <Button text60 label="X" link onPress={hideDialog} />
            </View>
            <Text style={style.text}>① 确定导出文件名</Text>
            <TextField
              placeholder='文件名'
              style={style.text}
              hideUnderline={false}
              value={fileName}
              onChangeText={(text) => {
                setFileName(text);
              }}
            />
            <Text style={style.text}>② 选择文件夹并授权</Text>
            <Button
              backgroundColor={Colors.blue20}
              label="选择文件夹"
              borderRadius={7}
              style={{ height: 45 }}
              onPress={async () => {
                const data = {};
                Object
                  .keys(localStorage.cache)
                  .filter(v => v.substr(0, 4) != 'goog')
                  .forEach(key => data[key] = localStorage[key]);

                const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
                if (permissions.granted) {
                  const uri = permissions.directoryUri;
                  let fileArr = [];
                  let fileUri = '';
                  try {
                    fileArr = await StorageAccessFramework.readDirectoryAsync(uri);
                  } catch (error) {
                    fileArr = await FileSystem.readDirectoryAsync(uri);
                  } finally {
                    fileUri = uri + '/' + fileName + '.json';
                    try {
                      if (!fileArr.includes(fileName)) {
                        fileUri = await StorageAccessFramework.createFileAsync(uri, fileName, 'application/json');
                      }
                      console.log(fileUri)
                      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
                      setToastMessage("数据导出成功！");
                      setIsToastShow(true);
                    } catch (error) {
                      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
                      setToastMessage("数据导出成功！");
                      setIsToastShow(true);
                    }
                  }
                }
              }}
            />
          </View>
        </Dialog> */}
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
        <Piece title="关于" pressDisabled={false}>
          <Image source={isDark ? ar_dark : ar_default} style={{ height: 26, width: 26 }} />
        </Piece>
      </SafeAreaView>
    </>
  );
}

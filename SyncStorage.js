import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SyncStorage {

  static cache = {}

  // 初始化需要在App启动时执行
  static async init() {
    let keys = await AsyncStorage.getAllKeys()
    let items = await AsyncStorage.multiGet(keys).then()
    items.map(([key, value]) => {
      this.cache[key] = value
    })
  }

  static getItem(key) {
    return this.cache[key]
  }

  static setItem(key, value) {
    if (this.cache[key] === value) return
    this.cache[key] = value
    AsyncStorage.setItem(key, value)
  }

  static removeItem(key) {
    delete this.cache[key]
    AsyncStorage.removeItem(key)
  }
}

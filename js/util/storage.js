import AsyncStorage from '@react-native-community/async-storage';

export default {
  async setItem (key ,value, callBack = function () {}) {
    try {
      await AsyncStorage.setItem(key, value)
      callBack()
    } catch (err) {
      console.log(err)
    }
  },
  async getItem (key) {
    try {
      const value = await AsyncStorage.getItem(key)
      return value
    } catch (err) {
      console.log(err)
    }
  }
}

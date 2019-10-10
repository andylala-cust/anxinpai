import React,{Component} from 'react';
import {ActivityIndicator,View,Text,StyleSheet} from 'react-native'

class LoadMore extends Component {
  render () {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator
          size={'large'}
        />
        <Text style={styles.text}>努力加载中...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  text: {
    marginTop: 10
  }
})

export default LoadMore;

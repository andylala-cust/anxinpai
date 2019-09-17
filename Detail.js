import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native'

class Detail extends Component {
  static navigationOptions = {
    title: '详情',
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center'
    },
    // 解决左边有按钮，右边无按钮标题不居中
    headerRight: <View />
  }
  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Detail Page</Text>
      </View>
    )
  }
}

export default Detail;

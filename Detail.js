import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native'

class Detail extends Component {
  static navigationOptions = {
    title: '详情'
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

import React,{Component} from 'react';
import {View,Text} from 'react-native';

class EmptyContent extends Component {
  render () {
    return (
      <View style={{padding: 20,justifyContent: 'center',alignItems: 'center'}}>
        <Text>列表空空如也>_&lt;</Text>
      </View>
    )
  }
}

export default EmptyContent;

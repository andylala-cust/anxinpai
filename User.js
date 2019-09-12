import React, { Component } from 'react'
import {
  Text,
  View,
  Button
} from 'react-native';

class User extends Component {
  static navigationOptions = {
    header: null
  }
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>User Page</Text>
      </View>
    )
  }
}

export default User;

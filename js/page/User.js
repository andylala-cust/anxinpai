import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

class User extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.init = this.init.bind(this)
  }
  init () {
    // alert(1)
  }
  // bottomTabNavigation每次进入时都执行某个函数
  componentDidMount () {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      this.init()
    })
  }
  componentWillUnmount() {
    this.navListener.remove()
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

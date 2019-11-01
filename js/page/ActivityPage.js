import React,{Component} from 'react';
import {View,Text} from 'react-native';
import SplashScreen from "react-native-splash-screen";

class ActivityPage extends Component {
  componentDidMount () {
    SplashScreen.hide()
    this.timer = setTimeout(() => {
      this.props.navigation.navigate('Main')
    }, 3000)
  }
  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
  }
  render () {
    return (
      <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
        <Text>1</Text>
      </View>
    )
  }
}

export default ActivityPage;

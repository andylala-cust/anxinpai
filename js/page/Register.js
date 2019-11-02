import React,{Component} from "react";
import {
  View,
  Text,
  StatusBar
} from 'react-native';

const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';

class Register extends Component {
  static navigationOptions = {
    title: '注册',
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center',
      color: '#5186ec'
    },
    // 解决左边有按钮，右边无按钮标题不居中
    headerRight: <View />,
  }
  componentDidMount () {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle(BARSTYLE)
    })
  }
  componentWillUnmount () {
    this.navListener.remove()
  }
  render () {
    return (
      <View style={{justifyContent: 'center',alignItems: 'center'}}>
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
          // networkActivityIndicatorVisible={true}
        />
        <Text onPress={() => {this.props.navigation.pop(2)}}>1</Text>
      </View>
    )
  }
}

export default Register;

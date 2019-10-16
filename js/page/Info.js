import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, HeaderButton, Item} from 'react-navigation-header-buttons';
import {
  View,
  Text,
  Button,
  StatusBar,
  ScrollView
} from 'react-native';
import {STATUSBAR_HEIGHT} from '../util';

// 让安卓和苹果状态栏同意，安卓default是白色，ios default是黑色
const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
// 获取状态栏高度，只对安卓有效，iphone是20, iphonex是44
const STATUSBAR_STYLE = Platform.OS === 'ios' ? {} : {
  height: 2*STATUSBAR_HEIGHT+15,
  paddingTop: STATUSBAR_HEIGHT
}

const IoniconsHeaderButton = passMeFurther => (
  // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={26} color="#5186ec" />
);

let self;

class Info extends Component {
  static navigationOptions = {
    title: '信息',
    headerBackTitle: null,
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center'
    },
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="back" iconName="md-arrow-back" onPress={() => self.btnPress()} />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="search" iconName="ios-search" onPress={() => alert('search')} />
        <Item title="select" iconName="ios-heart-empty" onPress={() => alert('heart')} />
      </HeaderButtons>
    ),
    // 安卓沉浸式状态栏适配
    headerStyle: STATUSBAR_STYLE
  }
  constructor (props) {
    super(props)
    self = this
  }
  btnPress () {
    this.props.navigation.goBack()
  }
  render () {
    return (
      <View>
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
        />
        <ScrollView>
          <Text>Info Page</Text>
          <Button
            title={'Go To More Page'}
            onPress={() => this.props.navigation.navigate('More')}
          />
          <View style={{height: 1000,backgroundColor: '#f00'}}></View>
        </ScrollView>
      </View>
    )
  }
}

export default Info;

import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderButtons, HeaderButton, Item} from 'react-navigation-header-buttons';
import {
  View,
  Text,
  Button,
  StatusBar,
  Dimensions,
  ScrollView
} from 'react-native';

// 让安卓和苹果状态栏同意，安卓default是白色，ios default是黑色
const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content'
// 获取状态栏高度，只对安卓有效，ios是20, iosx是44
const WINDOW = Dimensions.get('window');
const SCREEN_HEIGHT = WINDOW.height
const IPHONE_X_HEIGHT = 812
const _IPHONE_X_HEIGHT = 896
const IPHONE_STATUSBAR = 20
const IPHONEX_STATUSBAR = 44
const IS_IPHONEX = Platform.OS === 'ios' && (SCREEN_HEIGHT === IPHONE_X_HEIGHT || SCREEN_HEIGHT === _IPHONE_X_HEIGHT)
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONEX ? IPHONEX_STATUSBAR : IPHONE_STATUSBAR) : StatusBar.currentHeight;
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
    console.log(STATUSBAR_HEIGHT)
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

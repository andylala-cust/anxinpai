import React,{Component} from 'react';
import {WebView} from 'react-native-webview';
import {HeaderButton, HeaderButtons, Item} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {STATUSBAR_HEIGHT} from '../util';
import {View} from 'react-native';

// 获取状态栏高度，只对安卓有效，iphone是20, iphonex是44
const STATUSBAR_STYLE = Platform.OS === 'ios' ? {} : {
  height: 2*STATUSBAR_HEIGHT+15,
  paddingTop: STATUSBAR_HEIGHT
}
const IoniconsHeaderButton = passMeFurther => (
  // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={26} color="#000" />
);

let self;

class Court extends Component {
  static navigationOptions = {
    title: '法院公告',
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center'
    },
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="back" iconName="ios-arrow-back" onPress={() => self.btnPress()} />
      </HeaderButtons>
    ),
    // 解决左边有按钮，右边无按钮标题不居中
    headerRight: <View />,
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
      <WebView
        startInLoadingState={true}
        style={{flex: 1}}
        source={{uri: this.props.courtUrl}}
      />
    )
  }
}

const mapStateToProps = state => ({
  courtUrl: state.houseInfo.courtUrl
})

export default connect(mapStateToProps)(Court);

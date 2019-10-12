import React,{Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import {MapView, Marker} from 'react-native-amap3d/lib/js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import {IS_IPHONEX, STATUSBAR_HEIGHT} from '../util';
import _fetch from '../fetch';

const GAODE_KEY = '29de9219429c6425c5cfd872e54e3838';  // 高德地图KEY
const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0;

// 让安卓和苹果状态栏同意，安卓default是白色，ios default是黑色
const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
// 获取状态栏高度，只对安卓有效，iphone是20, iphonex是44
const STATUSBAR_STYLE = Platform.OS === 'ios' ? {} : {
  height: 2*STATUSBAR_HEIGHT+15,
  paddingTop: STATUSBAR_HEIGHT
};

const IoniconsHeaderButton = passMeFurther => (
  // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
  // and it is important to pass those props to `HeaderButton`
  // then you may add some information like icon size or color (if you use icons)
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={26} color="#000" />
);

let self;

class Around extends Component {
  static navigationOptions = {
    title: '周边配套',
    // 解决安卓标题不居中
    headerTitleStyle:{
      flex: 1,
      textAlign:'center'
    },
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="back" iconName="ios-arrow-back" onPress={() => self.btnPress()}/>
      </HeaderButtons>
    ),
    headerRight: null,
    // 安卓沉浸式状态栏适配
    headerStyle: STATUSBAR_STYLE
  }
  constructor (props) {
    super(props)
    self = this
    this.state = {
      latitude : '',
      longitude: '',
      title: '',
      index: 0,
      aroundArr: []
    }
    this.btnPress = this.btnPress.bind(this)
    this.getMarkerData = this.getMarkerData.bind(this)
  }
  btnPress () {
    this.props.navigation.goBack()
  }
  getMarkerData (params) {
    switch (params.index) {
      case 0: {
        _fetch.get(`https://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&location=${params.latitude},${params.longitude}&types=141202&radius=1000&offset=10&page=1&extensions=all`,true)
          .then(data => {
            this.setState({
              aroundArr: data.pois
            })
            console.log(this.state.aroundArr)
          })
      }
      default:
        break
    }
  }
  componentDidMount () {
    this.setState((state, props) => ({
      latitude : this.props.navigation.getParam('latitude'),
      longitude: this.props.navigation.getParam('longitude'),
      title: this.props.navigation.getParam('title'),
      index: this.props.navigation.getParam('index')
    }), () => {
      this.getMarkerData(this.state)
    })
  }
  render () {
    return (
      <View
        style={{flex: 1}}
      >
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
        />
        <MapView
          style={{flex: 1}}
          showsCompass={false} // 是否显示指南针
          showsZoomControls={false} // 是否显示放大缩小按钮
          zoomLevel={14}
          coordinate={{
            latitude: Number(this.state.latitude),
            longitude: Number(this.state.longitude)
          }}
        >
          <Marker
            title={this.state.title}
            coordinate={{
              latitude: Number(this.state.latitude),
              longitude: Number(this.state.longitude)
            }}
          />
        </MapView>
        <View style={styles.footerWrapper}>
          <TouchableOpacity style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Text style={[styles.text,{color: this.state.index === 0 ? '#006aff' : '#333'}]}>学校</Text>
              <Ionicons
                name={'md-school'}
                size={18}
                color={this.state.index === 0 ? '#006aff' : '#333'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Text style={[styles.text,{color: this.state.index === 1 ? '#006aff' : '#333'}]}>交通</Text>
              <Ionicons
                name={'ios-bus'}
                size={18}
                color={this.state.index === 1 ? '#006aff' : '#333'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Text style={[styles.text,{color: this.state.index === 2 ? '#006aff' : '#333'}]}>生活</Text>
              <Feather
                name={'life-buoy'}
                size={18}
                color={this.state.index === 2 ? '#006aff' : '#333'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
              <Text style={[styles.text,{color: this.state.index === 3 ? '#006aff' : '#333'}]}>医疗</Text>
              <MaterialCommunityIcons
                name={'medical-bag'}
                size={18}
                color={this.state.index === 3 ? '#006aff' : '#333'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footerWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: TAB_BAR_HEIGHT+10,
    backgroundColor: 'rgba(255,255,255,.9)'
  },
  text: {
    paddingBottom: 10,
    color: '#333',
    textAlign: 'center'
  }
})

export default Around;
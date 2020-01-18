import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet
} from 'react-native';
import {userTipChange} from '../action/user/actionCreators';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from "react-native-linear-gradient";
import {STATUSBAR_HEIGHT} from '../util';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UserEntry} from  '../components/user';
import {IMG_PLACE_COLOR,DEFAULT_USER_AVATAR} from '../constants';
import {storage} from '../util';

const AVATAR_SIZE = 80;
const PARALLAX_HEADER_HEIGHT = 240;
const STICKY_HEADER_HEIGHT = 70;

class User extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      isLogin: false,
      userId: '',
      userName: '',
      userAvatar: DEFAULT_USER_AVATAR,
      userPhone: ''
    }
    this.init = this.init.bind(this)
    this.goSetting = this.goSetting.bind(this)
  }
  async goSetting () {
    const userId = await storage.getItem('user_id')
    if (userId) {
      this.props.navigation.navigate('Setting')
    } else {
      this.props.navigation.navigate('Login')
    }
  }
  async init () {
    const userId = await storage.getItem('user_id')
    const userPhone = await storage.getItem('user_phone')
    const userAvatar = await storage.getItem('user_avatar')
    const userName = await storage.getItem('user_name')
    if (userId) {
      this.setState({
        isLogin: true,
        userName,
        userAvatar,
        userPhone
      })
    } else {
      this.setState({
        isLogin: false,
        userName: '',
        userAvatar: DEFAULT_USER_AVATAR,
        userPhone: ''
      })
    }
  }
  // bottomTabNavigation每次进入时都执行某个函数
  componentDidMount () {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      this.init()
      StatusBar.setBarStyle('light-content')
    })
  }
  componentWillUnmount() {
    this.navListener.remove()
  }
  render () {
    return (
      <ParallaxScrollView
        showsVerticalScrollIndicator={false}
        backgroundColor="transparent"
        contentBackgroundColor="#fff"
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        backgroundSpeed={10}
        renderStickyHeader={() => (
          <View key="sticky-header">
            <LinearGradient
              colors={['#FC5C7D', '#6A82FB']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                width: '100%',
                height: STICKY_HEADER_HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: STATUSBAR_HEIGHT,
                paddingBottom: 10
              }}
            >
              <View style={{width: '100%',flexDirection: 'row',alignItems: 'center',justifyContent: 'center',position: 'relative'}}>
                <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 16}}>{this.state.userName}</Text>
                <TouchableOpacity
                  style={{position: 'absolute',top: 0,right: 20}}
                  onPress={() => this.goSetting()}
                >
                  <Ionicons
                    name={'md-settings'}
                    size={16}
                    color={'#fff'}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}
        renderBackground={() => (
          <View key="background">
            <LinearGradient
              colors={['#FC5C7D', '#6A82FB']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                width: '100%',
                height: PARALLAX_HEADER_HEIGHT,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            ></LinearGradient>
          </View>
        )}
        renderForeground={() => (
          <View key="parallax-header">
            <View style={{position: 'relative',flexDirection: 'row',alignItems: 'center',justifyContent: 'center',height: PARALLAX_HEADER_HEIGHT,paddingTop: STATUSBAR_HEIGHT,paddingLeft: 20,paddingRight: 20}}>
              <TouchableOpacity
                style={{position: 'absolute',top: STICKY_HEADER_HEIGHT,right: 20}}
                onPress={() => this.goSetting()}
              >
                <Ionicons
                  name={'md-settings'}
                  size={20}
                  color={'#fff'}
                />
              </TouchableOpacity>
              <View style={{overflow: 'hidden',borderRadius: AVATAR_SIZE/2,backgroundColor: IMG_PLACE_COLOR}}>
                <Image
                  style={{width: AVATAR_SIZE,height: AVATAR_SIZE}}
                  source={{uri: this.state.userAvatar}}
                />
              </View>
              <View style={{flex: 1,paddingLeft: 20,justifyContent: 'space-between'}}>
                {
                  !this.state.isLogin ? <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate('Login')}}
                    activeOpacity={1}
                  >
                    <Text style={{lineHeight: 30,color: '#fff',fontWeight: 'bold',fontSize: 16}}>
                      登录/注册
                    </Text>
                  </TouchableOpacity> : <Text style={{lineHeight: 30,color: '#fff',fontWeight: 'bold',fontSize: 16}}>{this.state.userName}</Text>
                }
                {
                  !this.state.isLogin ? <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate('Login')}}
                  >
                    <Text style={{lineHeight: 30,color: '#fff',fontWeight: 'bold',fontSize: 13}}>
                      登录体验更多功能~
                    </Text>
                  </TouchableOpacity> : <TouchableOpacity
                    onPress={() => this.goSetting()}
                  >
                    <Text style={{lineHeight: 30,color: '#fff',fontWeight: 'bold',fontSize: 13}}>查看并编辑个人资料</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </View>
        )}
      >
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={"transparent"}
          translucent={true}
          // networkActivityIndicatorVisible={true}
        />
        <TouchableOpacity
          style={{paddingLeft: 20,paddingRight: 20}}
          onPress={() => {
            storage.getItem('user_id')
              .then(data => {
                if (data) {
                  this.props.navigation.navigate('UserLove', {
                    toggleEdit: false
                  })
                } else {
                  this.props.navigation.navigate('Login')
                }
              })
          }}
        >
          <View
            style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',height: 50,borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#bbb'}}
          >
            <Text>我的收藏</Text>
            <Ionicons
              name={'ios-arrow-forward'}
              size={18}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingLeft: 20,paddingRight: 20}}
          onPress={() => {
            storage.getItem('user_id')
              .then(data => {
                if (data) {
                  this.props.navigation.navigate('UserNotify', {
                    toggleEdit: false
                  })
                } else {
                  this.props.navigation.navigate('Login')
                }
              })
          }}
        >
          <View
            style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',height: 50,borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#bbb'}}
          >
            <Text>我的提醒</Text>
            <Ionicons
              name={'ios-arrow-forward'}
              size={18}
            />
          </View>
        </TouchableOpacity>
        {/*<TouchableOpacity*/}
        {/*  style={{paddingLeft: 20,paddingRight: 20}}*/}
        {/*  onPress={() => {*/}
        {/*    this.props.navigation.navigate('UserGroup')*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <View*/}
        {/*    style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',height: 50,borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#bbb'}}*/}
        {/*  >*/}
        {/*    <Text>法拍房交流群</Text>*/}
        {/*    <Ionicons*/}
        {/*      name={'ios-arrow-forward'}*/}
        {/*      size={18}*/}
        {/*    />*/}
        {/*  </View>*/}
        {/*</TouchableOpacity>*/}
        {/*<TouchableOpacity*/}
        {/*  style={{paddingLeft: 20,paddingRight: 20}}*/}
        {/*  onPress={() => {*/}
        {/*    const item = {*/}
        {/*      kefu_name: null,*/}
        {/*      kefu_phone: null,*/}
        {/*      targetUrl: "http://static.yfbudong.com/banner_xiaoyuanzhuo_detail",*/}
        {/*      title: "发现投资新机会",*/}
        {/*      url: "http://static.yfbudong.com/banner_2.png",*/}
        {/*    }*/}
        {/*    this.props.navigation.navigate('HomeBannerDetail', {*/}
        {/*      item*/}
        {/*    })*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <View*/}
        {/*    style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',height: 50,borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#bbb'}}*/}
        {/*  >*/}
        {/*    <Text>加盟咨询</Text>*/}
        {/*    <Ionicons*/}
        {/*      name={'ios-arrow-forward'}*/}
        {/*      size={18}*/}
        {/*    />*/}
        {/*  </View>*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity
          style={{paddingLeft: 20,paddingRight: 20}}
          onPress={() => {
            this.props.navigation.navigate('UserFeedBack')
          }}
        >
          <View
            style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',height: 50,borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#bbb'}}
          >
            <Text>帮助反馈</Text>
            <Ionicons
              name={'ios-arrow-forward'}
              size={18}
            />
          </View>
        </TouchableOpacity>
        {/*<UserEntry navigation={this.props.navigation} />*/}
      </ParallaxScrollView>
    )
  }
}

// const mapDispatchToProps = dispatch => ({
//   tipChange () {
//     const action = userTipChange('tip changed')
//     dispatch(action)
//   }
// })

export default User;

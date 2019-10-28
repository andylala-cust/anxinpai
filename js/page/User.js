import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {userTipChange} from '../action/user/actionCreators';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from "react-native-linear-gradient";
import {STATUSBAR_HEIGHT} from '../util';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';
import {UserEntry} from  '../components/user';
import {IMG_PLACE_COLOR} from '../constants';

const AVATAR_SIZE = 80;
const PARALLAX_HEADER_HEIGHT = 240;
const STICKY_HEADER_HEIGHT = 70;

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
                <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 16}}>无名小海豚</Text>
                <TouchableOpacity
                  style={{position: 'absolute',top: 0,right: 20}}
                  onPress={() => {
                    const toast = Toast.show('敬请期待^_^', {
                      position: 0
                    })
                  }}
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
                onPress={() => {
                  const toast = Toast.show('敬请期待^_^', {
                    position: 0
                  })
                }}
              >
                <Ionicons
                  name={'md-settings'}
                  size={20}
                  color={'#fff'}
                />
              </TouchableOpacity>
              <View style={{overflow: 'hidden',borderRadius: AVATAR_SIZE/2,backgroundColor: IMG_PLACE_COLOR}}>
                <Image source={{
                  uri: 'http://static.yfbudong.com/%E6%9C%8D%E5%8A%A1%E5%A4%B4%E5%83%8F.jpg',
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                }}/>
              </View>
              <View style={{flex: 1,paddingLeft: 20,justifyContent: 'space-between'}}>
                <Text style={{lineHeight: 30,color: '#fff',fontWeight: 'bold',fontSize: 16}}>
                  无名小海豚
                </Text>
                <Text style={{lineHeight: 30,color: '#fff',fontWeight: 'bold',fontSize: 14}}>
                  登录功能敬请期待~
                </Text>
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
        <UserEntry />
      </ParallaxScrollView>
    )
  }
}

const mapStateToProps = state => ({
  tip: state.user.tip
})

const mapDispatchToProps = dispatch => ({
  tipChange () {
    const action = userTipChange('tip changed')
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(User);

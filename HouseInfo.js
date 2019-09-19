import ParallaxScrollView from 'react-native-parallax-scroll-view';
import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, StatusBar, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'
import Swiper from 'react-native-swiper'
import { MapView } from 'react-native-amap3d'

const img = require('./img/cat.png')
const defaultFirstImg = 'http://static.yfbudong.com/defaulthouse.jpg'
const window = Dimensions.get('window');
const SCREEN_HEIGHT = window.height
const IPHONE_X_HEIGHT = 812
const _IPHONE_X_HEIGHT = 896
const IS_IPHONEX = Platform.OS === 'ios' && (SCREEN_HEIGHT === IPHONE_X_HEIGHT || SCREEN_HEIGHT === _IPHONE_X_HEIGHT)
const TAB_TOP = IS_IPHONEX ? 44 : 20
console.log(TAB_TOP)

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 270;
const STICKY_HEADER_HEIGHT = IS_IPHONEX? 110 : 86;

class HouseInfo extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    this.state = {
      img: defaultFirstImg,
      barStyle: 'light-content',
      iconColor: '#fff',
      toggleFixedShow: false,
      houseImgList: [defaultFirstImg]
    }
    this.renderHouseImgList = this.renderHouseImgList.bind(this)
  }
  renderHouseImgList () {
    return (
      // bug，分页器pagination不跟随swiper滑动而滚动
      // swiper加上key=this.state.houseImgList.length
      // 我也不知道有没有作用，不过加上之后bug消失了
      <Swiper style={styles.wrapper} loop={false} key={this.state.houseImgList.length}>
        {
          this.state.houseImgList.map((item, index) => (
            <TouchableOpacity style={{flex: 1}} activeOpacity={1} key={index} onLongPress={() => {alert(item)}}>
              <Image
                source={{uri: item}}
                style={styles.houseImgItem}
              />
            </TouchableOpacity>
          ))
        }
      </Swiper>
    )
  }
  componentDidMount () {
    const {id,datafrom} = this.props.navigation.state.params
    const url = `http://116.62.240.91:3000/house/pic?house_id=${id}&datafrom=${datafrom}`
    fetch(url)
      .then(res => (res.json()))
      .then(resText => {
        this.setState({
          img: resText.content[0],
          houseImgList: resText.content
        })
      })
  }
  render() {
    return (
      <ParallaxScrollView
        showsVerticalScrollIndicator={false}
        fadeOutForeground={false} // 决定向上滚动时候renderForeground是否淡出
        backgroundColor="#fff"
        contentBackgroundColor="#fff"
        parallaxHeaderHeight={270}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        // 获取垂直滚动距离
        onScroll={(e) => {if (e.nativeEvent.contentOffset.y > 0) {
          this.setState({
            barStyle: 'default',
            iconColor: '#000',
            toggleFixedShow: true
          })
        } else {
          this.setState({
            barStyle: 'light-content',
            iconColor: '#fff',
            toggleFixedShow: false
          })
        }}}
        // onChangeHeaderVisibility={(bool) => {console.log(bool)}} // header的显示和隐藏返回bool值
        renderFixedHeader={() => (
          <View style={styles.fixedWrapper}>
            <View key="fixed-header" style={styles.fixedSection}>
              <TouchableOpacity style={{paddingLeft: 20,paddingRight: 30}} onPress={() => {this.props.navigation.goBack()}}>
                <Ionicons name="ios-arrow-back" size={26} color={this.state.iconColor} />
              </TouchableOpacity>
              <TouchableOpacity style={{paddingLeft: 20,paddingRight: 20}} onPress={() => {alert('search')}} >
                <Entypo name="share" size={22} color={this.state.iconColor} />
              </TouchableOpacity>
            </View>
            {/*
              绑定多个style
              style={[styles1,styles2,styles3,...]}
            */}
            {/*
              根据条件绑定style
              style={[styles1, condition && styles2]}
            */}
            <View style={[styles.fixedBot, this.state.toggleFixedShow && styles.fixedBotActive]}>
              <TouchableOpacity style={[styles.fixedBotTextWrapper, this.state.toggleFixedShow && styles.fixedBotTextWrapperActive]} onPress={() => {alert(1)}}>
                <View>
                  <Text style={[styles.fixedBotText, this.state.toggleFixedShow && styles.fixedBotTextActive]}>1</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.fixedBotTextWrapper, this.state.toggleFixedShow && styles.fixedBotTextWrapperActive]} onPress={() => {alert(1)}}>
                <View>
                  <Text style={[styles.fixedBotText, this.state.toggleFixedShow && styles.fixedBotTextActive]}>1</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.fixedBotTextWrapper, this.state.toggleFixedShow && styles.fixedBotTextWrapperActive]} onPress={() => {alert(1)}}>
                <View>
                  <Text style={[styles.fixedBotText, this.state.toggleFixedShow && styles.fixedBotTextActive]}>1</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.fixedBotTextWrapper, this.state.toggleFixedShow && styles.fixedBotTextWrapperActive]} onPress={() => {alert(1)}}>
                <View>
                  <Text style={[styles.fixedBotText, this.state.toggleFixedShow && styles.fixedBotTextActive]}>1</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            {/*<TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={{bottom: 10, left: 20, position: 'absolute'}}>*/}
            {/*  <Ionicons name="ios-arrow-back" size={25} color="#333" />*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity onPress={() => {alert('search')}} style={{bottom: 10, right: 20, position: 'absolute'}}>*/}
            {/*  <MaterialIcons name="search" size={25} color="#333" />*/}
            {/*</TouchableOpacity>*/}
          </View>
        )}
        // renderBackground={() => (
        //   <Image
        //     source={{uri: this.state.img}}
        //     style={{width: '100%', height: '100%'}}
        //   />
        // )}
        renderForeground={() => this.renderHouseImgList()}>
        <StatusBar
          barStyle={this.state.barStyle}
          androidtranslucent={true}
        />
        {/*<MapView*/}
        {/*  showsCompass={false} // 是否显示指南针*/}
        {/*  style={{width: '100%',height: 400}}*/}
        {/*  coordinate={{*/}
        {/*    latitude: 39.91095,*/}
        {/*    longitude: 116.37296,*/}
        {/*  }}*/}
        {/*/>*/}
      </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: '100%',
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10,
    textAlign: 'center'
  },
  fixedWrapper: {
    position: 'absolute',
    top: TAB_TOP,
    width: '100%',
  },
  fixedBot: {
    opacity: 0,
    flexDirection: 'row',
    height: 0,
    borderTopWidth: 1,
    borderTopColor: '#f4f4f4'
  },
  fixedBotActive: {
    opacity: 1,
    height: 40
  },
  fixedBotTextWrapper: {
    flex: 1,
    height: 0
  },
  fixedBotTextWrapperActive: {
    height: 40
  },
  fixedBotText: {
    height: 0,
    lineHeight: 0,
    textAlign: 'center'
  },
  fixedBotTextActive: {
    height: 40,
    lineHeight: 40,
  },
  fixedSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  fixedSectionText: {
    color: '#fff',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  wrapper: {
  },
  houseImgItem: {
    width: '100%',
    height: '100%'
  }
});

export default HouseInfo

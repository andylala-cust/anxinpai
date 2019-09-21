import ParallaxScrollView from 'react-native-parallax-scroll-view';
import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, StatusBar, FlatList,ImageBackground,ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'
import Swiper from 'react-native-swiper'
import { MapView,Marker,Circle } from 'react-native-amap3d'

const img = require('./img/cat.png')
const defaultFirstImg = 'http://static.yfbudong.com/defaulthouse.jpg'
const window = Dimensions.get('window');
const SCREEN_HEIGHT = window.height
const IPHONE_X_HEIGHT = 812
const _IPHONE_X_HEIGHT = 896
const IS_IPHONEX = Platform.OS === 'ios' && (SCREEN_HEIGHT === IPHONE_X_HEIGHT || SCREEN_HEIGHT === _IPHONE_X_HEIGHT)
const TAB_TOP = IS_IPHONEX ? 44 : 20
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 270;
const STICKY_HEADER_HEIGHT = IS_IPHONEX? 110 : 86;
const NOTIFY_RESOLVE = 'bell-o' // 没有提醒
const NOTIFY_RESOLVE_TEXT = '结束前提醒'
const NOFITY_REJECT = 'bell-slash-o' // 已提醒
const NOFITY_REJECT_TEXT = '取消提醒'
const BARDEFAULTSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content'

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
      houseImgList: [defaultFirstImg],
      houseInfo: {},
      houseSchool: {},
      notifyStatus: false,
      notifyIcon: NOTIFY_RESOLVE,
      notifyText: NOTIFY_RESOLVE_TEXT,
      longitude: '',
      latitude: '',
      mLatitude: '',
      mLongitude: '',
      curLongitude: '',
      curLatitude: '',
      aroundList: []
    }
    this.renderHouseImgList = this.renderHouseImgList.bind(this)
    this.getHouseImgList = this.getHouseImgList.bind(this)
    this.changeNotify = this.changeNotify.bind(this)
    this.getHouseRate = this.getHouseRate.bind(this)
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
              {/*<ImageBackground*/}
              {/*  source={{uri: item}}*/}
              {/*  style={{width: '100%',height: '100%'}}*/}
              {/*/>*/}
            </TouchableOpacity>
          ))
        }
      </Swiper>
    )
  }
  getHouseImgList () {
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
      .catch(err => {
        console.log(err)
      })
  }
  changeNotify () {
    this.setState({
      notifyStatus: !this.state.notifyStatus,
      notifyIcon: this.state.notifyStatus ? NOTIFY_RESOLVE : NOFITY_REJECT,
      notifyText: this.state.notifyStatus ? NOTIFY_RESOLVE_TEXT : NOFITY_REJECT_TEXT
    })
  }
  getHouseRate () {
    const {id} = this.props.navigation.state.params
    const url =`http://116.62.240.91:3000/house/rate?house_id=${id}`
    fetch(url)
      .then(res => (res.json()))
      .then(resText => {
        this.setState({
          houseInfo: resText.content,
          longitude: resText.content.geo.x,
          latitude: resText.content.geo.y
        })
      })
  }
  getHouseSchool () {
    const {id} = this.props.navigation.state.params
    const url = `http://116.62.240.91:3000/house/schools?house_id=${id}&type_id=1002&page_id=1&page_size=1`
    fetch(url)
      .then(res => (res.json()))
      .then(resText => {
        this.setState({
          houseSchool: resText.content[0]
        })
      })
  }
  componentDidMount () {
    this.getHouseImgList()
    this.getHouseRate()
    this.getHouseSchool()
    // setTimeout(() => {
    //   this.mapView.animateTo({
    //     coordinate: {
    //       longitude: this.state.curLongitude,
    //       latitude: this.state.curLatitude
    //     }
    //   })
    // },2000)
  }
  render() {
    return (
      <ParallaxScrollView
        ref={(view) => {this.scrollView = view}}
        showsVerticalScrollIndicator={false}
        fadeOutForeground={false} // 决定向上滚动时候renderForeground是否淡出
        backgroundColor="#fff"
        contentBackgroundColor="#fff"
        parallaxHeaderHeight={270}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        // 获取垂直滚动距离
        onScroll={(e) => {if (e.nativeEvent.contentOffset.y > 0) {
          this.setState({
            barStyle: BARDEFAULTSTYLE,
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
              <TouchableOpacity style={[styles.fixedBotTextWrapper, this.state.toggleFixedShow && styles.fixedBotTextWrapperActive]} onPress={() => {this.scrollView.scrollTo({x: 0,y: 0,animated: true})}}>
                <View>
                  <Text style={[styles.fixedBotText, this.state.toggleFixedShow && styles.fixedBotTextActive]}>房源</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.fixedBotTextWrapper, this.state.toggleFixedShow && styles.fixedBotTextWrapperActive]} onPress={() => {this.scrollView.scrollTo({x: 0,y: PARALLAX_HEADER_HEIGHT-STICKY_HEADER_HEIGHT+this.baseLayout.y,animated: true})}}>
                <View>
                  <Text style={[styles.fixedBotText, this.state.toggleFixedShow && styles.fixedBotTextActive]}>详情</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.fixedBotTextWrapper, this.state.toggleFixedShow && styles.fixedBotTextWrapperActive]} onPress={() => {this.scrollView.scrollTo({x: 0,y: PARALLAX_HEADER_HEIGHT-STICKY_HEADER_HEIGHT+this.aroundLayout.y,animated: true})}}>
                <View>
                  <Text style={[styles.fixedBotText, this.state.toggleFixedShow && styles.fixedBotTextActive]}>周边</Text>
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
        renderForeground={() => this.renderHouseImgList()}
      >
        <StatusBar
          barStyle={this.state.barStyle}
          backgroundColor={"transparent"}
        />
        <View onLayout={event => {this.baseLayout = event.nativeEvent.layout}}>
          <View style={{padding: 20}}>
            <View style={{flexDirection: 'row',justifyContent: 'space-between',marginBottom: 15}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginRight: 10,paddingLeft: 3,paddingRight: 3,backgroundColor: '#eef0f3',fontSize: 11, color: '#7a8fbd',lineHeight: 15,borderRadius: 2}}>{this.state.houseInfo.cut}折</Text>
                <Text style={{marginRight: 10,paddingLeft: 3,paddingRight: 3,backgroundColor: '#eef0f3',fontSize: 11, color: '#7a8fbd',lineHeight: 15,borderRadius: 2}}>{this.state.houseInfo.circ}</Text>
                <Text style={{marginRight: 10,paddingLeft: 3,paddingRight: 3,backgroundColor: '#eef0f3',fontSize: 11, color: '#7a8fbd',lineHeight: 15,borderRadius: 2}}>{this.state.houseInfo.asset_type}</Text>
              </View>
              <TouchableOpacity onPress={() => this.changeNotify()}>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome
                    name={this.state.notifyIcon}
                    size={13}
                    style={{marginRight: 3,lineHeight: 15,color: '#5186ec'}}
                  />
                  <Text style={{fontSize: 13,lineHeight: 15}}>{this.state.notifyText}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginBottom: 15}}>
              <Text style={{fontSize: 19,lineHeight: 26,fontWeight: 'bold'}}>{this.state.houseInfo.title}</Text>
            </View>
            <View style={{flexDirection: 'row',marginBottom: 15}}>
              <View style={{flex: 1}}>
                <Text style={{marginBottom: 6,color: '#ff4738',fontWeight: 'bold',fontSize: 17}}>{parseInt(this.state.houseInfo.initialPrice/10000) || '-'}万</Text>
                <Text style={{color: '#aaa',fontSize: 12}}>起拍价</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{marginBottom: 6,color: '#ff4738',fontWeight: 'bold',fontSize: 17}}>{parseInt(this.state.houseInfo.consultPrice/10000) || '-'}万</Text>
                <Text style={{color: '#aaa',fontSize: 12}}>法院评估价</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{marginBottom: 6,color: '#ff4738',fontWeight: 'bold',fontSize: 17}}>{parseInt(this.state.houseInfo.marketPrice/10000) || '-'}万</Text>
                <Text style={{color: '#aaa',fontSize: 12}}>市场评估价</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row',marginBottom: 8}}>
              <Text style={{fontSize: 15,lineHeight: 20}}>{this.state.houseInfo.auction_start}</Text>
              <Text style={{marginLeft: 10,marginRight: 10,fontSize: 15,lineHeight: 20}}>至</Text>
              <Text style={{fontSize: 15,lineHeight: 20}}>{this.state.houseInfo.auction_end}</Text>
            </View>
            <View style={{flexDirection: 'row',marginBottom: 20}}>
              <Text style={{marginRight: 10,lineHeight: 16}}>{this.state.houseInfo.applyCount}人报名</Text>
              <Text style={{marginRight: 10,lineHeight: 16}}>{this.state.houseInfo.noticeCnt}人提醒</Text>
              <Text style={{marginRight: 10,lineHeight: 16}}>{this.state.houseInfo.viewerCount}次围观</Text>
            </View>
            <View>
              <View style={{flexDirection: 'row',marginBottom: 5}}>
                <Text style={{flex: 1,lineHeight: 20}} numberOfLines={1}>
                  <Text style={{color: '#aaa'}}>保证金：</Text>
                  {parseInt(this.state.houseInfo.margin/10000) || '-'}万
                </Text>
                <Text style={{flex: 1,lineHeight: 20}} numberOfLines={1}>
                  <Text style={{color: '#aaa'}}>单价：</Text>
                  {parseInt(this.state.houseInfo.average) || '-'}/㎡
                </Text>
              </View>
              <View style={{flexDirection: 'row',marginBottom: 5}}>
                <Text style={{flex: 1,lineHeight: 20}} numberOfLines={1}>
                  <Text style={{color: '#aaa'}}>楼层：</Text>
                  {this.state.houseInfo.floor}
                </Text>
                <Text style={{flex: 1,lineHeight: 20}} numberOfLines={1}>
                  <Text style={{color: '#aaa'}}>年代：</Text>
                  {this.state.houseInfo.build_time}
                </Text>
              </View>
              <View style={{flexDirection: 'row',marginBottom: 5}}>
                <Text style={{flex: 1,lineHeight: 20}} numberOfLines={1}>
                  <Text style={{color: '#aaa'}}>面积：</Text>
                  {this.state.houseInfo.area}㎡
                </Text>
              </View>
              <View style={{flexDirection: 'row',marginBottom: 5}}>
                <Text style={{flex: 1,lineHeight: 20}} numberOfLines={1}>
                  <Text style={{color: '#aaa'}}>小区：</Text>
                  {this.state.houseInfo.community_name || '-'}
                </Text>
              </View>
              <View style={{flexDirection: 'row',marginBottom: 5}}>
                <Text style={{flex: 1,lineHeight: 20}} numberOfLines={1}>
                  <Text style={{color: '#aaa'}}>小学：</Text>
                  {this.state.houseSchool.name || '-'}
                </Text>
              </View>
              <View style={{flexDirection: 'row',marginBottom: 5}}>
                <Text style={{flex: 1,lineHeight: 20}} numberOfLines={1}>
                  <Text style={{color: '#aaa'}}>轨交：</Text>
                  {this.state.houseSchool.name || '-'}
                </Text>
              </View>
              <View style={{flexDirection: 'row',marginBottom: 5}}>
                <Text style={{flex: 1,lineHeight: 20}} numberOfLines={1}>
                  <Text style={{color: '#aaa'}}>位置：</Text>
                  {this.state.houseInfo.location || '-'}
                </Text>
              </View>
            </View>
          </View>
          <View style={{height: 14,backgroundColor: '#f8f8f8'}}></View>
        </View>
        <View onLayout={event => {this.aroundLayout = event.nativeEvent.layout}}>
          <View style={{padding: 25}}>
            <View>
              <Text style={{fontSize: 17,fontWeight: 'bold'}}>周边配套</Text>
            </View>
          </View>
          <MapView
            ref={ref => (this.mapView = ref)}
            showsCompass={false} // 是否显示指南针
            style={{width: '100%',height: 500}}
            coordinate={{
              latitude: Number(this.state.latitude),
              longitude: Number(this.state.longitude),
            }}
            zoomLevel={14}
            // 不建议开启定位，他喵的会不停执行onLocation，作者在issue中也提到会在mapView中移除该功能，
            // 链接： https://github.com/qiuxiang/react-native-amap3d/issues/480
            // 建议使用 https://github.com/qiuxiang/react-native-amap-geolocation 进行定位
            // locationEnabled // 是否开启定位
            // locationInterval={2000} // 定位间隔默认2000毫秒
            // locationEnabled={true}
            // region={{
            //   latitude: Number(this.state.mLatitude),
            //   longitude: Number(this.state.mLongitude),
            //   latitudeDelta: 0.1,
            //   longitudeDelta: 0.1,
            // }}
            // locationEnabled为true执行onLocation
            // onLocation={({ nativeEvent }) => {
            //   if (!this.togglePos) {
            //     console.log(nativeEvent)
            //     this.setState({
            //       curLongitude: nativeEvent.longitude,
            //       curLatitude: nativeEvent.latitude
            //     })
            //     this.togglePos = true
            //   }
            // }}
            // 获取地图中心坐标
            onStatusChangeComplete={({nativeEvent}) => {
              // console.log(nativeEvent.longitude,nativeEvent.latitude)
              const {longitude,latitude} = nativeEvent
              const sGeo = `${longitude},${latitude}`
              const url = `http://116.62.240.91:3000/house/lists?type_id=0&city_id=1207&distance=3&noLimit=1&s_geo=${sGeo}`
              fetch(url)
                .then(res => (res.json()))
                .then(resText => {
                  this.setState({
                    aroundList: resText.content
                  })
                  console.log(resText)
                })
                .catch(err => {
                  console.log(err)
                })
            }}
          >
            <View style={{flexDirection: 'row',position: 'absolute', left: 0, bottom: 0,width: '100%',backgroundColor: 'rgba(7,17,27,.4)'}}>
              <Text style={{flex: 1,lineHeight: 30,color: '#fff',textAlign: 'center'}} onPress={() => {alert(1)}}>学校</Text>
              <Text style={{flex: 1,lineHeight: 30,color: '#fff',textAlign: 'center'}} onPress={() => {alert(2)}}>交通</Text>
              <Text style={{flex: 1,lineHeight: 30,color: '#fff',textAlign: 'center'}} onPress={() => {alert(3)}}>生活</Text>
              <Text style={{flex: 1,lineHeight: 30,color: '#fff',textAlign: 'center'}} onPress={() => {alert(4)}}>医疗</Text>
            </View>
            {/*<Circle*/}
            {/*  coordinate={{*/}
            {/*    latitude: this.state.latitude,*/}
            {/*    longitude: this.state.longitude,*/}
            {/*  }}*/}
            {/*  radius={60}*/}
            {/*  strokeWidth={1}*/}
            {/*  strokeColor={'#5186ec'}*/}
            {/*  fillColor={'rgba(75,152,236,.4)'}*/}
            {/*/>*/}
            <Marker
              title={this.state.houseInfo.title}
              coordinate={{
                latitude: Number(this.state.latitude),
                longitude: Number(this.state.longitude)
              }}
              key={this.state.houseInfo.id}
            />
            {
              this.state.aroundList.map(item => {
                return (
                  <Marker
                    key={item.id}
                    title={item.title}
                    coordinate={{
                      latitude: item.geo.y,
                      longitude: item.geo.x
                    }}
                  />
                )
              })
            }
          </MapView>
        </View>
        <View style={{height: 800,backgroundColor: '#f8f8f8'}}></View>
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
  // 图片全屏
  houseImgItem: {
    flex: 1,
    width: null,
    height: null,
  }
});

export default HouseInfo

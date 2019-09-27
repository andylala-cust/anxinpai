import ParallaxScrollView from 'react-native-parallax-scroll-view';
import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, StatusBar, FlatList,ImageBackground,ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import Swiper from 'react-native-swiper'
import { MapView,Marker,Circle } from 'react-native-amap3d'
import { WebView } from 'react-native-webview';

const defaultFirstImg = 'http://static.yfbudong.com/defaulthouse.jpg'
const window = Dimensions.get('window');
const SCREEN_HEIGHT = window.height
const SWIPER_HEIGHT = 240
const IPHONE_X_HEIGHT = 812
const _IPHONE_X_HEIGHT = 896
const IPHONE_STATUSBAR = 20
const IPHONEX_STATUSBAR = 44
const IPHONEX_TABBAR_DELTA = 34
const IS_IPHONEX = Platform.OS === 'ios' && (SCREEN_HEIGHT === IPHONE_X_HEIGHT || SCREEN_HEIGHT === _IPHONE_X_HEIGHT)
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONEX ? IPHONEX_STATUSBAR : IPHONE_STATUSBAR) : StatusBar.currentHeight;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0
const TAB_TOP = IS_IPHONEX ? 44 : 20
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 270;
const STICKY_HEADER_HEIGHT = IS_IPHONEX? 110 : 86;
const FIXED_ICON_HEIGHT = 40
let OPACITY = 0
const NOTIFY_RESOLVE = 'bell-o' // 没有提醒
const NOTIFY_RESOLVE_TEXT = '结束前提醒'
const NOFITY_REJECT = 'bell-slash-o' // 已提醒
const NOFITY_REJECT_TEXT = '取消提醒'
const BARDEFAULTSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content'
const FIXED_TAB_HEIGHT = 40
const FIXED_HEADER_HEIGHT = STATUSBAR_HEIGHT+FIXED_ICON_HEIGHT+FIXED_TAB_HEIGHT
const TRAFFIC_RADIUS = 1000
const GAODE_KEY = '29de9219429c6425c5cfd872e54e3838'

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
      trafficName: '',
      trafficAddress: '',
      trafficDistance: '',
      notifyStatus: false,
      notifyIcon: NOTIFY_RESOLVE,
      notifyText: NOTIFY_RESOLVE_TEXT,
      longitude: '',
      latitude: '',
      mLatitude: '',
      mLongitude: '',
      curLongitude: '',
      curLatitude: '',
      aroundList: [],
      courtDoc: {}
    }
    this.renderHouseImgList = this.renderHouseImgList.bind(this)
    this.getHouseImgList = this.getHouseImgList.bind(this)
    this.changeNotify = this.changeNotify.bind(this)
    this.getHouseRate = this.getHouseRate.bind(this)
    this.getHouseSchool = this.getHouseSchool.bind(this)
    this.getHouseTraffic = this.getHouseTraffic.bind(this)
    this.getCourtDoc = this.getCourtDoc.bind(this)
  }
  renderHouseImgList () {
    return (
      // bug，分页器pagination不跟随swiper滑动而滚动
      // swiper加上key=this.state.houseImgList.length
      // 我也不知道有没有作用，不过加上之后bug消失了
      // loop为true有莫名其妙的bug
      // loop为true的解决方案 https://github.com/leecade/react-native-swiper/issues/731
      // You should find this in .../node_modules/react-native-swiper/src/index.js
      // componentWillReceiveProps (nextProps) {
      //   if (!nextProps.autoplay && this.autoplayTimer) clearTimeout(this.autoplayTimer)
      //   this.setState(this.initState(nextProps, this.props.index !== nextProps.index))
      // }
      // plz remove this and try again, it will be run correctly.
      // github issue open有500多个
      <Swiper style={styles.wrapper} key={this.state.houseImgList.length}>
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
        const {x, y} = resText.content.geo
        this.setState({
          houseInfo: resText.content,
          longitude: x,
          latitude: y
        })
        this.getHouseTraffic(x, y)
      })
  }
  getHouseSchool () {
    const {id} = this.props.navigation.state.params
    const url = `http://116.62.240.91:3000/house/schools?house_id=${id}&type_id=1002&page_id=1&page_size=1`
    fetch(url)
      .then(res => (res.json()))
      .then(resText => {
        this.setState({
          houseSchool: resText.content[0] || {}
        })
      })
  }
  getHouseTraffic (lng, lat) {
    const location = `${lng},${lat}`
    const subwayUrl = `http://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&keywords=地铁&location=${location}&radius=${TRAFFIC_RADIUS}&offset=1`
    const busUrl = `http://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&keywords=公交&location=${location}&radius=${TRAFFIC_RADIUS}&offset=1`
    fetch(subwayUrl)
      .then(res => (res.json()))
      .then(resText => {
        if (Number(resText.count)) {
          this.setState({
            trafficName: resText.pois[0].name,
            trafficAddress: resText.pois[0].address,
            trafficDistance: resText.pois[0].distance
          })
        } else {
          fetch(busUrl)
            .then(res => (res.json()))
            .then(resText => {
              this.setState({
                trafficName: resText.pois[0].name,
                trafficAddress: resText.pois[0].address,
                trafficDistance: resText.pois[0].distance
              })
            })
        }
      })
  }
  getCourtDoc () {
    const {id} = this.props.navigation.state.params
    const url = `http://116.62.240.91:3000/house/court/doc?house_id=${id}`
    fetch(url)
      .then(res => (res.json()))
      .then(resText => {
        this.setState({
          courtDoc: resText.content
        })
        console.log(this.state.courtDoc)
      })
  }
  componentDidMount () {
    this.getHouseImgList()
    this.getHouseRate()
    this.getHouseSchool()
    this.getCourtDoc()
    // setTimeout(() => {
    //   this.mapView.animateTo({
    //     coordinate: {
    //       longitude: this.state.curLongitude,
    //       latitude: this.state.curLatitude
    //     }
    //   })
    // },2000)
  }
  componentWillMount () {
    OPACITY = 0
    this.setState({
      toggleFixedShow: false
    })
  }
  render() {
    return (
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={(view) => {this.scrollView = view}}
          scrollEventThrottle={1}
          style={{marginBottom: TAB_BAR_HEIGHT+80}}
          onScroll={(e) => {
            OPACITY = e.nativeEvent.contentOffset.y/(SWIPER_HEIGHT - FIXED_ICON_HEIGHT - STATUSBAR_HEIGHT-FIXED_TAB_HEIGHT)
            if (OPACITY <= 0) {
              OPACITY = 0
            }
            if (OPACITY >= 1) {
              OPACITY = 1
            }
            if (e.nativeEvent.contentOffset.y > 0) {
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
        >
          <StatusBar
            barStyle={this.state.barStyle}
            backgroundColor={"transparent"}
          />
          <Swiper style={styles.wrapper} key={this.state.houseImgList.length}>
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
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {parseInt(this.state.houseSchool.distance) || '-'}米
                  </Text>
                </View>
                <View style={{flexDirection: 'row',marginBottom: 5}}>
                  <View style={{flex: 1,flexDirection: 'row'}}>
                    <Text style={{lineHeight: 20,color: '#aaa'}}>轨交：</Text>
                    <Text style={{lineHeight: 20}}>
                      {this.state.trafficName || '-'}
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {this.state.trafficAddress || '-'}
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {parseInt(this.state.trafficDistance) || '-'}米
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row',marginBottom: 5}}>
                  <View style={{flex: 1,flexDirection: 'row'}}>
                    <Text style={{color: '#aaa',lineHeight: 20}}>位置：</Text>
                    <Text style={{lineHeight: 20,flex: 1}}>{this.state.houseInfo.location || this.state.houseInfo.title || '-'}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{height: 14,backgroundColor: '#f8f8f8'}}></View>
          </View>
          <View>
            <View style={{padding: 25}}>
              <View>
                <Text style={{fontSize: 17,fontWeight: 'bold'}}>法院公告</Text>
              </View>
            </View>
            <WebView
              style={{height: 300}}
              source={{html: `${this.state.courtDoc.desc}${this.state.courtDoc.announce}`}}
            />
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
              style={{width: '100%',height: 200}}
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
            <View style={{height: 600,backgroundColor: '#f8f8f8'}}></View>
          </View>
        </ScrollView>
        <View style={{position: 'absolute',bottom: 0,left: 0,right: 0,height: TAB_BAR_HEIGHT+80,paddingTop: 10,paddingBottom: TAB_BAR_HEIGHT+10,backgroundColor: '#fff',shadowColor: '#000',
          shadowOffset:{
            width: 0,
            height: 1
          },
          shadowOpacity: 0.1,
          shadowRadius: 5,}}>
          <View style={{flex: 1,flexDirection: 'row',paddingLeft: 20,paddingRight: 20,justifyContent: 'space-between'}}>
            <View style={{width: '38%',flexDirection: 'row'}}>
              <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <Image
                  source={{uri: 'http://static.yfbudong.com/20211492_1563796879100_6.jpeg'}}
                  style={{width: 50,height: 50,borderRadius: 25}}
                />
              </View>
              <View style={{justifyContent: 'space-around',alignItems: 'flex-start',paddingLeft: 4}}>
                <Text style={{fontWeight: 'bold',fontSize: 16}}>周蓉</Text>
                <Text style={{fontSize: 12,color: '#bababa'}}>海豚官方</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row',width: '60%',justifyContent: 'space-between'}}>
              <View style={{width: '48%',backgroundColor: '#66c18f',borderRadius: 5,justifyContent: 'center',alignItems: 'center'}}>
                <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 18}}>在线问</Text>
              </View>
              <View style={{width: '48%',backgroundColor: '#3e74ee',borderRadius: 5,justifyContent: 'center',alignItems: 'center'}}>
                <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 18}}>去贷款</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{position: 'absolute',left: 0,right: 0,flexDirection: 'row',justifyContent: 'space-between',paddingTop: STATUSBAR_HEIGHT,backgroundColor: `rgba(255,255,255,${OPACITY})`}}>
          <TouchableOpacity style={{paddingLeft: 20,paddingRight: 30,}} onPress={() => {this.props.navigation.goBack()}}>
            <Ionicons name="ios-arrow-back" size={26} color={this.state.iconColor} style={{height: FIXED_ICON_HEIGHT,lineHeight: FIXED_ICON_HEIGHT}} />
          </TouchableOpacity>
          <TouchableOpacity style={{paddingLeft: 20,paddingRight: 20,}} onPress={() => {alert('search')}} >
            <Feather name="share" size={20} color={this.state.iconColor} style={{height: FIXED_ICON_HEIGHT,lineHeight: FIXED_ICON_HEIGHT}} />
          </TouchableOpacity>
        </View>
        {
          this.state.toggleFixedShow && <View style={{position: 'absolute',top: STATUSBAR_HEIGHT+FIXED_ICON_HEIGHT,left: 0,right: 0,backgroundColor: `rgba(255,255,255,${OPACITY})`,flexDirection: 'row',borderTopWidth: 1,borderTopColor: '#f4f4f4',}}>
            {/*<TouchableOpacity*/}
            {/*  onPress={() => {*/}
            {/*    this.scrollView.scrollTo({x: 0,y: 0,animated: true})*/}
            {/*  }}*/}
            {/*  style={{flex: 1,justifyContent:'center',alignItems: 'center'}}*/}
            {/*>*/}
            {/*  <View>*/}
            {/*    <Text style={{height: FIXED_TAB_HEIGHT,lineHeight: FIXED_TAB_HEIGHT}}>房源</Text>*/}
            {/*  </View>*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity
              onPress={() => {
                this.scrollView.scrollTo({x: 0,y: this.baseLayout.y-FIXED_HEADER_HEIGHT,animated: true})
              }}
              style={{flex: 1,justifyContent:'center',alignItems: 'center'}}
            >
              <View>
                <Text style={{height: FIXED_TAB_HEIGHT,lineHeight: FIXED_TAB_HEIGHT}}>详情</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                alert(1)
              }}
              style={{flex: 1,justifyContent:'center',alignItems: 'center'}}
            >
              <View>
                <Text style={{height: FIXED_TAB_HEIGHT,lineHeight: FIXED_TAB_HEIGHT}}>公告</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                alert(1)
              }}
              style={{flex: 1,justifyContent:'center',alignItems: 'center'}}
            >
              <View>
                <Text style={{height: FIXED_TAB_HEIGHT,lineHeight: FIXED_TAB_HEIGHT}}>价值</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.scrollView.scrollTo({x: 0,y: this.aroundLayout.y-FIXED_HEADER_HEIGHT,animated: true})
              }}
              style={{flex: 1,justifyContent:'center',alignItems: 'center'}}
            >
              <View>
                <Text style={{height: FIXED_TAB_HEIGHT,lineHeight: FIXED_TAB_HEIGHT}}>周边</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      </View>
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
    height: SWIPER_HEIGHT
  },
  // 图片全屏
  houseImgItem: {
    flex: 1,
    width: null,
    height: null,
  }
});

export default HouseInfo

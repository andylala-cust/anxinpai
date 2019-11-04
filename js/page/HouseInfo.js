import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ART,
  StyleSheet
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {IS_IPHONEX} from '../util';
import {STATUSBAR_HEIGHT,storage} from '../util';
import {Split} from '../components/common';
import {
  HouseInfoSwiper,
  HouseDetail,
  HouseCourt,
  HouseAround,
  HouseBottomCard,
  HousePreview,
  HouseValue,
  HouseDeal,
  HouseProperty,
  HouseInfoFooter
} from '../components/houseInfo';
import {connect} from 'react-redux';
import {updateCourtUrl,updateValueUrl,updatePreviewList,updateHouseProperty} from '../action/houseInfo/actionCreators';
import _fetch from '../fetch';
import {queryString} from '../util';
import Toast from 'react-native-root-toast';

const {Surface,Shape,Group} = ART;
const SWIPER_HEIGHT = 240;
const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0;
const FIXED_ICON_HEIGHT = 40;
let self;
const BARDEFAULTSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
const FIXED_TAB_HEIGHT = 40;
const FIXED_HEADER_HEIGHT = STATUSBAR_HEIGHT+FIXED_ICON_HEIGHT+FIXED_TAB_HEIGHT;
const TRAFFIC_RADIUS = 1000;
const GAODE_KEY = '29de9219429c6425c5cfd872e54e3838';  // 高德地图KEY

class HouseInfo extends Component {
  static navigationOptions = {
    header: null,
    headerBackTitle: null
  }
  constructor (props) {
    super(props)
    self = this
    this.state = {
      barStyle: true, // 判断是否从同意路由退出
      iconColor: '#fff',
      toggleFixedShow: false,
      houseImgList: [],
      houseInfo: {},
      houseSchool: {},
      trafficName: '',
      trafficAddress: '',
      trafficDistance: '',
      longitude: '',
      latitude: '',
      courtDoc: {},
      houseStatusArr: [],
      houseDealArr: [],
      opacity: 0,
      highlightIndex: 0,
      agentData: {}
    }
    this.getAgent = this.getAgent.bind(this)
    this.getHouseImgList = this.getHouseImgList.bind(this)
    this.getHouseRate = this.getHouseRate.bind(this)
    this.getHouseSchool = this.getHouseSchool.bind(this)
    this.getHouseTraffic = this.getHouseTraffic.bind(this)
    this.getCourtDoc = this.getCourtDoc.bind(this)
    this.handleWebViewClick = this.handleWebViewClick.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }
  getAgent () {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    storage.getItem('user_id').then(data => {
      const userId = data
      const url = `/activity/getConsultant?user_id=${userId}`
      _fetch.get(url)
        .then(data => {
          if (data.content.avatar.indexOf('http') === -1) {
            data.content.avatar = `http://static.yfbudong.com/${data.content.avatar}`
          }
          this.setState({
            agentData: data.content
          })
          StatusBar.setNetworkActivityIndicatorVisible(false)
        })
    })
  }
  getHouseImgList () {
    const {id,datafrom} = this.props.navigation.state.params
    const url = `/house/pic?house_id=${id}&datafrom=${datafrom}`
    StatusBar.setNetworkActivityIndicatorVisible(true)
    _fetch.get(url)
      .then(data => {
        StatusBar.setNetworkActivityIndicatorVisible(false)
        this.setState({
          houseImgList: data.content
        })
        const arr = []
        this.state.houseImgList.map(item => {
          arr.push({
            url: item
          })
        })
        this.props._updatePreviewList(arr)
      })
  }
  getHouseRate () {
    const {id} = this.props.navigation.state.params
    const url =`/house/rate?house_id=${id}`
    StatusBar.setNetworkActivityIndicatorVisible(true)
    _fetch.get(url)
      .then(data => {
        StatusBar.setNetworkActivityIndicatorVisible(false)
        const {x, y} = data.content.geo
        const {title,zone_id,typeId} = data.content
        this.setState({
          houseInfo: data.content,
          longitude: x,
          latitude: y
        })
        this.getHouseTraffic(x, y)
        this.getHouseStatus(zone_id, title)
        this.getDealList({
          zone_id,
          geo_x: x,
          geo_y: y,
          typeId
        })
        this.props._updateHouseProperty(data.content)
      })
  }
  getHouseStatus (zoneId, title) {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    _fetch.get(`/house/actionstatus?zone_id=${zoneId}&title=${title}`)
      .then(data => {
        this.setState({
          houseStatusArr: data.content
        })
        StatusBar.setNetworkActivityIndicatorVisible(false)
      })
  }
  getDealList (params) {
    const str = queryString.stringify(params)
    StatusBar.setNetworkActivityIndicatorVisible(true)
    _fetch.get(`/house/similarhouses?${str}`)
      .then(data => {
        this.setState({
          houseDealArr: data.content
        })
        StatusBar.setNetworkActivityIndicatorVisible(false)
      })
  }
  getHouseSchool () {
    const {id} = this.props.navigation.state.params
    const url = `/house/schools?house_id=${id}&type_id=1002&page_id=1&page_size=1`
    StatusBar.setNetworkActivityIndicatorVisible(true)
    _fetch.get(url)
      .then(data => {
        this.setState({
          houseSchool: data.content[0] || {}
        })
        StatusBar.setNetworkActivityIndicatorVisible(false)
      })
  }
  getHouseTraffic (lng, lat) {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    const location = `${lng},${lat}`
    const subwayUrl = `http://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&keywords=地铁&location=${location}&radius=${TRAFFIC_RADIUS}&offset=1`
    const busUrl = `http://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&keywords=公交&location=${location}&radius=${TRAFFIC_RADIUS}&offset=1`
    _fetch.get(subwayUrl, true)
      .then(data => {
        if (Number(data.count)) {
          this.setState({
            trafficName: data.pois[0].name,
            trafficAddress: data.pois[0].address,
            trafficDistance: data.pois[0].distance
          })
          StatusBar.setNetworkActivityIndicatorVisible(false)
        } else {
          _fetch.get(busUrl, true)
            .then(data => {
              StatusBar.setNetworkActivityIndicatorVisible(false)
              this.setState({
                trafficName: data.pois[0].name,
                trafficAddress: data.pois[0].address,
                trafficDistance: data.pois[0].distance
              })
            })
        }
      })
  }
  getCourtDoc () {
    const {id} = this.props.navigation.state.params
    const url = `/house/court/doc?house_id=${id}`
    StatusBar.setNetworkActivityIndicatorVisible(true)
    _fetch.get(url)
      .then(data => {
        this.setState({
          courtDoc: data.content
        })
        StatusBar.setNetworkActivityIndicatorVisible(false)
      })
  }
  handleWebViewClick () {
    this.props.navigation.navigate('Court')
  }
  handleScroll (e) {
    if (e.nativeEvent.contentOffset.y < this.props.courtLayout-FIXED_HEADER_HEIGHT) {
      this.setState({
        highlightIndex: 0
      })
    }
    if (e.nativeEvent.contentOffset.y >= this.props.courtLayout-FIXED_HEADER_HEIGHT-1 && e.nativeEvent.contentOffset.y < this.props.valueLayout-FIXED_HEADER_HEIGHT) {
      this.setState({
        highlightIndex: 1
      })
    }
    if (e.nativeEvent.contentOffset.y >= this.props.valueLayout-FIXED_HEADER_HEIGHT-1 && e.nativeEvent.contentOffset.y < this.props.aroundLayout-FIXED_HEADER_HEIGHT) {
      this.setState({
        highlightIndex: 2
      })
    }
    if (e.nativeEvent.contentOffset.y >= this.props.aroundLayout-FIXED_HEADER_HEIGHT-1) {
      this.setState({
        highlightIndex: 3
      })
    }
    this.setState({
      opacity: e.nativeEvent.contentOffset.y/(SWIPER_HEIGHT - FIXED_ICON_HEIGHT - STATUSBAR_HEIGHT-FIXED_TAB_HEIGHT)
    })
    if (e.nativeEvent.contentOffset.y > 0) {
      this.setState({
        barStyle: false,
        iconColor: '#000',
        toggleFixedShow: true
      })
      StatusBar.setBarStyle(BARDEFAULTSTYLE)
    } else {
      this.setState({
        barStyle: true,
        iconColor: '#fff',
        toggleFixedShow: false
      })
      StatusBar.setBarStyle('light-content')
    }
  }
  componentDidMount () {
    StatusBar.setNetworkActivityIndicatorVisible(true)
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      // 这个promise很关键
      new Promise(resolve => {
        resolve()
      }).then(() => {
        if (this.state.barStyle) {
          StatusBar.setBarStyle('light-content')
        } else {
          StatusBar.setBarStyle(BARDEFAULTSTYLE)
        }
      })
    })
    this.getAgent()
    this.getHouseImgList()
    this.getHouseRate()
    this.getHouseSchool()
    this.getCourtDoc()
    this.props._updateCourtUrl()
    this.props._updateValueUrl()
  }
  componentWillMount () {
    this.setState({
      toggleFixedShow: false,
      opacity: 0
    })
  }
  componentWillUnmount() {
    this.navListener.remove()
  }
  render() {
    return (
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={(view) => {this.scrollView = view}}
          scrollEventThrottle={1}
          style={{marginBottom: TAB_BAR_HEIGHT+80,backgroundColor: '#f8f8f9'}}
          onScroll={(e) => this.handleScroll(e)}
        >
          <StatusBar
            // barStyle={this.state.barStyle}
            barStyle={'light-content'}
            backgroundColor={"transparent"}
            translucent={true}
            networkActivityIndicatorVisible={true}
          />
          <HousePreview />
          <HouseInfoSwiper houseImgList={this.state.houseImgList} />
          <HouseDetail
            {...this.state.houseInfo}
            houseSchool={this.state.houseSchool}
            trafficName={this.state.trafficName}
            trafficAddress={this.state.trafficAddress}
            trafficDistance={this.state.trafficDistance}
          />
          <Split />
          <HouseCourt {...this.state.courtDoc} handleWebViewClick={this.handleWebViewClick} />
          <Split />
          <HouseValue houseStatusArr={this.state.houseStatusArr} navigation={this.props.navigation} />
          <HouseDeal houseDealArr={this.state.houseDealArr} navigation={this.props.navigation} />
          <HouseProperty />
          <Split />
          <HouseAround
            {...this.state.houseInfo}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            navigation={this.props.navigation}
          />
          <HouseInfoFooter id={this.props.navigation.state.params.id} />
        </ScrollView>
        <HouseBottomCard {...this.state.agentData} />
        <View style={{position: 'absolute',left: 0,right: 0,flexDirection: 'row',justifyContent: 'space-between',paddingTop: STATUSBAR_HEIGHT,backgroundColor: `rgba(255,255,255,${this.state.opacity})`}}>
          <TouchableOpacity style={{paddingLeft: 20,paddingRight: 30,}} onPress={() => {this.props.navigation.goBack()}}>
            <Ionicons name="ios-arrow-back" size={26} color={this.state.iconColor} style={{height: FIXED_ICON_HEIGHT,lineHeight: FIXED_ICON_HEIGHT}} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{paddingLeft: 5,paddingRight: 5,marginRight: 15}}
              onPress={() => {
                const toast = Toast.show('敬请期待^_^', {
                  position: 0
                })
              }}
            >
              <Ionicons name="ios-heart-empty" size={22} color={this.state.iconColor} style={{height: FIXED_ICON_HEIGHT,lineHeight: FIXED_ICON_HEIGHT}} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingLeft: 5,paddingRight: 5,marginRight: 15}}
              onPress={() => {
                const toast = Toast.show('敬请期待^_^', {
                  position: 0
                })
              }}
            >
              <View
                style={{height: FIXED_ICON_HEIGHT,alignItems: 'center',justifyContent: 'center'}}
              >
                <Surface
                  width={30}
                  height={30}
                >
                  <Group scale={0.03}>
                    <Shape
                      fill={this.state.iconColor}
                      d={`M323.778121 696.937879V288.262264h58.382231v111.291127h100.344459v40.137784h-100.344459V623.96009c29.191115-7.297779 62.03112-19.460744 98.520014-36.488894v43.786673c-48.651859 26.758522-100.952607 48.651859-156.902245 65.68001z m253.597814-5.473335c-45.002969 1.216296-66.896306-21.285188-65.680009-67.504454V282.78893h58.382231V408.675615c40.137784-4.865186 69.937047-26.150374 89.39779-63.855565h58.382231c-24.325929 60.814824-73.585937 94.262977-147.780021 100.344459v176.971137c0 21.893337 10.946668 32.840005 32.840004 32.840004h34.66445c21.893337 0 32.840005-10.33852 32.840005-31.01556v-23.717781h45.611117V631.257869c0 40.137784-21.893337 60.206675-65.680009 60.206675h-72.977789zM476.301699 844.474641c-96.57394 0-187.431286-37.583561-255.665519-105.939423S114.696757 579.443639 114.696757 482.869699c0-96.57394 37.583561-187.431286 105.939423-255.665518 68.355862-68.355862 159.091579-105.939423 255.665519-105.939423v24.32593C290.329968 145.590688 139.022687 296.897969 139.022687 482.869699s151.307281 337.279012 337.279012 337.279012v24.32593zM547.698301 844.474641v-24.32593c185.971731 0 337.279012-151.307281 337.279012-337.279012S733.670032 145.590688 547.698301 145.590688v-24.32593c96.57394 0 187.431286 37.583561 255.665519 105.939423 68.355862 68.355862 105.939423 159.091579 105.939423 255.665518 0 96.57394-37.583561 187.431286-105.939423 255.665519-68.355862 68.355862-159.091579 105.939423-255.665519 105.939423z`}
                    />
                  </Group>
                </Surface>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingRight: 20}}
              onPress={() => {
                const toast = Toast.show('敬请期待^_^', {
                  position: 0
                })
              }}
            >
              <Feather name="share" size={20} color={this.state.iconColor} style={{height: FIXED_ICON_HEIGHT,lineHeight: FIXED_ICON_HEIGHT}} />
            </TouchableOpacity>
          </View>
        </View>
        {
          this.state.toggleFixedShow && <View style={{position: 'absolute',top: STATUSBAR_HEIGHT+FIXED_ICON_HEIGHT,left: 0,right: 0,backgroundColor: `rgba(255,255,255,${this.state.opacity})`,flexDirection: 'row',borderTopWidth: StyleSheet.hairlineWidth,borderTopColor: '#bbb',}}>
            <TouchableOpacity
              onPress={() => {
                this.scrollView.scrollTo({x: 0,y: this.props.baseLayout-FIXED_HEADER_HEIGHT,animated: true})
              }}
              style={{flex: 1,justifyContent:'center',alignItems: 'center'}}
            >
              <View>
                <Text style={[{height: FIXED_TAB_HEIGHT,lineHeight: FIXED_TAB_HEIGHT},{color: this.state.highlightIndex == 0 ? '#006aff' : '#000'}]}>详情</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.scrollView.scrollTo({x: 0,y: this.props.courtLayout-FIXED_HEADER_HEIGHT,animated: true})
              }}
              style={{flex: 1,justifyContent:'center',alignItems: 'center'}}
            >
              <View>
                <Text style={[{height: FIXED_TAB_HEIGHT,lineHeight: FIXED_TAB_HEIGHT},{color: this.state.highlightIndex == 1 ? '#006aff' : '#000'}]}>公告</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.scrollView.scrollTo({x: 0,y: this.props.valueLayout-FIXED_HEADER_HEIGHT,animated: true})
              }}
              style={{flex: 1,justifyContent:'center',alignItems: 'center'}}
            >
              <View>
                <Text style={[{height: FIXED_TAB_HEIGHT,lineHeight: FIXED_TAB_HEIGHT},{color: this.state.highlightIndex == 2 ? '#006aff' : '#000'}]}>价值</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.scrollView.scrollTo({x: 0,y: this.props.aroundLayout-FIXED_HEADER_HEIGHT,animated: true})
              }}
              style={{flex: 1,justifyContent:'center',alignItems: 'center'}}
            >
              <View>
                <Text style={[{height: FIXED_TAB_HEIGHT,lineHeight: FIXED_TAB_HEIGHT},{color: this.state.highlightIndex == 3 ? '#006aff' : '#000'}]}>周边</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      </View>
  );
  }
}

const mapStateToProps = state => ({
  courtUrl: state.houseInfo.courtUrl,
  baseLayout: state.houseInfo.baseLayout,
  courtLayout: state.houseInfo.courtLayout,
  valueLayout: state.houseInfo.valueLayout,
  aroundLayout: state.houseInfo.aroundLayout
})

const mapDispatchToProps = dispatch => ({
  _updateCourtUrl () {
    const {id} = self.props.navigation.state.params
    const action = updateCourtUrl(`http://www.yfbudong.com/m_index.html#/court/${id}`)
    dispatch(action)
  },
  _updateValueUrl () {
    const {id} = self.props.navigation.state.params
    const action = updateValueUrl(`http://www.yfbudong.com/m_index.html#/houseValue/${id}`)
    dispatch(action)
  },
  _updatePreviewList (value) {
    const action = updatePreviewList(value)
    dispatch(action)
  },
  _updateHouseProperty (value) {
    const action = updateHouseProperty(value)
    dispatch(action)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HouseInfo);

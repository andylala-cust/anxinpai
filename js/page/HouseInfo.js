import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {IS_IPHONEX} from '../util';
import {STATUSBAR_HEIGHT} from '../util';
import {Split} from '../components/common';
import {
  HouseInfoSwiper,
  HouseDetail,
  HouseCourt,
  HouseAround,
  HouseBottomCard,
  HousePreview
} from '../components/houseInfo';
import {connect} from 'react-redux';
import {updateCourtUrl,updatePreviewList} from '../action/houseInfo/actionCreators';
import _fetch from '../fetch';

const defaultFirstImg = 'http://static.yfbudong.com/defaulthouse.jpg';
const SWIPER_HEIGHT = 240;
const IPHONEX_TABBAR_DELTA = 34;
const TAB_BAR_HEIGHT = IS_IPHONEX ? IPHONEX_TABBAR_DELTA : 0;
const FIXED_ICON_HEIGHT = 40;
let OPACITY = 0;
let self;
const BARDEFAULTSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
const FIXED_TAB_HEIGHT = 40;
const FIXED_HEADER_HEIGHT = STATUSBAR_HEIGHT+FIXED_ICON_HEIGHT+FIXED_TAB_HEIGHT;
const TRAFFIC_RADIUS = 1000;
const GAODE_KEY = '29de9219429c6425c5cfd872e54e3838';  // 高德地图KEY

class HouseInfo extends Component {
  static navigationOptions = {
    header: null
  }
  constructor (props) {
    super(props)
    self = this
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
      longitude: '',
      latitude: '',
      courtDoc: {},
    }
    this.getHouseImgList = this.getHouseImgList.bind(this)
    this.getHouseRate = this.getHouseRate.bind(this)
    this.getHouseSchool = this.getHouseSchool.bind(this)
    this.getHouseTraffic = this.getHouseTraffic.bind(this)
    this.getCourtDoc = this.getCourtDoc.bind(this)
    this.handleWebViewClick = this.handleWebViewClick.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }
  getHouseImgList () {
    const {id,datafrom} = this.props.navigation.state.params
    const url = `/house/pic?house_id=${id}&datafrom=${datafrom}`
    _fetch.get(url)
      .then(data => {
        this.setState({
          img: data.content[0],
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
    _fetch.get(url)
      .then(data => {
        const {x, y} = data.content.geo
        this.setState({
          houseInfo: data.content,
          longitude: x,
          latitude: y
        })
        this.getHouseTraffic(x, y)
      })
  }
  getHouseSchool () {
    const {id} = this.props.navigation.state.params
    const url = `/house/schools?house_id=${id}&type_id=1002&page_id=1&page_size=1`
    _fetch.get(url)
      .then(data => {
        this.setState({
          houseSchool: data.content[0] || {}
        })
      })
  }
  getHouseTraffic (lng, lat) {
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
        } else {
          _fetch.get(busUrl, true)
            .then(data => {
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
    _fetch.get(url)
      .then(data => {
        this.setState({
          courtDoc: data.content
        })
      })
  }
  handleWebViewClick () {
    this.props.navigation.navigate('Court')
  }
  handleScroll (e) {
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
    }
  }
  componentDidMount () {
    this.getHouseImgList()
    this.getHouseRate()
    this.getHouseSchool()
    this.getCourtDoc()
    this.props._updateCourtUrl()
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
          onScroll={(e) => this.handleScroll(e)}
        >
          <StatusBar
            barStyle={this.state.barStyle}
            backgroundColor={"transparent"}
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
          <HouseAround
            {...this.state.houseInfo}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
          />
        </ScrollView>
        <HouseBottomCard />
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
            <TouchableOpacity
              onPress={() => {
                this.scrollView.scrollTo({x: 0,y: this.props.baseLayout-FIXED_HEADER_HEIGHT,animated: true})
              }}
              style={{flex: 1,justifyContent:'center',alignItems: 'center'}}
            >
              <View>
                <Text style={{height: FIXED_TAB_HEIGHT,lineHeight: FIXED_TAB_HEIGHT}}>详情</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.scrollView.scrollTo({x: 0,y: this.props.courtLayout-FIXED_HEADER_HEIGHT,animated: true})
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
                this.scrollView.scrollTo({x: 0,y: this.props.aroundLayout-FIXED_HEADER_HEIGHT,animated: true})
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

const mapStateToProps = state => ({
  courtUrl: state.houseInfo.courtUrl,
  baseLayout: state.houseInfo.baseLayout,
  courtLayout: state.houseInfo.courtLayout,
  aroundLayout: state.houseInfo.aroundLayout
})

const mapDispatchToProps = dispatch => ({
  _updateCourtUrl () {
    const {id} = self.props.navigation.state.params
    const action = updateCourtUrl(`http://www.yfbudong.com/m_index.html#/court/${id}`)
    dispatch(action)
  },
  _updatePreviewList (value) {
    const action = updatePreviewList(value)
    dispatch(action)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HouseInfo);

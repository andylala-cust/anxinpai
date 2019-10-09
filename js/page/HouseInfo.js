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
  HouseBottomCard
} from '../components/houseInfo';
import {connect} from 'react-redux';
import {updateCourtUrl} from '../action/houseInfo/actionCreators';

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
      courtDoc: {}
    }
    this.getHouseImgList = this.getHouseImgList.bind(this)
    this.getHouseRate = this.getHouseRate.bind(this)
    this.getHouseSchool = this.getHouseSchool.bind(this)
    this.getHouseTraffic = this.getHouseTraffic.bind(this)
    this.getCourtDoc = this.getCourtDoc.bind(this)
    this.handleWebViewClick = this.handleWebViewClick.bind(this)
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
  aroundLayout: state.houseInfo.aroundLayout,
})

const mapDispatchToProps = dispatch => ({
  _updateCourtUrl () {
    const {id} = self.props.navigation.state.params
    const action = updateCourtUrl(`http://www.yfbudong.com/m_index.html#/court/${id}`)
    dispatch(action)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HouseInfo);

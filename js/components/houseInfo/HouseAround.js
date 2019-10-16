import React,{Component} from 'react';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import {MapView, Marker} from 'react-native-amap3d/lib/js';
import {connect} from 'react-redux';
import {getAroundLayout} from '../../action/houseInfo/actionCreators';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _fetch from '../../fetch';

const GAODE_KEY = '29de9219429c6425c5cfd872e54e3838';  // 高德地图KEY

let self;

class HouseAround extends Component {
  constructor (props) {
    super(props)
    self = this
    this.state = {
      aroundList: [],
      kidSchoolArr: [{}],
      schoolArr: [{}],
      middleSchoolArr: [{}],
      subwayArr: [{}],
      busArr: [{}],
      marketArr: [{}],
      medicalArr: [{}]
    }
    this.getKidSchollData = this.getKidSchollData.bind(this)
    this.getSchoolData = this.getSchoolData.bind(this)
    this.getMiddleSchoolData = this.getMiddleSchoolData.bind(this)
    this.getSubwayData = this.getSubwayData.bind(this)
    this.getBusData = this.getBusData.bind(this)
    this.getMarketData = this.getMarketData.bind(this)
    this.getMedicalData = this.getMedicalData.bind(this)
    this.showAround = this.showAround.bind(this)
    this.handleLayout = this.handleLayout.bind(this)
  }
  getKidSchollData (nextProps) {
    const geo = `${nextProps.latitude},${nextProps.longitude}`
    // 141204 按距离排序，获取高德地图附近一公里幼儿园
    _fetch.get(`https://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&location=${geo}&types=141204&radius=1000&offset=10&page=1&sortrule=distance&extensions=all`,true)
      .then(data => {
        this.setState({
          kidSchoolArr: data.pois.length ? data.pois : [{}]
        })
      })
  }
  getSchoolData (nextProps) {
    const geo = `${nextProps.latitude},${nextProps.longitude}`
    // 141203 按距离排序，获取高德地图附近一公里小学
    _fetch.get(`https://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&location=${geo}&types=141203&radius=1000&offset=10&page=1&sortrule=distance&extensions=all`,true)
      .then(data => {
        this.setState({
          schoolArr: data.pois.length ? data.pois : [{}]
        })
      })
  }
  getMiddleSchoolData (nextProps) {
    const geo = `${nextProps.latitude},${nextProps.longitude}`
    // 141202 按距离排序，获取高德地图附近一公里中学
    _fetch.get(`https://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&location=${geo}&types=141202&radius=1000&offset=10&page=1&sortrule=distance&extensions=all`,true)
      .then(data => {
        this.setState({
          middleSchoolArr: data.pois.length ? data.pois : [{}]
        })
      })
  }
  // 按距离排序
  getSubwayData (nextProps) {
    const geo = `${nextProps.latitude},${nextProps.longitude}`
    _fetch.get(`https://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&location=${geo}&types=150500&radius=1000&offset=10&page=1&sortrule=distance&extensions=all`,true)
      .then(data => {
        this.setState({
          subwayArr: data.pois.length ? data.pois : [{}]
        })
      })
  }
  // 按距离排序
  getBusData (nextProps) {
    const geo = `${nextProps.latitude},${nextProps.longitude}`
    _fetch.get(`https://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&location=${geo}&types=150700&radius=1000&offset=10&page=1&sortrule=distance&extensions=all`,true)
      .then(data => {
        this.setState({
          busArr: data.pois.length ? data.pois : [{}]
        })
      })
  }
  // 按距离排序
  getMarketData (nextProps) {
    const geo = `${nextProps.latitude},${nextProps.longitude}`
    _fetch.get(`https://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&location=${geo}&types=060100&radius=1000&offset=10&page=1&sortrule=distance&extensions=all`,true)
      .then(data => {
        if (data.pois.length) {
          this.setState({
            marketArr: data.pois
          })
        } else {
          _fetch.get(`https://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&location=${geo}&types=060400&radius=1000&offset=10&page=1&sortrule=distance&extensions=all`,true)
            .then(data => {
              this.setState({
                marketArr: data.pois.length ? data.pois : [{}]
              })
            })
        }
      })
  }
  // 按距离排序
  getMedicalData (nextProps) {
    const geo = `${nextProps.latitude},${nextProps.longitude}`
    _fetch.get(`https://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&location=${geo}&types=090100&radius=1000&offset=10&page=1&sortrule=distance&extensions=all`,true)
      .then(data => {
        if (data.pois.length) {
          this.setState({
            medicalArr: data.pois
          })
        } else {
          _fetch.get(`https://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&location=${geo}&types=090101&radius=1000&offset=10&page=1&sortrule=distance&extensions=all`,true)
            .then(data => {
              this.setState({
                medicalArr: data.pois.length ? data.pois : [{}]
              })
            })
        }
      })
  }
  showAround (index) {
    this.props.navigation.navigate('Around', {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      title: this.props.title,
      index
    })
  }
  handleLayout (event) {
    this.aroundLayout = event.nativeEvent.layout
    this.props._getAroundLayout()
  }
  componentWillReceiveProps (nextProps) {
    this.getKidSchollData(nextProps)
    this.getSchoolData(nextProps)
    this.getMiddleSchoolData(nextProps)
    this.getSubwayData(nextProps)
    this.getBusData(nextProps)
    this.getMarketData(nextProps)
    this.getMedicalData(nextProps)
  }
  render () {
    return (
      <View onLayout={event => this.handleLayout(event)}>
        <View style={{padding: 20,backgroundColor: '#fff'}}>
          <View>
            <Text style={{fontSize: 17,fontWeight: 'bold'}}>周边配套</Text>
          </View>
        </View>
        <View style={{flex: 1,height: 200}}>
          <MapView
            showsCompass={false} // 是否显示指南针
            showsZoomControls={false} // 是否显示放大缩小按钮
            style={{width: '100%',height: 200}}
            coordinate={{
              latitude: Number(this.props.latitude),
              longitude: Number(this.props.longitude),
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
            // onStatusChangeComplete={({nativeEvent}) => {
            //   // console.log(nativeEvent.longitude,nativeEvent.latitude)
            //   const {longitude,latitude} = nativeEvent
            //   const sGeo = `${longitude},${latitude}`
            //   const url = `http://116.62.240.91:3000/house/lists?type_id=0&city_id=1207&distance=3&noLimit=1&s_geo=${sGeo}`
            //   fetch(url)
            //     .then(res => (res.json()))
            //     .then(resText => {
            //       this.setState({
            //         aroundList: resText.content
            //       })
            //     })
            //     .catch(err => {
            //       console.log(err)
            //     })
            // }}
          >
            <Marker
              title={this.props.title}
              infoWindowDisabled  // 是否禁用弹出窗口，默认不禁用
              coordinate={{
                latitude: Number(this.props.latitude),
                longitude: Number(this.props.longitude)
              }}
              // 自定义覆盖物
              icon={() => (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: '#5184f9',
                    borderRadius: 10,
                    borderWidth: 3,
                    borderColor: '#fff'
                  }}
                ></View>
              )}
            />
            <Marker
              title={this.props.title}
              infoWindowDisabled  // 是否禁用弹出窗口，默认不禁用
              coordinate={{
                latitude: Number(this.props.latitude),
                longitude: Number(this.props.longitude)
              }}
              // 设置Marker的偏移offset，centerOffset 只对 ios 有用
              centerOffset={{
                x: 0,
                y: -35
              }}
              // 设置Marker的偏移offset，anchor 只对 安卓 有用
              anchor={{
                x: 0.5,
                y: 1.5
              }}
              // 自定义覆盖物
              icon={() => (
                <View
                  style={{
                    width: 120,
                    backgroundColor: '#fff',
                    position: 'relative'
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      height: 40,
                      lineHeight: 20,
                      padding: 10,
                      textAlign: 'center'
                    }}
                  >
                    {this.props.community_name || '-'}
                  </Text>
                  <View
                    style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: -10,
                      width: 0,
                      height: 0,
                      marginLeft: -5,
                      borderWidth: 5,
                      borderColor: 'transparent',
                      borderTopColor: '#fff'
                    }}
                  ></View>
                </View>
              )}
            />
            {/*{*/}
            {/*  this.state.aroundList.map(item => {*/}
            {/*    return (*/}
            {/*      <Marker*/}
            {/*        key={item.id}*/}
            {/*        title={item.title}*/}
            {/*        coordinate={{*/}
            {/*          latitude: item.geo.y,*/}
            {/*          longitude: item.geo.x*/}
            {/*        }}*/}
            {/*      />*/}
            {/*    )*/}
            {/*  })*/}
            {/*}*/}
          </MapView>
          <View style={styles.bottomWrapper}>
            <TouchableOpacity style={{flex: 1}} onPress={() => this.showAround(0)}>
              <View>
                <Text style={styles.bottomTitle}>学校</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1}} onPress={() => this.showAround(1)}>
              <View>
                <Text style={styles.bottomTitle}>交通</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1}} onPress={() => this.showAround(2)}>
              <View>
                <Text style={styles.bottomTitle}>生活</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1}} onPress={() => this.showAround(3)}>
              <View>
                <Text style={styles.bottomTitle}>医疗</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.showAround(0)}
            style={styles.mask}
          >
            <View style={styles.mask}></View>
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: 20,marginRight: 20,paddingTop: 20,paddingBottom: 20,borderBottomWidth: StyleSheet.hairlineWidth,borderColor: '#bbb'}}>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <MaterialCommunityIcons
                name={'human-child'}
                size={26}
                color={'#ea7e7d'}
              />
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{fontWeight: 'bold'}}>{this.state.kidSchoolArr[0].name || '暂无数据'}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <Text style={{textAlign: 'center'}}>幼儿园</Text>
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{flex: 1,color: '#959595'}}>{this.state.kidSchoolArr[0].distance || '-'}米</Text>
            </View>
          </View>
        </View>
        <View style={{marginLeft: 20,marginRight: 20,paddingTop: 20,paddingBottom: 20,borderBottomWidth: StyleSheet.hairlineWidth,borderColor: '#bbb'}}>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <Ionicons
                name={'md-school'}
                size={26}
                color={'#ea7e7d'}
              />
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{fontWeight: 'bold'}}>{this.state.schoolArr[0].name || '暂无数据'}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <Text style={{textAlign: 'center'}}>小学</Text>
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{flex: 1,color: '#959595'}}>{this.state.schoolArr[0].distance || '-'}米</Text>
            </View>
          </View>
        </View>
        <View style={{marginLeft: 20,marginRight: 20,paddingTop: 20,paddingBottom: 20,borderBottomWidth: StyleSheet.hairlineWidth,borderColor: '#bbb'}}>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <Ionicons
                name={'ios-school'}
                size={26}
                color={'#ea7e7d'}
              />
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{fontWeight: 'bold'}}>{this.state.middleSchoolArr[0].name || '暂无数据'}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <Text style={{textAlign: 'center'}}>中学</Text>
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{flex: 1,color: '#959595'}}>{this.state.middleSchoolArr[0].distance || '-'}米</Text>
            </View>
          </View>
        </View>
        <View style={{marginLeft: 20,marginRight: 20,paddingTop: 20,paddingBottom: 20,borderBottomWidth: StyleSheet.hairlineWidth,borderColor: '#bbb'}}>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <Ionicons
                name={'ios-subway'}
                size={26}
                color={'#ea7e7d'}
              />
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{fontWeight: 'bold'}}>{this.state.subwayArr[0].name || '暂无数据'}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <Text style={{textAlign: 'center'}}>地铁站</Text>
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{flex: 1,color: '#959595'}}>{this.state.subwayArr[0].distance || '-'}米</Text>
            </View>
          </View>
        </View>
        <View style={{marginLeft: 20,marginRight: 20,paddingTop: 20,paddingBottom: 20,borderBottomWidth: StyleSheet.hairlineWidth,borderColor: '#bbb'}}>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <Ionicons
                name={'ios-bus'}
                size={26}
                color={'#ea7e7d'}
              />
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{fontWeight: 'bold'}}>{this.state.busArr[0].name || '暂无数据'}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <Text style={{textAlign: 'center'}}>公交站</Text>
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{flex: 1,color: '#959595'}}>{this.state.busArr[0].distance || '-'}米</Text>
            </View>
          </View>
        </View>
        <View style={{marginLeft: 20,marginRight: 20,paddingTop: 20,paddingBottom: 20,borderBottomWidth: StyleSheet.hairlineWidth,borderColor: '#bbb'}}>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <FontAwesome
                name={'shopping-cart'}
                size={22}
                color={'#ea7e7d'}
              />
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{fontWeight: 'bold'}}>{this.state.marketArr[0].name || '暂无数据'}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <Text style={{textAlign: 'center'}}>商场</Text>
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{flex: 1,color: '#959595'}}>{this.state.marketArr[0].distance || '-'}米</Text>
            </View>
          </View>
        </View>
        <View style={{marginLeft: 20,marginRight: 20,paddingTop: 20,paddingBottom: 20,borderBottomWidth: StyleSheet.hairlineWidth,borderColor: '#bbb'}}>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <MaterialCommunityIcons
                name={'medical-bag'}
                size={24}
                color={'#ea7e7d'}
              />
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{fontWeight: 'bold'}}>{this.state.medicalArr[0].name || '暂无数据'}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <View style={{justifyContent: 'center',alignItems: 'center',width: 60}}>
              <Text style={{textAlign: 'center'}}>医院</Text>
            </View>
            <View style={{flex: 1,marginLeft: 20}}>
              <Text style={{flex: 1,color: '#959595'}}>{this.state.medicalArr[0].distance || '-'}米</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(7,17,27,.4)'
  },
  bottomTitle: {
    flex: 1,
    lineHeight: 30,
    color: '#fff',
    textAlign: 'center'
  },
  mask: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 30,
    backgroundColor: 'transparent'
  }
})

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  _getAroundLayout () {
    const action = getAroundLayout(self.aroundLayout.y)
    dispatch(action)
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(HouseAround);

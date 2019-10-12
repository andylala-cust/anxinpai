import React,{Component} from 'react';
import {Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import {MapView, Marker} from 'react-native-amap3d/lib/js';
import {connect} from 'react-redux';
import {getAroundLayout} from '../../action/houseInfo/actionCreators';

let self;

class HouseAround extends Component {
  constructor (props) {
    super(props)
    self = this
    this.state = {
      aroundList: []
    }
    this.showAround = this.showAround.bind(this)
    this.handleLayout = this.handleLayout.bind(this)
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
  render () {
    return (
      <View onLayout={event => this.handleLayout(event)}>
        <View style={{padding: 25,backgroundColor: '#fff'}}>
          <View>
            <Text style={{fontSize: 17,fontWeight: 'bold'}}>周边配套</Text>
          </View>
        </View>
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
          <View
            style={styles.mask}
          ></View>
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
            centerOffset={{
              x: 0,
              y: -35
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

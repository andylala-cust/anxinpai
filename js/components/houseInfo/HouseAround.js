import React,{Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
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
  }
  handleLayout (event) {
    this.aroundLayout = event.nativeEvent.layout
    this.props._getAroundLayout()
  }
  render () {
    return (
      <View onLayout={event => this.handleLayout(event)}>
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
          <View style={styles.bottomWrapper}>
            <Text style={styles.bottomTitle} onPress={() => {alert(1)}}>学校</Text>
            <Text style={styles.bottomTitle} onPress={() => {alert(2)}}>交通</Text>
            <Text style={styles.bottomTitle} onPress={() => {alert(3)}}>生活</Text>
            <Text style={styles.bottomTitle} onPress={() => {alert(4)}}>医疗</Text>
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
            title={this.props.title}
            coordinate={{
              latitude: Number(this.props.latitude),
              longitude: Number(this.props.longitude)
            }}
            key={this.props.id}
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

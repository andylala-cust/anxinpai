import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  Animated,
  Easing
} from 'react-native';
import { Input } from 'react-native-elements';
import Swiper from 'react-native-swiper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  wrapper: {

  },
})

let self;

function RenderItem (item) {
  return (
    // View不支持onPress，所以套一层TouchableOpacity
    <TouchableOpacity
      onPress={() => self.props.navigation.navigate('HouseInfo', {
        id: item.id,
        datafrom: item.datafrom
      })}
      activeOpacity={1}
    >
      <View
        style={{paddingLeft: 20, paddingRight: 20}}
      >
        <View style={{flex: 1, flexDirection: 'row', paddingTop: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#f1f1f1'}}>
          <Image
            style={{width: '30%', height: 80}}
            source={{uri: item.pic_url}}
          />
          <View
            style={{width: '70%', paddingLeft: 20}}
          >
            <View>
              <Text
                style={{height: 20, fontWeight: 'bold', fontSize: 15, lineHeight: 20}}
                numberOfLines={1}
              >{item.title}</Text>
            </View>
            <View
              style={{flexDirection: 'row'}}
            >
              <Text style={{height: 20, fontSize: 12, lineHeight: 20, color: '#a6abb3'}}>{item.area}m²</Text>
              <Text style={{height: 20, marginLeft: 10, fontSize: 12, lineHeight: 20, color: '#a6abb3'}}>{item.floor}楼</Text>
              <Text style={{height: 20, marginLeft: 10, fontSize: 12, lineHeight: 20, color: '#a6abb3'}}>{item.community_name}</Text>
            </View>
            <View
              style={{flexDirection: 'row', marginTop: 4}}
            >
              <Text style={{height: 16, paddingLeft: 6, paddingRight: 6, backgroundColor: '#eef0f3', fontSize: 12, lineHeight: 16, color: '#7a8fbd', borderRadius: 3}}>{item.cut || '- -'}折</Text>
              <Text style={{height: 16, paddingLeft: 6, paddingRight: 6, backgroundColor: '#eef0f3', marginLeft: 10, fontSize: 12, lineHeight: 16, color: '#7a8fbd', borderRadius: 3}}>{item.circ}</Text>
              <Text style={{height: 16, paddingLeft: 6, paddingRight: 6, backgroundColor: '#eef0f3', marginLeft: 10, fontSize: 12, lineHeight: 16, color: '#7a8fbd', borderRadius: 3}}>{item.asset_type}</Text>
            </View>
            <View
              style={{flexDirection: 'row', marginTop: 6}}
            >
              <Text style={{height: 14, lineHeight: 14, color: '#f00', fontSize: 13}}>{Math.floor(item.initialPrice / 10000)}万</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      isLoading: false,
      bannerList: [],
      scrollTop: new Animated.Value(0)
    }
    self = this
    this.getInitHouseList = this.getInitHouseList.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }
  handleScroll (event) {
    Animated.timing(this.state.scrollTop, {
      toValue: event.nativeEvent.contentOffset.y <= 0 ? 0 : -event.nativeEvent.contentOffset.y,
      duration: 0,
      easing: Easing.linear,
    }).start()
  }
  loadData () {
    // this.setState({
    //   isLoading: true
    // })
  }
  getInitHouseList () {
    const url = 'http://116.62.240.91:3000/house/lists?city_id=1207&page_id=1&type_id=0&page_size=10'
    fetch(url)
      .then(res => (res.json()))
      .then(resText => {
        this.setState({
          data: resText.content
        })
      })
  }
  getBannerList () {
    const url = `http://116.62.240.91:3000/share/activity/getAd?city_id=1207`
    fetch(url)
      .then(res => (res.json()))
      .then(resText => {
        this.setState({
          bannerList: resText.content
        })
        console.log(resText.content)
      })
  }
  componentDidMount () {
    this.getInitHouseList()
    this.getBannerList()
  }
  render () {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={BARSTYLE}
          backgroundColor={"transparent"}
          translucent={true}
        />
        <Animated.View style={{marginTop: 40,paddingLeft: 20,paddingRight: 20,flexDirection: 'row',justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => {alert(1)}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons
                name={'ios-map'}
                size={26}
                style={{color: '#5fff46'}}
              />
              <View style={{marginTop: 5}}>
                <Text style={{fontSize: 12,fontWeight: 'bold'}}>区域选房</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {alert(2)}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name={'map-marker-radius'}
                size={26}
                style={{color: '#55ffe1'}}
              />
              <View style={{marginTop: 5}}>
                <Text style={{fontSize: 12,fontWeight: 'bold'}}>地图找房</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {alert(3)}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name={'bullseye-arrow'}
                size={26}
                style={{color: '#ffb689'}}
              />
              <View style={{marginTop: 5}}>
                <Text style={{fontSize: 12,fontWeight: 'bold'}}>捡漏必看</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {alert(4)}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons
                name={'ios-book'}
                size={26}
                style={{color: '#a4b0ff'}}
              />
              <View style={{marginTop: 5}}>
                <Text style={{fontSize: 12,fontWeight: 'bold'}}>法拍百科</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{height: 140,marginTop: 20,marginBottom: 20,shadowColor: '#000',
          shadowOffset:{
            width: 0,
            height: 5
          },
          shadowOpacity: 0.1,
          shadowRadius: 5,
        }}>
          <Swiper autoplay={true} style={styles.wrapper} key={this.state.bannerList.length}>
            {
              this.state.bannerList.map(item => (
                <TouchableOpacity activeOpacity={1} onPress={() => {alert(item.url)}} key={item.url} style={{flex: 1,paddingLeft: 20,paddingRight: 20}}>
                  <Image
                    source={{uri: item.url}}
                    style={{flex: 1,borderRadius: 5}}
                  />
                </TouchableOpacity>
              ))
            }
          </Swiper>
        </Animated.View>
        <Animated.FlatList
          // style={{top: this.state.scrollTop}}
          data={this.state.data}
          renderItem={({item}) => RenderItem(item)}
          keyExtractor={(item) => item.id.toString() }
          onScroll={(event) => this.handleScroll(event)}
          showsVerticalScrollIndicator={false}
          // ListEmptyComponent={() => (<View style={{height: 300,backgroundColor: '#f00'}}></View>)}
        />
      </View>
    )
  }
}

export default Home;

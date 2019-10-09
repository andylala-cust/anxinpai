import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  NativeModules,
  ScrollView,
  RefreshControl
} from 'react-native';
import {HouseList, HouseListPlaceHolder} from '../components/common';
import {HomeMainEntry, HomeSwiper, HomeSearch} from '../components/home';
import _fetch from '../fetch';

const JPushModule = NativeModules.JPushModule;
const BARSTYLE = Platform.OS === 'ios' ? 'default' : 'dark-content';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      isLoading: false,
      bannerList: [],
      isRefreshing: false
    }
    this.getHouseList = this.getHouseList.bind(this)
    this.getBannerList = this.getBannerList.bind(this)
    this.handleSwiperItemClick = this.handleSwiperItemClick.bind(this)
    this.houseListItemClick = this.houseListItemClick.bind(this)
    this.initJPush = this.initJPush.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
  }
  getHouseList () {
    const url = '/house/lists?city_id=1207&page_id=1&type_id=0&page_size=10'
    _fetch.get(url)
      .then(data => {
        this.setState({
          data: data.content
        })
      })
  }
  getBannerList () {
    const url = `/share/activity/getAd?city_id=1207`
    _fetch.get(url)
      .then(data => {
        this.setState({
          bannerList: data.content
        })
      })
  }
  handleSwiperItemClick (item) {
    alert(item.url)
  }
  houseListItemClick (item) {
    this.props.navigation.navigate('HouseInfo', {
      id: item.id,
      datafrom: item.datafrom
    })
  }
  initJPush () {
    if (Platform.OS == "android") {
      JPushModule.init()
    }else{
      JPushModule.loadJS()
    }
    if (Platform.OS == "android") {
      JPushModule.getRegistrationID((res) => {
        console.log(res)
      })
    } else {
      JPushModule.getRegisterId((res) => {
        console.log(res)
      })
    }
  }
  _onRefresh () {
    this.setState({
      isRefreshing: true
    })
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      })
    }, 2000)
  }
  componentDidMount () {
    this.initJPush()
    this.getHouseList()
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
        <HomeSearch />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              title={'加载中'}
            />
          }
        >
          <HomeMainEntry />
          <HomeSwiper
            bannerList={this.state.bannerList}
            callBack={this.handleSwiperItemClick}
          />
          {
            !this.state.data.length ? <HouseListPlaceHolder/> : this.state.data.map(item => (
              <HouseList
                key={item.id}
                item={item}
                navigation={this.props.navigation}
                callBack={this.houseListItemClick}
              />
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

export default Home;

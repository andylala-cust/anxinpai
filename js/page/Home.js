import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  NativeModules,
  FlatList,
  RefreshControl
} from 'react-native';
import {HouseList, HouseListPlaceHolder} from '../components/common';
import {HomeMainEntry, HomeSwiper, HomeSearch, LoadMore, HomeSummary} from '../components/home';
import _fetch from '../fetch';
import {queryString} from '../util';
import {PAGE_SIZE,TYPE_ID} from '../constants';

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
      refreshing: false,
      toggleLoadMore: true,
      toggleMore: true,
      bannerList: [],
      listParams: {
        city_id: '',
        page_id: 1,
        page_size: PAGE_SIZE,
        type_id: TYPE_ID
      },
      summary: {}
    }
    this._onRefresh = this._onRefresh.bind(this)
    this.getCurrentCity = this.getCurrentCity.bind(this)
    this.getInitHouseList = this.getInitHouseList.bind(this)
    this.getMoreHouseList = this.getMoreHouseList.bind(this)
    this.getBannerList = this.getBannerList.bind(this)
    this.getSummary = this.getSummary.bind(this)
    this.handleSwiperItemClick = this.handleSwiperItemClick.bind(this)
    this.houseListItemClick = this.houseListItemClick.bind(this)
    this.initJPush = this.initJPush.bind(this)
  }
  _onRefresh () {
    this.setState({
      refreshing: true,
      listParams: {
        ...this.state.listParams,
        page_id: 1
      }
    })
    setTimeout( () => {
      this.getInitHouseList(this.state.listParams)
      this.setState({
        refreshing: false
      })
    }, 1500)
  }
  getCurrentCity () {
    _fetch.get(`/user/getLocation`)
      .then(data => {
        const cityId = data.content.city_id
        this.setState({
          listParams: {
            ...this.state.listParams,
            city_id: data.content.city_id
          }
        })
        this.getBannerList(cityId)
        this.getInitHouseList(this.state.listParams)
        this.getSummary(cityId)
      })
  }
  getInitHouseList (param) {
    const query = queryString.stringify(param)
    const url = `/house/lists?${query}`
    _fetch.get(url)
      .then(data => {
        this.setState({
          data: data.content,
          toggleMore:  data.content.length < PAGE_SIZE ? false : true
        })
      })
  }
  getMoreHouseList () {
    this.setState({
      listParams: {
        ...this.state.listParams,
        page_id: ++this.state.listParams.page_id
      }
    })
    const query = queryString.stringify(this.state.listParams)
    const url = `/house/lists?${query}`
    _fetch.get(url)
      .then(data => {
        const arr = [...this.state.data]
        arr.push(...data.content)
        this.setState({
          data: arr,
          toggleMore:  data.content.length < PAGE_SIZE ? false : true
        })
      })
  }
  getBannerList (cityId) {
    const url = `/share/activity/getAd?city_id=${cityId}`
    _fetch.get(url)
      .then(data => {
        this.setState({
          bannerList: data.content
        })
      })
  }
  getSummary (cityId) {
    const url = `/house/get_house_summary?city_id=${cityId}`
    _fetch.get(url)
      .then(data => {
        this.setState({
          summary: data.content
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
  componentDidMount () {
    this.getCurrentCity()
    this.initJPush()
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
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (<HouseList
            item={item}
            navigation={this.props.navigation}
            callBack={this.houseListItemClick}
          />)}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<HouseListPlaceHolder />}
          ListHeaderComponent={
            <View>
              <HomeMainEntry />
              <HomeSwiper
                bannerList={this.state.bannerList}
                callBack={this.handleSwiperItemClick}
              />
              <HomeSummary {...this.state.summary} />
            </View>
          }
          ListFooterComponent={this.state.toggleMore ? <LoadMore /> : null}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          onEndReached={() => {
            if (this.state.toggleLoadMore) {
              this.setState({
                toggleLoadMore: false
              })
              this.getMoreHouseList()
            }
          }}
          onEndReachedThreshold={0.5}
          // 解决下拉刷新触发多次问题
          onContentSizeChange={()=>{
            this.setState({
              toggleLoadMore: true
            })
          }}
        />
      </View>
    )
  }
}

export default Home;
